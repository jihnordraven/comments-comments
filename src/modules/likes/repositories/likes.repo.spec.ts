import { Test, TestingModule } from '@nestjs/testing'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Cache } from 'cache-manager'
import { PrismaService } from '../../../../prisma/prisma.service'
import { LikesRepo } from './likes.repo'

describe('LikesRepo', (): void => {
	let likesRepo: LikesRepo
	let cache: Cache
	let prisma: PrismaService

	beforeEach(async (): Promise<void> => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				LikesRepo,
				{
					provide: CACHE_MANAGER,
					useValue: {}
				},
				{
					provide: PrismaService,
					useValue: {}
				}
			]
		}).compile()

		likesRepo = module.get<LikesRepo>(LikesRepo)
		cache = module.get<Cache>(CACHE_MANAGER)
		prisma = module.get<PrismaService>(PrismaService)
	})

	it('should be defined', (): void => {
		expect(likesRepo).toBeDefined()
	})
})
