import { Module } from '@nestjs/common'
import { CommentsService } from './services/comments.service'
import { CommentsGateway } from './gateways/comments.gateway'
import { COMMENTS_REPOS } from './repositories'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { CH } from './commands'
import { CqrsModule } from '@nestjs/cqrs'
import { CommentsController } from './controllers/comments.controller'
import { FILES_SERVICE } from '../../utils/constants'
import { CacheModule } from '@nestjs/cache-manager'
import { redisStore } from 'cache-manager-redis-yet'

@Module({
	imports: [
		CqrsModule,
		CacheModule.registerAsync({
			imports: [ConfigModule],
			useFactory: async (config: ConfigService) => ({
				store: await redisStore({
					password: config.getOrThrow<string>('REDIS_PASS'),
					socket: {
						host: config.getOrThrow<string>('REDIS_HOST'),
						port: config.getOrThrow<number>('REDIS_PORT')
					}
				})
			}),
			inject: [ConfigService]
		}),
		ClientsModule.registerAsync([
			{
				name: FILES_SERVICE,
				useFactory: (config: ConfigService) => ({
					transport: Transport.RMQ,
					options: {
						urls: [config.getOrThrow<string>('RMQ_HOST')],
						queue: config.getOrThrow<string>('RMQ_QUEUE')
					}
				}),
				imports: [ConfigModule],
				inject: [ConfigService]
			}
		])
	],
	controllers: [CommentsController],
	providers: [CommentsGateway, CommentsService, ...COMMENTS_REPOS, ...CH]
})
export class CommentsModule {}
