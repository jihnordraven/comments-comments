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

@Module({
	imports: [
		CqrsModule,
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
