import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { LikeCommentCommand } from './like-comment.command'
import { LikesRepo } from '../../repositories/likes.repo'
import { CommentsRepo } from '../../../../modules/comments/repositories'
import { Comment, Dislike, Like } from '@prisma/client'
import { BadRequestException, NotFoundException } from '@nestjs/common'
import { DislikesRepo } from '../../../../modules/dislikes/repositories/dislikes.repo'

@CommandHandler(LikeCommentCommand)
export class LikeCommentHandler implements ICommandHandler<LikeCommentCommand> {
	constructor(
		protected readonly commentsRepo: CommentsRepo,
		protected readonly likesRepo: LikesRepo,
		protected readonly eventBus: EventBus
	) {}

	public async execute({ input }: LikeCommentCommand): Promise<Comment> {
		const { commentId, userId } = input

		// is like flow
		const isLike: Like | null = await this.likesRepo.findByUserAndCommentIds(input)
		if (isLike) throw new BadRequestException('You have already liked this comment')
		// is like flow

		const comment: Comment | null = await this.commentsRepo.findById(commentId)
		if (!comment) throw new NotFoundException('Comment not found')

		// is dislike flow
		const isDislike: Dislike | null =
			await this.likesRepo.findDislikeByUserAndCommentIds(input)
		if (isDislike) await this.likesRepo.deleteDislike(isDislike.id)
		// is dislike flow

		await this.commentsRepo.updateLikesCount({
			id: commentId,
			count: (comment.likesCount += 1)
			// dislikesCount: (comment.dislikesCount -= 1)
		})

		await this.likesRepo.create({ commentId, userId })
		return comment
	}
}
