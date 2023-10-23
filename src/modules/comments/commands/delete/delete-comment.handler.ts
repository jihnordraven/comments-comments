import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { DeleteCommentCommand } from './delete-comment.command'
import { CommentsRepo } from '../../repositories'
import { Comment } from '@prisma/client'
import {
	ForbiddenException,
	Inject,
	InternalServerErrorException,
	NotFoundException
} from '@nestjs/common'
import { FILES_SERVICE } from '../../../../utils/constants'
import { ClientProxy } from '@nestjs/microservices'
import { Observable, firstValueFrom } from 'rxjs'
import { FileDeleteRes } from '../../../../types'

@CommandHandler(DeleteCommentCommand)
export class DeleteCommentHandler implements ICommandHandler<DeleteCommentCommand> {
	constructor(
		@Inject(FILES_SERVICE) protected readonly filesClient: ClientProxy,
		protected readonly commentsRepo: CommentsRepo
	) {}

	public async execute({ input }: DeleteCommentCommand): Promise<Comment> {
		const { id, userId } = input

		const comment: Comment | null = await this.commentsRepo.findById(id)
		if (!comment) throw new NotFoundException('Comment not found')

		if (comment.userId !== userId) throw new ForbiddenException()

		if (comment.fileUrl) {
			const data: Observable<FileDeleteRes> = this.filesClient.send<
				FileDeleteRes,
				string
			>('deleteFile', comment.fileUrl)
			const result: FileDeleteRes = await firstValueFrom(data)

			if (!result.ok) throw new InternalServerErrorException(result.err)
		}

		return this.commentsRepo.delete(id)
	}
}
