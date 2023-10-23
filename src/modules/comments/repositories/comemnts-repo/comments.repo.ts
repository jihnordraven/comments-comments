import { Inject, Injectable, InternalServerErrorException, Logger } from '@nestjs/common'
import { PrismaService } from '../../../../../prisma/prisma.service'
import { Comment } from '@prisma/client'
import { red } from 'colorette'
import { CreateComment, UpdateComment } from '../../core/types'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Cache } from 'cache-manager'

@Injectable()
export class CommentsRepo {
	private readonly logger: Logger = new Logger(CommentsRepo.name)

	constructor(
		@Inject(CACHE_MANAGER) private readonly cache: Cache,
		private readonly prisma: PrismaService
	) {}

	public async create(data: CreateComment): Promise<Comment> {
		const comment: Comment | void = await this.prisma.comment
			.create({ data })
			.catch((err: string) => this.logger.error(red(err)))
		if (!comment) throw new InternalServerErrorException()

		return comment
	}

	public async findById(id: string): Promise<Comment | null> {
		const comment: Comment | null = await this.cache.get<Comment>(`comment-id-${id}`)

		if (!comment) {
			const comment: Comment | null = await this.prisma.comment.findUnique({
				where: { id }
			})
			if (!comment) return null
			await this.cache.set(`comment-id-${id}`, comment, 1800)
			return comment
		}
		return comment
	}

	public async update(id: string, body: UpdateComment): Promise<Comment> {
		const comment = await this.prisma.comment
			.update({
				where: { id },
				data: body
			})
			.catch(err => this.logger.error(red(err)))
		if (!comment) throw new InternalServerErrorException('Unable to update comment')

		await this.cleanCache(comment)

		await this.cache.set(`comment-id-${comment.id}`, comment, 1800)
		return comment
	}

	public async delete(id: string): Promise<Comment> {
		const comment: Comment | void = await this.prisma.comment
			.delete({
				where: { id }
			})
			.catch((err: string) => this.logger.error(red(err)))

		if (!comment) throw new InternalServerErrorException()

		await this.cleanCache(comment)
		return comment
	}

	// Helpers
	private async cleanCache(comment: Comment): Promise<void> {
		await this.cache.del(`comment-id-${comment.id}`)
		await this.cache.del('comments')
	}
}
