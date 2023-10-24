import { CommandBus } from '@nestjs/cqrs'
import { DislikesController } from './dislikes.controller'
import { CommentsGateway } from '../../comments/gateways/comments.gateway'
import { Test, TestingModule } from '@nestjs/testing'

describe('DislikesController', (): void => {
	let dislikesController: DislikesController
	let commandBus: CommandBus
	let commentsGateway: CommentsGateway

	beforeEach(async (): Promise<void> => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [DislikesController],
			providers: [
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

		dislikesController = module.get<DislikesController>(DislikesController)
	})

	it('should be defined', (): void => {
		expect(dislikesController).toBeDefined()
	})
})
