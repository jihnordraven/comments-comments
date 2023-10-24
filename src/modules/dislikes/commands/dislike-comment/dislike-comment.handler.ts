import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { DislikeCommentCommand } from './dislike-comment.command'
import { CommentsRepo } from '../../../../modules/comments/repositories'
import { Comment, Dislike, Like } from '@prisma/client'
import { BadRequestException, NotFoundException } from '@nestjs/common'
import { DislikesRepo } from '../../repositories/dislikes.repo'

@CommandHandler(DislikeCommentCommand)
export class DislikeCommentHandler implements ICommandHandler<DislikeCommentCommand> {
	constructor(
		protected readonly commentsRepo: CommentsRepo,
		protected readonly dislikesRepo: DislikesRepo,
		protected readonly eventBus: EventBus
	) {}

	public async execute({ input }: DislikeCommentCommand): Promise<Comment> {
		const { commentId, userId } = input

		// is dislike flow
		const isDislike: Dislike | null =
			await this.dislikesRepo.findByUserAndCommentIds(input)
		if (isDislike)
			throw new BadRequestException('You have already disliked this comment')
		// is dislike flow

		const comment: Comment | null = await this.commentsRepo.findById(commentId)
		if (!comment) throw new NotFoundException('comment not found')

		// is like flow
		const isLike: Like | null =
			await this.dislikesRepo.findLikeByUserAndCommentIds(input)
		if (isLike) await this.dislikesRepo.deleteLike(isLike.id)
		// is like flow

		await this.commentsRepo.updateDislikesCount({
			id: commentId,
			// likesCount: (comment.likesCount += 1),
			count: (comment.dislikesCount -= 1)
		})

		await this.dislikesRepo.create({ commentId, userId })
		return comment
	}
}
