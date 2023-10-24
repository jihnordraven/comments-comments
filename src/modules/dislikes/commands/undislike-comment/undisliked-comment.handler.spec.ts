import { Test, TestingModule } from '@nestjs/testing'
import { DislikesRepo } from '../../../../modules/dislikes/repositories/dislikes.repo'
import { CommentsRepo } from '../../../../modules/comments/repositories'
import { EventBus } from '@nestjs/cqrs'
import { UndislikeCommentHandler } from './undislike-comment.handler'

describe('DislackedCommentHandler', (): void => {
	let undislikeCommentHandler: UndislikeCommentHandler
	let commentsRepo: CommentsRepo
	let dislikesRepo: DislikesRepo

	beforeEach(async (): Promise<void> => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UndislikeCommentHandler,
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

		undislikeCommentHandler = module.get<UndislikeCommentHandler>(
			UndislikeCommentHandler
		)
		commentsRepo = module.get<CommentsRepo>(CommentsRepo)
		dislikesRepo = module.get<DislikesRepo>(DislikesRepo)
	})

	it('should be defined', (): void => {
		expect(undislikeCommentHandler).toBeDefined()
	})
})
