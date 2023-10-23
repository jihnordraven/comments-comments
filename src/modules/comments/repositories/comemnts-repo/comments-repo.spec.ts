import { Test, TestingModule } from '@nestjs/testing'
import { CommentsRepo } from './comments.repo'
import { PrismaService } from '../../../../../prisma/prisma.service'
import { CACHE_MANAGER } from '@nestjs/cache-manager'

describe('CreateCommentHandler', (): void => {
	let commentsRepo: CommentsRepo

	beforeEach(async (): Promise<void> => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				CommentsRepo,
				{
					provide: PrismaService,
					useValue: {}
				},
				{
					provide: CACHE_MANAGER,
					useValue: {
						get: jest.fn(),
						set: jest.fn(),
						del: jest.fn()
					}
				}
			]
		}).compile()

		commentsRepo = module.get<CommentsRepo>(CommentsRepo)
	})

	it('should be defined', (): void => {
		expect(CommentsRepo).toBeDefined()
	})
})
