import { Test, TestingModule } from '@nestjs/testing'
import { AppController } from './app.controller'
import { ConfigService } from '@nestjs/config'

describe('AppController', (): void => {
	let appController: AppController
	let configService: ConfigService

	beforeEach(async (): Promise<void> => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [AppController],
			providers: [
				{
					provide: ConfigService,
					useValue: {
						getOrThrow: jest.fn()
					}
				}
			]
		}).compile()

		appController = module.get<AppController>(AppController)
		configService = module.get<ConfigService>(ConfigService)
	})

	it('should be defined', (): void => {
		expect(appController).toBeDefined()
	})
})
