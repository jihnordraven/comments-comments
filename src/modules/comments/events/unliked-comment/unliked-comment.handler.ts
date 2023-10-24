// import { EventsHandler, IEventHandler } from '@nestjs/cqrs'
// import { UnlikedCommentEvent } from './unliked-comment.event'
// import { CommentsRepo } from '../../repositories'

// @EventsHandler(UnlikedCommentEvent)
// export class UnlikedCommentHandler implements IEventHandler<UnlikedCommentEvent> {
// 	constructor(protected readonly commentsRepo: CommentsRepo) {}

// 	public async handle({ comment, userId }: UnlikedCommentEvent) {
// 		await this.commentsRepo.update(userId, { likesCount: comment.likesCount-- })
// 	}
// }
