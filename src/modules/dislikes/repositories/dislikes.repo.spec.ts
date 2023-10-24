import { Test, TestingModule } from '@nestjs/testing'
import { DislikesRepo } from './dislikes.repo'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { PrismaService } from '../../../../prisma/prisma.service'
import { Cache } from 'cache-manager'

describe('DislikesRepo', (): void => {
	let dislikesRepo: DislikesRepo
	let cache: Cache
	let prisma: PrismaService

	beforeEach(async (): Promise<void> => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				DislikesRepo,
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

		dislikesRepo = module.get<DislikesRepo>(DislikesRepo)
		cache = module.get<Cache>(CACHE_MANAGER)
		prisma = module.get<PrismaService>(PrismaService)
	})

	it('should be defined', (): void => {
		expect(dislikesRepo).toBeDefined()
	})
})
