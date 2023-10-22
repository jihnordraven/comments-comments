import { JwtAccessPayload } from '@guards'
import { ExecutionContext, createParamDecorator } from '@nestjs/common'
import { Request } from 'express'

export const JwtAccessPayloadDecorator = createParamDecorator(
	(key: keyof JwtAccessPayload, ctx: ExecutionContext): any => {
		const req: Request = ctx.switchToHttp().getRequest()

		return key ? req.user[key] : req.user
	}
)
