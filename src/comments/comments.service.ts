import { Inject, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { verify } from 'jsonwebtoken'
import path from 'path'
import { Socket } from 'socket.io'
import { FileType } from './core/types'
import { WsException } from '@nestjs/websockets'

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

	public async validateFile(file: FileType): Promise<any> {
		const allowedExtensions: string[] = ['png', 'jpg', 'jpeg']

		const extname: string = path.extname(file.originalname).toLowerCase()

		const imgMaxSize: number = 1024 * 1024
		const txtMaxSize: number = 1024 * 100

		switch (file.mimetype) {
			case 'image/*':
				if (allowedExtensions.includes(extname) && file.size <= imgMaxSize) {
					return file
				} else {
					throw new WsException({ message: 'File is too large' })
				}
			case 'text/plain':
				if (extname === 'txt' && file.size <= txtMaxSize) {
					return file
				} else {
					throw new WsException({ message: 'File is too large' })
				}
			default:
				throw new WsException({ message: 'Invalid file type' })
		}
	}
}
