// import { Test, TestingModule } from '@nestjs/testing'
// import { DislikedCommentHandler } from './disliked-comment.handler'
// import { CommentsRepo } from '../../repositories'
// import { LikesRepo } from '../../../../modules/likes/repositories/likes.repo'

// describe('DislackedCommentHandler', (): void => {
// 	let dislikedCommentHandler: DislikedCommentHandler
// 	let commentsRepo: CommentsRepo
// 	let likesRepo: LikesRepo

// 	beforeEach(async (): Promise<void> => {
// 		const module: TestingModule = await Test.createTestingModule({
// 			providers: [
// 				DislikedCommentHandler,
// 				{
// 					provide: CommentsRepo,
// 					useValue: {}
// 				},
// 				{
// 					provide: LikesRepo,
// 					useValue: {}
// 				}
// 			]
// 		}).compile()

// 		dislikedCommentHandler =
// 			module.get<DislikedCommentHandler>(DislikedCommentHandler)
// 		commentsRepo = module.get<CommentsRepo>(CommentsRepo)
// 		likesRepo = module.get<LikesRepo>(LikesRepo)
// 	})

// 	it('should be defined', (): void => {
// 		expect(dislikedCommentHandler).toBeDefined()
// 	})
// })
