import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { verify } from 'jsonwebtoken'
import { extname } from 'path'
import { Socket } from 'socket.io'

@Injectable()
export class CommentsService {
	constructor(private readonly config: ConfigService) {}

	public async validateToken(client: Socket): Promise<void> {
		const token: string = client.handshake?.headers?.authorization
		if (!token) client.disconnect()

		try {
			verify(token, this.config.getOrThrow<string>('JWT_ACCESS_SECRET'))
		} catch (err: unknown) {
			client.disconnect()
		}
	}

	public async validateFile(
		file: any /* Express.Multer.File*/
	): Promise<any /* Express.Multer.File */> {
		const allowedExtensions: string[] = ['png', 'jpg', 'jpeg']

		const fileExtname: string = extname(file.originalname).toLowerCase()

		const imgMaxSize: number = 1024 * 1024
		const txtMaxSize: number = 1024 * 100

		if (allowedExtensions.includes(fileExtname)) {
			if (file.size <= imgMaxSize) {
				return file
			} else {
				throw new BadRequestException('Image file is too large')
			}
		} else if (fileExtname === '.txt') {
			if (file.size <= txtMaxSize) {
				return file
			} else {
				throw new BadRequestException('Txt file is too large')
			}
		} else {
			throw new BadRequestException('Invalid file type')
		}
	}
}
