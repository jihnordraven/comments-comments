import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { UpdateCommentCommand } from './update-comment.command'
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
import { FileUploadRes, FileUploadSend } from '../../../../types'
import { Observable, firstValueFrom } from 'rxjs'

@CommandHandler(UpdateCommentCommand)
export class UpdateCommentHandler implements ICommandHandler<UpdateCommentCommand> {
	constructor(
		@Inject(FILES_SERVICE) private readonly filesClient: ClientProxy,
		protected readonly commentsRepo: CommentsRepo
	) {}

	public async execute({ input }: UpdateCommentCommand): Promise<any> {
		const { id, content, file, userId } = input

		const comment: Comment = await this.commentsRepo.findById(id)
		if (!comment) throw new NotFoundException('Comment not found')

		if (comment.userId !== userId) throw new ForbiddenException()

		if (file) {
			let newFileUrl: string = ''

			if (comment.fileUrl) {
				this.filesClient.send('deleteFile', { fileUrl: comment.fileUrl })
			}

			const data: Observable<FileUploadRes> = this.filesClient.send<
				FileUploadRes,
				FileUploadSend
			>('uploadFile', { buffer: file.buffer, originalname: file.originalname })

			const result: FileUploadRes = await firstValueFrom<FileUploadRes>(data)
			if (!result.ok) throw new InternalServerErrorException(result.err)

			newFileUrl = result.fileUrl

			await this.commentsRepo.update(id, { content, fileUrl: newFileUrl })
		}

		return this.commentsRepo.update(id, { content })
	}
}
