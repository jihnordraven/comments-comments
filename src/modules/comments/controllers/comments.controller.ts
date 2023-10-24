import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	ParseUUIDPipe,
	Post,
	UploadedFile,
	UseGuards,
	UseInterceptors
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { CreateCommentDto, UpdateCommentDto } from '../core/dtos'
import { CurrentUser } from '../../../utils/decorators'
import { CommentsService } from '../services/comments.service'
import { CommandBus } from '@nestjs/cqrs'
import { Comment } from '@prisma/client'
import { CommentsGateway } from '../gateways/comments.gateway'
import { JwtGuard } from '../../../guards-handlers/guards'
import { COMMENTS_SWAGGER } from '../../../utils/swagger'
import { ApiTags } from '@nestjs/swagger'
import { CC } from '../commands'

@ApiTags('Comments Controller')
@UseGuards(JwtGuard)
@Controller('comments')
export class CommentsController {
	constructor(
		private readonly commandBus: CommandBus,
		private readonly commentsService: CommentsService,
		private readonly commentsGateway: CommentsGateway
	) {}

	@COMMENTS_SWAGGER.SwaggerToCreateComment()
	@Post('create')
	@HttpCode(HttpStatus.OK)
	@UseInterceptors(FileInterceptor('file'))
	public async create(
		@Body() dto: CreateCommentDto,
		@UploadedFile() file: any /* Express.Multer.File, */, // new ParseFileType({validators: [...]})
		@CurrentUser('userId', ParseUUIDPipe)
		userId: string
	): Promise<Comment> {
		if (file) await this.commentsService.validateFile(file)

		const comment: Comment = await this.commandBus.execute(
			new CC.CreateCommentCommand({ ...dto, file, userId })
		)

		this.commentsGateway.commentCreated(comment)
		return comment
	}

	@Post('update/:id')
	@HttpCode(HttpStatus.OK)
	@UseInterceptors(FileInterceptor('file'))
	public async update(
		@Param('id') id: string,
		@Body() dto: UpdateCommentDto,
		@CurrentUser('userId') userId: string,
		@UploadedFile() file: any /* Express.Multer.File */
	): Promise<Comment> {
		if (file) await this.commentsService.validateFile(file)

		const comment: Comment = await this.commandBus.execute(
			new CC.UpdateCommentCommand({ id, userId, content: dto.content, file })
		)

		this.commentsGateway.commentUpdated(comment)
		return comment
	}

	@Post('delete/:id')
	@HttpCode(HttpStatus.OK)
	public async delete(
		@Param('id') id: string,
		@CurrentUser('userId') userId: string
	): Promise<Comment> {
		console.log('hello')

		const comment: Comment = await this.commandBus.execute(
			new CC.DeleteCommentCommand({ id, userId })
		)

		this.commentsGateway.commentDeleted(comment)
		return comment
	}
}
