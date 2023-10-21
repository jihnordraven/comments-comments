import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { CreateCommentCommand } from './create-comment.command'
import { CommentsRepo } from '../../../comments/repositories'
import { ConfigService } from '@nestjs/config'
import { Inject } from '@nestjs/common'
import { FILES_SERVICE } from '@constants'
import { ClientProxy } from '@nestjs/microservices'
import { v4 } from 'uuid'
import path from 'path'
import { Comment } from '@prisma/client'

@CommandHandler(CreateCommentCommand)
export class CreateCommentHandler implements ICommandHandler<CreateCommentCommand> {
	constructor(
		@Inject(FILES_SERVICE) private readonly filesProxy: ClientProxy,
		private readonly config: ConfigService,
		private readonly commentsRepo: CommentsRepo
	) {}

	public async execute({ input }: CreateCommentCommand): Promise<any> {
		const { userId, content, file } = input

		let fileUrl: string = ''

		if (file) {
			const s3ObjectUrl: string = this.config.getOrThrow<string>('S3_OBJECT_URL')
			const filename: string = v4() + `.${path.extname(file.originalname)}`

			fileUrl = `${s3ObjectUrl}/${filename}`
		}

		const comment: Comment = await this.commentsRepo.create({
			userId,
			content,
			fileUrl
		})
	}
}
