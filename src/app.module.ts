import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { CommentsModule } from './modules/comments/comments.module'
import { PrismaModule } from 'prisma/prisma.module'
import { STRATEGIES } from './guards-handlers/strategies'
import { JwtWsGuard } from './guards-handlers/guards'
import { AppController } from './app.controller'
import { LikesModule } from './modules/likes/likes.module'
import { DislikesModule } from './modules/dislikes/dislikes.module'
import { CacheModule } from '@nestjs/cache-manager'
import { redisStore } from 'cache-manager-redis-yet'

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		CacheModule.registerAsync({
			isGlobal: true,
			imports: [ConfigModule],
			useFactory: async (config: ConfigService) => ({
				store: await redisStore({
					database: config.getOrThrow<number>('REDIS_DB'),
					password: config.getOrThrow<string>('REDIS_PASS'),
					socket: {
						host: config.getOrThrow<string>('REDIS_HOST'),
						port: config.getOrThrow<number>('REDIS_PORT')
					}
				})
			}),
			inject: [ConfigService]
		}),
		PrismaModule,
		CommentsModule,
		LikesModule,
		DislikesModule
	],
	controllers: [AppController],
	providers: [JwtWsGuard, ...STRATEGIES]
})
export class AppModule {}
