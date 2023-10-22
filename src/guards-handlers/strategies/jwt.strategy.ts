import { CONFIG } from '@config'
import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { JwtAccessPayload } from '../guards/jwt-ws.guard'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: CONFIG.JWT_ACCESS_SECRET,
			ignoreExpiration: false
		})
	}

	public async validate(payload: JwtAccessPayload): Promise<JwtAccessPayload> {
		return payload
	}
}
