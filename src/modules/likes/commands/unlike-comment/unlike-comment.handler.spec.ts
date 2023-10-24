import { Test, TestingModule } from '@nestjs/testing'
import { CommentsRepo } from '../../../../modules/comments/repositories'
import { LikesRepo } from '../../repositories/likes.repo'
import { EventBus } from '@nestjs/cqrs'
import { UnlikeCommentHandler } from './unlike-comment.handler'

describe('UnlikeCommentHandler', (): void => {
	let unlikeCommentHandler: UnlikeCommentHandler
	let commentsRepo: CommentsRepo
	let likesRepo: LikesRepo
	let eventBus: EventBus

	beforeEach(async (): Promise<void> => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UnlikeCommentHandler,
				{
					provide: CommentsRepo,
					useValue: {}
				},
				{
					provide: LikesRepo,
					useValue: {}
				},
				{
					provide: EventBus,
					useValue: {}
				}
			]
		}).compile()

		unlikeCommentHandler = module.get<UnlikeCommentHandler>(UnlikeCommentHandler)
		commentsRepo = module.get<CommentsRepo>(CommentsRepo)
		likesRepo = module.get<LikesRepo>(LikesRepo)
		eventBus = module.get<EventBus>(EventBus)
	})

	it('should be defined', (): void => {
		expect(unlikeCommentHandler).toBeDefined()
	})
})
