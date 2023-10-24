// import { Test, TestingModule } from '@nestjs/testing'
// import { CommentsRepo } from '../../repositories'
// import { DislikesRepo } from '../../../../modules/dislikes/repositories/dislikes.repo'
// import { UndislikedCommentHandler } from './undisliked-comment.handler'

// describe('DislackedCommentHandler', (): void => {
// 	let undislikedCommentHandler: UndislikedCommentHandler
// 	let commentsRepo: CommentsRepo
// 	let dislikesRepo: DislikesRepo

// 	beforeEach(async (): Promise<void> => {
// 		const module: TestingModule = await Test.createTestingModule({
// 			providers: [
// 				UndislikedCommentHandler,
// 				{
// 					provide: CommentsRepo,
// 					useValue: {}
// 				}
// 			]
// 		}).compile()

// 		undislikedCommentHandler = module.get<UndislikedCommentHandler>(
// 			UndislikedCommentHandler
// 		)
// 		commentsRepo = module.get<CommentsRepo>(CommentsRepo)
// 		dislikesRepo = module.get<DislikesRepo>(DislikesRepo)
// 	})

// 	it('should be defined', (): void => {
// 		expect(undislikedCommentHandler).toBeDefined()
// 	})
// })
