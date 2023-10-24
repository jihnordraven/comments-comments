import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { LikesRepo } from '../../repositories/likes.repo'
import { CommentsRepo } from '../../../../modules/comments/repositories'
import { Comment } from '@prisma/client'
import { NotFoundException } from '@nestjs/common'
import { UnlikeCommentCommand } from './unlike-comment.command'

@CommandHandler(UnlikeCommentCommand)
export class UnlikeCommentHandler implements ICommandHandler<UnlikeCommentCommand> {
	constructor(
		protected readonly commentsRepo: CommentsRepo,
		protected readonly likesRepo: LikesRepo,
		protected readonly eventBus: EventBus
	) {}

	public async execute({ input }: UnlikeCommentCommand): Promise<Comment> {
		const { commentId, userId } = input

		const comment: Comment | null = await this.commentsRepo.findById(commentId)
		if (!comment) throw new NotFoundException('Comment not found')

		await this.likesRepo.delete(commentId)

		return comment
	}
}
