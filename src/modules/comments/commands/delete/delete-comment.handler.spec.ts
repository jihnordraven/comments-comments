import { Test, TestingModule } from '@nestjs/testing'
import { DeleteCommentHandler } from './delete-comment.handler'
import { CommentsRepo } from '../../repositories'
import { FILES_SERVICE } from '../../../../utils/constants'

describe('DeleteCommentHandler', (): void => {
	let deleteCommentHandler: DeleteCommentHandler

	beforeEach(async (): Promise<void> => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				DeleteCommentHandler,
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

		deleteCommentHandler = module.get<DeleteCommentHandler>(DeleteCommentHandler)
	})

	it('should be defined', (): void => {
		expect(deleteCommentHandler).toBeDefined()
	})
})
