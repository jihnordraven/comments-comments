import { applyDecorators } from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'

export const SwaggerToStatus = (): MethodDecorator => {
	return applyDecorators(ApiOperation({ summary: 'Check server status' }))
}
