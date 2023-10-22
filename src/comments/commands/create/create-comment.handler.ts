import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { CreateCommentCommand } from './create-comment.command'
import { CommentsRepo } from '../../../comments/repositories'
import { Inject, InternalServerErrorException } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { Comment } from '@prisma/client'
import { firstValueFrom } from 'rxjs'
import { FILES_SERVICE } from '../../../utils/constants'

@CommandHandler(CreateCommentCommand)
export class CreateCommentHandler implements ICommandHandler<CreateCommentCommand> {
	constructor(
		@Inject(FILES_SERVICE) private readonly filesClient: ClientProxy,
		private readonly commentsRepo: CommentsRepo
	) {}

	public async execute({ input }: CreateCommentCommand): Promise<Comment> {
		const { userId, content, parentId, file } = input

		let fileUrl: string = ''

		if (file) {
			const data = this.filesClient.send('uploadFile', {
				buffer: file.buffer,
				originalname: file.originalname
			})

			const result: { ok: boolean; fileUrl?: string; err?: string } =
				await firstValueFrom(data)

			if (!result.ok) throw new InternalServerErrorException(result.err)
			else fileUrl = result.fileUrl
		}

		return this.commentsRepo.create({
			content,
			parentId,
			fileUrl,
			userId
		})
	}
}
