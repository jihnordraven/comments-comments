import {
	ConnectedSocket,
	MessageBody,
	OnGatewayConnection,
	OnGatewayDisconnect,
	OnGatewayInit,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { Logger, UseGuards } from '@nestjs/common'
import { bgCyan, bgGreen, bgYellow } from 'colorette'
import { DeleteCommentDto, FindManyCommentsDto, UpdateCommentDto } from './core/dtos'
import { JwtWsGuard } from '@guards'
import { Comment } from '@prisma/client'
import { CommentsRepo, CommentsQueryRepo } from './repositories'
import { CommentsService } from './comments.service'
import { CommandBus } from '@nestjs/cqrs'

@UseGuards(JwtWsGuard)
@WebSocketGateway({ cors: true, namespace: 'comments' })
export class CommentsGateway
	implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
	private readonly logger: Logger = new Logger(CommentsGateway.name)

	constructor(
		private readonly commentsService: CommentsService,
		private readonly commentsRepo: CommentsRepo,
		private readonly commentsQueryRepo: CommentsQueryRepo,
		private readonly commandBus: CommandBus
	) {}

	@WebSocketServer() server: Server

	public async afterInit(server: Server): Promise<void> {
		this.logger.log(bgCyan(`Server initializated. Server: ${server}`))
	}

	public async handleConnection(client: Socket): Promise<void> {
		await this.commentsService.validateToken(client)
		this.logger.log(bgGreen(`client: ${client.id} has connected`))
	}

	public async handleDisconnect(client: Socket): Promise<void> {
		this.server.disconnectSockets()
		this.logger.log(bgYellow(`client: ${client.id} has disconnected`))
	}

	// @SubscribeMessage('createComment')
	// public async createComment(
	// 	@ConnectedSocket() client: Socket & { userId: string },
	// 	@MessageBody() body: CreateCommentDto
	// ): Promise<void> {
	// 	console.log(body)
	// 	const userId: string = client.userId

	// 	if (body.file) {
	// 		await this.commentsService.validateFile(body.file)
	// 	}

	// 	const comment: Comment = await this.commandBus.execute(
	// 		new CC.CreateCommentCommand({
	// 			userId,
	// 			content: body.content,
	// 			file: body.file
	// 		})
	// 	)

	// 	this.server.emit('commentCreated', comment)
	// }

	public commentCreated(comment: Comment): void {
		this.server.emit('comment-created', comment)
	}

	@SubscribeMessage('findManyComments')
	public async findManyComments(
		@MessageBody() body: FindManyCommentsDto
	): Promise<void> {
		const comments: Comment[] = await this.commentsQueryRepo.findMany(body)

		this.server.emit('found-many-comments', comments)
	}

	@SubscribeMessage('updateComment')
	public async update(
		@MessageBody() body: UpdateCommentDto,
		@ConnectedSocket() client: Socket & { userId: string }
	): Promise<void> {
		const userId: string = client.userId

		const comment: Comment = await this.commentsRepo.update(body, userId)
		this.server.emit('updated-comment', comment)
	}

	@SubscribeMessage('deleteComment')
	public async deleteComment(
		@MessageBody() body: DeleteCommentDto,
		@ConnectedSocket() client: Socket & { userId: string }
	): Promise<void> {
		const userId: string = client.userId

		const comment: Comment = await this.commentsRepo.delete(body, userId)
		this.server.emit('deleted-comment', comment)
	}
}
