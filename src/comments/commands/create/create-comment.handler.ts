import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { CreateCommentCommand } from './create-comment.command'
import { CommentsRepo } from '../../../comments/repositories'
import { ConfigService } from '@nestjs/config'
import { BadRequestException, Inject, InternalServerErrorException } from '@nestjs/common'
import { FILES_SERVICE } from '@constants'
import { ClientProxy } from '@nestjs/microservices'
import { v4 } from 'uuid'
import path, { extname } from 'path'
import { Comment } from '@prisma/client'

@CommandHandler(CreateCommentCommand)
export class CreateCommentHandler implements ICommandHandler<CreateCommentCommand> {
	constructor(
		@Inject(FILES_SERVICE) private readonly filesClient: ClientProxy,
		private readonly config: ConfigService,
		private readonly commentsRepo: CommentsRepo
	) {}

	public async execute({ input }: CreateCommentCommand): Promise<Comment> {
		const { userId, content, file } = input

		let fileUrl: string = ''

		if (file) {
			const s3ObjectUrl: string = this.config.getOrThrow<string>('S3_OBJECT_URL')
			const filename: string = v4() + `.${extname(file.originalname)}`

			const isSuccess: boolean = Boolean(
				this.filesClient.emit('uploadFile', {
					buffer: file.buffer,
					filename
				})
			)
			if (!isSuccess)
				throw new InternalServerErrorException('Unable to upload a file')

			fileUrl = `${s3ObjectUrl}/${filename}`
		}

		return this.commentsRepo.create({
			content,
			fileUrl,
			userId
		})
	}
}
