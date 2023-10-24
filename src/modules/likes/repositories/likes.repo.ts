import { Inject, Injectable, InternalServerErrorException, Logger } from '@nestjs/common'
import { PrismaService } from '../../../../prisma/prisma.service'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Cache } from 'cache-manager'
import { Dislike, Like } from '@prisma/client'
import { ToggleLike } from '../core/types'
import { UserAndCommentIds } from '../../../modules/dislikes/core/types'
import { red } from 'colorette'

@Injectable()
export class LikesRepo {
	private readonly logger: Logger = new Logger(LikesRepo.name)

	constructor(
		@Inject(CACHE_MANAGER) private readonly cache: Cache,
		private readonly prisma: PrismaService
	) {}

	public async create(data: ToggleLike): Promise<Like> {
		const like: Like = await this.prisma.like
			.create({ data })
			.catch((err: string) => {
				this.logger.error(red(err))
				throw new InternalServerErrorException(red(err))
			})

		await this.cache.set(`like-id-${like.id}`, like, 1800)
		await this.cache.set(`like-ui-${like.userId}-ci-${like.commentId}`, like, 1800)

		return like
	}

	public async delete(id: string): Promise<Like> {
		const like = await this.prisma.like.delete({ where: { id } })

		await this.cleanCache(like)
		return like
	}

	public async findById(id: string): Promise<Like | null> {
		const like: Like | null = await this.cache.get<Like>(`like-id-${id}`)
		if (!like) {
			const like: Like | null = await this.prisma.like.findUnique({
				where: { id }
			})
			if (!like) return null
			await this.cache.set(`like-id-${id}`, like, 1800)
			return like
		}
		return like
	}

	public async findByUserAndCommentIds({
		userId,
		commentId
	}: UserAndCommentIds): Promise<Like | null> {
		const like: Like | null = await this.cache.get<Like>(
			`like-ui-${userId}-ci-${commentId}`
		)
		if (!like) {
			const like: Like | null = await this.prisma.like.findFirst({
				where: { AND: [{ userId }, { commentId }] }
			})
			if (!like) return null
			await this.cache.set(`like-ui-${userId}-ci-${commentId}`, like, 1800)
			return like
		}
		return like
	}

	// Helpres
	private async cleanCache(like: Like): Promise<void> {
		await this.cache.del(`like-id-${like.id}`)
		await this.cache.del(`like-ui-${like.userId}-ci-${like.commentId}`)
	}

	// Extra dislike methods
	public async deleteDislike(id: string): Promise<Dislike> {
		const dislike: Dislike = await this.prisma.dislike.delete({ where: { id } })

		await this.cache.del(`dislike-id-${dislike.userId}`)
		await this.cache.del(`dislike-ui-${dislike.userId}-ci-${dislike.commentId}`)

		return dislike
	}

	public async findDislikeByUserAndCommentIds({
		userId,
		commentId
	}: UserAndCommentIds): Promise<Dislike | null> {
		const dislike: Dislike | null = await this.cache.get(
			`dislike-ui-${userId}-ci-${commentId}`
		)
		if (!dislike) {
			const dislike: Dislike | null = await this.prisma.dislike.findFirst({
				where: { AND: [{ userId }, { commentId }] }
			})
			if (!dislike) return null
			await this.cache.set(`dislike-ui-${userId}-ci-${commentId}`, dislike, 1800)
			return dislike
		}
		return dislike
	}
}
