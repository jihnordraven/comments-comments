import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { HelloPageTemplate } from 'static/templates'
import { APP_SWAGGER } from './utils/swagger'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('App Controller')
@Controller()
export class AppController {
	constructor(private readonly config: ConfigService) {}

	@APP_SWAGGER.SwaggerToStatus()
	@Get()
	@HttpCode(HttpStatus.OK)
	public status(): string {
		return HelloPageTemplate({ HOST: this.config.getOrThrow<string>('HOST') })
	}
}
