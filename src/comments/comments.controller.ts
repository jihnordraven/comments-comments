import {
	Body,
	Controller,
	FileTypeValidator,
	Get,
	HttpCode,
	HttpStatus,
	MaxFileSizeValidator,
	ParseFilePipe,
	ParseUUIDPipe,
	Post,
	UploadedFile,
	UseGuards,
	UseInterceptors
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { WebSocketServer } from '@nestjs/websockets'
import { Server } from 'socket.io'
import { CreateCommentDto } from './core/dtos'
import { JwtGuard } from '@guards'
import { JwtAccessPayloadDecorator } from 'src/utils/decorators/jwt-access-payload.decorator'
import { CommentsService } from './comments.service'
import { CommandBus } from '@nestjs/cqrs'
import { Comment } from '@prisma/client'
import { CC } from './commands'

@UseGuards(JwtGuard)
@Controller('comments')
export class CommentsController {
	constructor(
		private readonly commandBus: CommandBus,
		private readonly commentsService: CommentsService
	) {}

	@WebSocketServer() server: Server

	@Get('hello')
	public hello() {
		return 'hello'
	}

	@Post('create')
	@HttpCode(HttpStatus.OK)
	@UseInterceptors(FileInterceptor('file'))
	public async create(
		@Body() dto: CreateCommentDto,
		@UploadedFile() file: any /* Express.Multer.File */, // new ParseFilePipe({
		// 	validators: [ // 		new FileTypeValidator({ fileType: /(png|jpg|jpeg|txt)$/ }),
		// 		new MaxFileSizeValidator({ maxSize: 100 * 1024 })
		// 	]
		// })
		@JwtAccessPayloadDecorator('userId', ParseUUIDPipe)
		userId: string
	): Promise<any> {
		if (file) await this.commentsService.validateFile(file)

		const comment: Comment = await this.commandBus.execute(
			new CC.CreateCommentCommand({ ...dto, file, userId })
		)

		// this.server.emit('comment-created', comment)

		return comment
	}
}
