import { Test, TestingModule } from '@nestjs/testing'
import { CommentsGateway } from './comments.gateway'
import { CommentsService } from '../services/comments.service'
import { CommentsQueryRepo, CommentsRepo } from '../repositories'
import { ConfigService } from '@nestjs/config'

describe('CreateCommentHandler', (): void => {
	let commentsGateway: CommentsGateway

	beforeEach(async (): Promise<void> => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				CommentsGateway,
				{
					provide: ConfigService,
					useValue: {}
				},
				{
					provide: CommentsService,
					useValue: {}
				},
				{
					provide: CommentsRepo,
					useValue: {}
				},
				{
					provide: CommentsQueryRepo,
					useValue: {}
				}
			]
		}).compile()

		commentsGateway = module.get<CommentsGateway>(CommentsGateway)
	})

	it('should be defined', (): void => {
		expect(commentsGateway).toBeDefined()
	})
})
