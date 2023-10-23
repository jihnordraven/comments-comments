import { Test, TestingModule } from '@nestjs/testing'
import { UpdateCommentHandler } from './update-comment.handler'
import { FILES_SERVICE } from '../../../../utils/constants'
import { CommentsRepo } from '../../repositories'

describe('UpdateCommentHandler', (): void => {
	let updateCommentHandler: UpdateCommentHandler

	beforeEach(async (): Promise<void> => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UpdateCommentHandler,
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

		updateCommentHandler = module.get<UpdateCommentHandler>(UpdateCommentHandler)
	})

	it('should be defined', (): void => {
		expect(updateCommentHandler).toBeDefined()
	})
})
