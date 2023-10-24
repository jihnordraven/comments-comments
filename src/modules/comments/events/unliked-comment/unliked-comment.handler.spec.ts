// import { Test, TestingModule } from '@nestjs/testing'
// import { CommentsRepo } from '../../repositories'
// import { DislikesRepo } from '../../../../modules/dislikes/repositories/dislikes.repo'
// import { UnlikedCommentHandler } from './unliked-comment.handler'

// describe('DislackedCommentHandler', (): void => {
// 	let unlikedCommentHandler: UnlikedCommentHandler
// 	let commentsRepo: CommentsRepo
// 	let dislikesRepo: DislikesRepo

// 	beforeEach(async (): Promise<void> => {
// 		const module: TestingModule = await Test.createTestingModule({
// 			providers: [
// 				UnlikedCommentHandler,
// 				{
// 					provide: CommentsRepo,
// 					useValue: {}
// 				}
// 			]
// 		}).compile()

// 		unlikedCommentHandler = module.get<UnlikedCommentHandler>(UnlikedCommentHandler)
// 		commentsRepo = module.get<CommentsRepo>(CommentsRepo)
// 		dislikesRepo = module.get<DislikesRepo>(DislikesRepo)
// 	})

// 	it('should be defined', (): void => {
// 		expect(unlikedCommentHandler).toBeDefined()
// 	})
// })
