import { Test, TestingModule } from '@nestjs/testing'
import { CreateCommentHandler } from './create-comment.handler'
import { FILES_SERVICE } from '../../../utils/constants'
import { CommentsRepo } from '../../../comments/repositories'

describe('CreateCommentHandler', (): void => {
	let createCommentHandler: CreateCommentHandler

	beforeEach(async (): Promise<void> => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				CreateCommentHandler,
				{
					provide: FILES_SERVICE,
					useValue: {}
				},
				{
					provide: CommentsRepo,
					useValue: {}
				}
			]
		}).compile()

		createCommentHandler = module.get<CreateCommentHandler>(CreateCommentHandler)
	})

	it('should be defined', (): void => {
		expect(createCommentHandler).toBeDefined()
	})
})
