import { Test, TestingModule } from '@nestjs/testing'
import { CommentsController } from './comments.controller'
import { CommandBus } from '@nestjs/cqrs'
import { CommentsService } from '../services/comments.service'
import { CommentsGateway } from '../gateways/comments.gateway'

describe('CreateCommentHandler', (): void => {
	let commentsController: CommentsController

	beforeEach(async (): Promise<void> => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				CommentsController,
				{
					provide: CommandBus,
					useValue: {}
				},
				{
					provide: CommentsService,
					useValue: {}
				},
				{
					provide: CommentsGateway,
					useValue: {}
				}
			]
		}).compile()

		commentsController = module.get<CommentsController>(CommentsController)
	})

	it('should be defined', (): void => {
		expect(commentsController).toBeDefined()
	})
})
