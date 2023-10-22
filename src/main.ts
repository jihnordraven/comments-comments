import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import { Logger, RequestMethod, ValidationPipe } from '@nestjs/common'
import { blue } from 'colorette'
import { swaggerSetup } from './utils/swagger'

const logger: Logger = new Logger('bootstrap')

const bootstrap = async (): Promise<void> => {
	const app: NestExpressApplication =
		await NestFactory.create<NestExpressApplication>(AppModule)

	app.setGlobalPrefix('api/v1', { exclude: [{ path: '/', method: RequestMethod.GET }] })
	app.enableCors()
	app.useGlobalPipes(new ValidationPipe())

	const config: ConfigService = app.get<ConfigService>(ConfigService)

	const PORT: number = config.getOrThrow<number>('PORT')
	const HOST: string = config.getOrThrow<string>('HOST')
	const MODE: string = config.getOrThrow<string>('MODE')

	if (MODE !== 'prod') swaggerSetup(app)

	await app
		.listen(PORT)
		.then(() =>
			logger.log(
				blue(`Server is listening PORT:${PORT} on HOST:${HOST} with MODE:${MODE}`)
			)
		)
}

bootstrap()
