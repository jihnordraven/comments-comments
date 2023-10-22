import { Test, TestingModule } from '@nestjs/testing'
import { CommentsRepo } from './comments.repo'
import { PrismaService } from '../../../../prisma/prisma.service'

describe('CreateCommentHandler', (): void => {
	let commentsRepo: CommentsRepo

	beforeEach(async (): Promise<void> => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				CommentsRepo,
				{
					provide: PrismaService,
					useValue: {}
				}
			]
		}).compile()

		commentsRepo = module.get<CommentsRepo>(CommentsRepo)
	})

	it('should be defined', (): void => {
		expect(CommentsRepo).toBeDefined()
	})
})
