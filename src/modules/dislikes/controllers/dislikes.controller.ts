import { Controller, Param, ParseUUIDPipe, Post, UseGuards } from '@nestjs/common'
import { CurrentUser } from '../../../utils/decorators'
import { Comment } from '@prisma/client'
import { CommandBus } from '@nestjs/cqrs'
import { DC } from '../commands'
import { CommentsGateway } from '../../comments/gateways/comments.gateway'
import { JwtGuard } from '../../../guards-handlers/guards'

@Controller('dislikes')
@UseGuards(JwtGuard)
export class DislikesController {
	constructor(
		private readonly commandBus: CommandBus,
		private readonly commentsGateway: CommentsGateway
	) {}

	@Post('create/:id')
	public async dislike(
		@Param('id', ParseUUIDPipe) commentId: string,
		@CurrentUser('userId') userId: string
	): Promise<Comment> {
		const dislikedComment: Comment = await this.commandBus.execute(
			new DC.DislikeCommentCommand({ commentId, userId })
		)

		this.commentsGateway.commentLiked(dislikedComment)
		return dislikedComment
	}

	@Post('delete/:id')
	public async undislike(
		@Param('id', ParseUUIDPipe) commentId: string,
		@CurrentUser('userId') userId: string
	): Promise<Comment> {
		const undislikedComment: Comment = await this.commandBus.execute(
			new DC.UndislikeCommentCommand({ commentId, userId })
		)

		this.commentsGateway.commentLiked(undislikedComment)
		return undislikedComment
	}
}
