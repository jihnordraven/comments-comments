import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { CommentsModule } from './comments/comments.module'
import { PrismaModule } from 'prisma/prisma.module'
import { STRATEGIES } from './guards-handlers/strategies'

@Module({
	imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule, CommentsModule],
	providers: [...STRATEGIES]
})
export class AppModule {}
