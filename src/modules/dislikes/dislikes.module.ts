import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { DH } from './commands'
import { DislikesRepo } from './repositories/dislikes.repo'
import { CommentsModule } from '../comments/comments.module'
import { DislikesController } from './controllers/dislikes.controller'

@Module({
	imports: [CqrsModule, CommentsModule],
	controllers: [DislikesController],
	providers: [...DH, DislikesRepo]
})
export class DislikesModule {}
