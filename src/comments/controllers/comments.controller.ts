import {
	Body,
	Controller,
	HttpCode,
	HttpStatus,
	ParseUUIDPipe,
	Post,
	UploadedFile,
	UseGuards,
	UseInterceptors
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { CreateCommentDto } from '../core/dtos'
import { JwtAccessPayloadDecorator } from '../../utils/decorators/jwt-access-payload.decorator'
import { CommentsService } from '../services/comments.service'
import { CommandBus } from '@nestjs/cqrs'
import { Comment } from '@prisma/client'
import { CC } from '../commands'
import { CommentsGateway } from '../gateways/comments.gateway'
import { JwtGuard } from '../../guards-handlers/guards'

@UseGuards(JwtGuard)
@Controller('comments')
export class CommentsController {
	constructor(
		private readonly commandBus: CommandBus,
		private readonly commentsService: CommentsService,
		private readonly commentsGateway: CommentsGateway
	) {}

	@Post('create')
	@HttpCode(HttpStatus.OK)
	@UseInterceptors(FileInterceptor('file'))
	public async create(
		@Body() dto: CreateCommentDto,
		@UploadedFile() file: any, // Express.Multer.File | new ParseFileType({validators: [...]})
		@JwtAccessPayloadDecorator('userId', ParseUUIDPipe)
		userId: string
	): Promise<any> {
		if (file) await this.commentsService.validateFile(file)

		const comment: Comment = await this.commandBus.execute(
			new CC.CreateCommentCommand({ ...dto, file, userId })
		)

		this.commentsGateway.commentCreated(comment)
		return comment
	}
}
