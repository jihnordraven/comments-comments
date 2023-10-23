import { Test, TestingModule } from '@nestjs/testing'
import { CommentsQueryRepo } from './comments-query.repo'
import { PrismaService } from '../../../../../prisma/prisma.service'
import { CACHE_MANAGER } from '@nestjs/cache-manager'

describe('CreateCommentHandler', (): void => {
	let commentsQueryRepo: CommentsQueryRepo

	beforeEach(async (): Promise<void> => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				CommentsQueryRepo,
				{
					provide: PrismaService,
					useValue: {}
				},
				{
					provide: CACHE_MANAGER,
					useValue: {
						set: jest.fn()
					}
				}
			]
		}).compile()

		commentsQueryRepo = module.get<CommentsQueryRepo>(CommentsQueryRepo)
	})

	it('should be defined', (): void => {
		expect(commentsQueryRepo).toBeDefined()
	})
})
