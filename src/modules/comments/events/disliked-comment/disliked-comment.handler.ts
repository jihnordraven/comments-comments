// import { EventsHandler, IEventHandler } from '@nestjs/cqrs'
// import { DislikedCommentEvent } from './disliked-comment.event'
// import { CommentsRepo } from '../../repositories'
// import { Like } from '@prisma/client'
// import { LikesRepo } from '../../../../modules/likes/repositories/likes.repo'

// @EventsHandler(DislikedCommentEvent)
// export class DislikedCommentHandler implements IEventHandler<DislikedCommentEvent> {
// 	constructor(
// 		protected readonly commentsRepo: CommentsRepo,
// 		protected readonly likesRepo: LikesRepo
// 	) {}

// 	public async handle({ comment, userId }: DislikedCommentEvent) {
// 		await this.commentsRepo.update(userId, { dislikesCount: comment.dislikesCount++ })

// 		const isLike: Like | null = await this.likesRepo.findByUserAndCommentIds({
// 			commentId: comment.id,
// 			userId
// 		})
// 		if (isLike) await this.likesRepo.delete(isLike.id)
// 	}
// }
