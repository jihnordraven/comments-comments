import { Test, TestingModule } from '@nestjs/testing'
import { CommentsService } from './comments.service'
import { ConfigService } from '@nestjs/config'

describe('CreateCommentHandler', (): void => {
	let commentsService: CommentsService

	beforeEach(async (): Promise<void> => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				CommentsService,
				{
					provide: ConfigService,
					useValue: {}
				}
			]
		}).compile()

		commentsService = module.get<CommentsService>(CommentsService)
	})

	it('should be defined', (): void => {
		expect(commentsService).toBeDefined()
	})
})
