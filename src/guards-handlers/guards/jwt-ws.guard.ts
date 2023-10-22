import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { verify } from 'jsonwebtoken'
import { Socket } from 'socket.io'

export type JwtAccessPayload = {
	userId: string
	iat: string
	exp: string
}

@Injectable()
export class JwtWsGuard implements CanActivate {
	constructor(private readonly config: ConfigService) {}

	canActivate(ctx: ExecutionContext): boolean {
		const client: Socket & { userId: string } = ctx.switchToWs().getClient()

		const token: string = client.handshake?.headers?.authorization
		if (!token) client.disconnect()

		const secret: string = this.config.getOrThrow<string>('JWT_ACCESS_SECRET')
		try {
			const decoded: JwtAccessPayload = verify(
				token,
				secret
			) as unknown as JwtAccessPayload

			client.userId = decoded.userId
		} catch (err: unknown) {
			client.disconnect()
			throw new UnauthorizedException(err)
		}

		return true
	}
}
