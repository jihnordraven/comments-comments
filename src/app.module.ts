import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { CommentsModule } from './comments/comments.module'
import { PrismaModule } from 'prisma/prisma.module'

@Module({
	imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule, CommentsModule]
})
export class AppModule {}
