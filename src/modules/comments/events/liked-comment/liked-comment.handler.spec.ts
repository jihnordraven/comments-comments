// import { Test, TestingModule } from '@nestjs/testing'
// import { CommentsRepo } from '../../repositories'
// import { DislikesRepo } from '../../../../modules/dislikes/repositories/dislikes.repo'
// import { LikedCommentHandler } from './liked-comment.handler'

// describe('DislackedCommentHandler', (): void => {
// 	let likedCommentHandler: LikedCommentHandler
// 	let commentsRepo: CommentsRepo
// 	let dislikesRepo: DislikesRepo

// 	beforeEach(async (): Promise<void> => {
// 		const module: TestingModule = await Test.createTestingModule({
// 			providers: [
// 				LikedCommentHandler,
// 				{
// 					provide: CommentsRepo,
// 					useValue: {}
// 				},
// 				{
// 					provide: DislikesRepo,
// 					useValue: {}
// 				}
// 			]
// 		}).compile()

// 		likedCommentHandler = module.get<LikedCommentHandler>(LikedCommentHandler)
// 		commentsRepo = module.get<CommentsRepo>(CommentsRepo)
// 		dislikesRepo = module.get<DislikesRepo>(DislikesRepo)
// 	})

// 	it('should be defined', (): void => {
// 		expect(likedCommentHandler).toBeDefined()
// 	})
// })
