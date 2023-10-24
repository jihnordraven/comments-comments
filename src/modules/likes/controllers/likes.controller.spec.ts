import { Test, TestingModule } from '@nestjs/testing'
import { CommandBus } from '@nestjs/cqrs'
import { CommentsGateway } from '../../../modules/comments/gateways/comments.gateway'
import { LikesController } from './likes.controller'

describe('LikesController', (): void => {
	let likesController: LikesController
	let commandBus: CommandBus
	let commentsGateway: CommentsGateway

	beforeEach(async (): Promise<void> => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				LikesController,
				{
					provide: CommandBus,
					useValue: {}
				},
				{
					provide: CommentsGateway,
					useValue: {}
				}
			]
		}).compile()

		likesController = module.get<LikesController>(LikesController)
		commandBus = module.get<CommandBus>(CommandBus)
		commentsGateway = module.get<CommentsGateway>(CommentsGateway)
	})

	it('should be defined', (): void => {
		expect(likesController).toBeDefined()
	})
})
