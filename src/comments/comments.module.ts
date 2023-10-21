import { Module } from '@nestjs/common'
import { CommentsService } from './comments.service'
import { CommentsGateway } from './comments.gateway'
import { COMMENTS_REPOS } from './repositories'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { FILES_SERVICE } from '@constants'
import { CH } from './commands'
import { CqrsModule } from '@nestjs/cqrs'

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
	providers: [CommentsGateway, CommentsService, ...COMMENTS_REPOS, ...CH]
})
export class CommentsModule {}
