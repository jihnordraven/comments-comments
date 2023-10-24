import { Controller, Param, ParseUUIDPipe, Post, UseGuards } from '@nestjs/common'
import { JwtGuard } from '../../../guards-handlers/guards'
import { CurrentUser } from '../../../utils/decorators'
import { Comment } from '@prisma/client'
import { CommandBus } from '@nestjs/cqrs'
import { CommentsGateway } from '../../comments/gateways/comments.gateway'
import { LC } from '../commands'

@Controller('likes')
@UseGuards(JwtGuard)
export class LikesController {
	constructor(
		private readonly commandBus: CommandBus,
		private readonly commentsGateway: CommentsGateway
	) {}

	@Post('create/:id')
	public async like(
		@Param('id', ParseUUIDPipe) commentId: string,
		@CurrentUser('userId', ParseUUIDPipe) userId: string
	): Promise<Comment> {
		const likedComment: Comment = await this.commandBus.execute(
			new LC.LikeCommentCommand({ commentId, userId })
		)

		this.commentsGateway.commentLiked(likedComment)
		return likedComment
	}

	@Post('delete/:id')
	public async unlike(
		@Param('id', ParseUUIDPipe) commentId: string,
		@CurrentUser('userId', ParseUUIDPipe) userId: string
	): Promise<Comment> {
		const unlikedComment: Comment = await this.commandBus.execute(
			new LC.UnlikeCommentCommand({ commentId, userId })
		)

		this.commentsGateway.commentLiked(unlikedComment)
		return unlikedComment
	}
}
