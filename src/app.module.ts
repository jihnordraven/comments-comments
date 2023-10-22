import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { CommentsModule } from './comments/comments.module'
import { PrismaModule } from 'prisma/prisma.module'
import { STRATEGIES } from './guards-handlers/strategies'
import { JwtWsGuard } from './guards-handlers/guards'

@Module({
	imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule, CommentsModule],
	providers: [JwtWsGuard, ...STRATEGIES]
})
export class AppModule {}
