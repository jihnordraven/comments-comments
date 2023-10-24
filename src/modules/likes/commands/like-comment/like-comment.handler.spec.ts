import { Test, TestingModule } from '@nestjs/testing'
import { LikeCommentHandler } from './like-comment.handler'
import { CommentsRepo } from '../../../../modules/comments/repositories'
import { LikesRepo } from '../../repositories/likes.repo'
import { EventBus } from '@nestjs/cqrs'

describe('LikeCommentHandler', (): void => {
	let likeCommentHandler: LikeCommentHandler
	let commentsRepo: CommentsRepo
	let likesRepo: LikesRepo
	let eventBus: EventBus

	beforeEach(async (): Promise<void> => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				LikeCommentHandler,
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

		likeCommentHandler = module.get<LikeCommentHandler>(LikeCommentHandler)
		commentsRepo = module.get<CommentsRepo>(CommentsRepo)
		likesRepo = module.get<LikesRepo>(LikesRepo)
		eventBus = module.get<EventBus>(EventBus)
	})

	it('should be defined', (): void => {
		expect(likeCommentHandler).toBeDefined()
	})
})
