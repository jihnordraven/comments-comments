import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { CommentsModule } from './modules/comments/comments.module'
import { PrismaModule } from 'prisma/prisma.module'
import { STRATEGIES } from './guards-handlers/strategies'
import { JwtWsGuard } from './guards-handlers/guards'
import { AppController } from './app.controller'

@Module({
	imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule, CommentsModule],
	controllers: [AppController],
	providers: [JwtWsGuard, ...STRATEGIES]
})
export class AppModule {}
