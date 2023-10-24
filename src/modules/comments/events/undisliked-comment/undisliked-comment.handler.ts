// import { EventsHandler, IEventHandler } from '@nestjs/cqrs'
// import { UndislikedCommentEvent } from './undisliked-comment.event'
// import { CommentsRepo } from '../../repositories'

// @EventsHandler(UndislikedCommentEvent)
// export class UndislikedCommentHandler implements IEventHandler<UndislikedCommentEvent> {
// 	constructor(protected readonly commentsRepo: CommentsRepo) {}

// 	public async handle({ comment, userId }: UndislikedCommentEvent) {
// 		await this.commentsRepo.update(userId, { dislikesCount: comment.dislikesCount-- })
// 	}
// }
