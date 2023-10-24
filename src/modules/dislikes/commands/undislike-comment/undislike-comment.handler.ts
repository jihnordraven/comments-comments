import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { CommentsRepo } from '../../../../modules/comments/repositories'
import { Comment } from '@prisma/client'
import { NotFoundException } from '@nestjs/common'
import { DislikesRepo } from '../../repositories/dislikes.repo'
import { UndislikeCommentCommand } from './undislike-comment.command'

@CommandHandler(UndislikeCommentCommand)
export class UndislikeCommentHandler implements ICommandHandler<UndislikeCommentCommand> {
	constructor(
		protected readonly commentsRepo: CommentsRepo,
		protected readonly dislikesRepo: DislikesRepo,
		protected readonly eventBus: EventBus
	) {}

	public async execute({ input }: UndislikeCommentCommand): Promise<Comment> {
		const { commentId, userId } = input

		const comment: Comment | null = await this.commentsRepo.findById(commentId)
		if (!comment) throw new NotFoundException('comment not found')

		await this.dislikesRepo.delete(commentId)

		return comment
	}
}
