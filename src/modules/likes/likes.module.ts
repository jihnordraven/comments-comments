import { Module } from '@nestjs/common'
import { CommentsModule } from '../comments/comments.module'
import { CqrsModule } from '@nestjs/cqrs'
import { LH } from './commands'
import { LikesController } from './controllers/likes.controller'
import { LikesRepo } from './repositories/likes.repo'

@Module({
	imports: [CqrsModule, CommentsModule],
	controllers: [LikesController],
	providers: [LikesRepo, ...LH]
})
export class LikesModule {}
