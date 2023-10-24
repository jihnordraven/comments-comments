import { Test, TestingModule } from '@nestjs/testing'
import { DislikesRepo } from '../../../../modules/dislikes/repositories/dislikes.repo'
import { DislikeCommentHandler } from './dislike-comment.handler'
import { CommentsRepo } from '../../../../modules/comments/repositories'
import { EventBus } from '@nestjs/cqrs'

describe('DislackedCommentHandler', (): void => {
	let dislikeCommentHandler: DislikeCommentHandler
	let commentsRepo: CommentsRepo
	let dislikesRepo: DislikesRepo

	beforeEach(async (): Promise<void> => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				DislikeCommentHandler,
				{
					provide: CommentsRepo,
					useValue: {}
				},
				{
					provide: DislikesRepo,
					useValue: {}
				},
				{
					provide: EventBus,
					useValue: {}
				}
			]
		}).compile()

		dislikeCommentHandler = module.get<DislikeCommentHandler>(DislikeCommentHandler)
		commentsRepo = module.get<CommentsRepo>(CommentsRepo)
		dislikesRepo = module.get<DislikesRepo>(DislikesRepo)
	})

	it('should be defined', (): void => {
		expect(dislikeCommentHandler).toBeDefined()
	})
})
