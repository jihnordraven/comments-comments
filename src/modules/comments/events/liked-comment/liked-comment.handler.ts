// import { EventsHandler, IEventHandler } from '@nestjs/cqrs'
// import { LikedCommentEvent } from './liked-comment.event'
// import { CommentsRepo } from '../../repositories'
// import { Dislike } from '@prisma/client'
// import { DislikesRepo } from '../../../../modules/dislikes/repositories/dislikes.repo'

// @EventsHandler(LikedCommentEvent)
// export class LikedCommentHandler implements IEventHandler<LikedCommentEvent> {
// 	constructor(
// 		protected readonly commentsRepo: CommentsRepo,
// 		protected readonly dislikesRepo: DislikesRepo
// 	) {}

// 	public async handle({ comment, userId }: LikedCommentEvent) {
// 		await this.commentsRepo.update(userId, { likesCount: comment.likesCount++ })

// 		const isDislike: Dislike | null = await this.dislikesRepo.findByUserAndCommentIds(
// 			{
// 				commentId: comment.id,
// 				userId
// 			}
// 		)
// 		if (isDislike) await this.dislikesRepo.delete(isDislike.id)
// 	}
// }
