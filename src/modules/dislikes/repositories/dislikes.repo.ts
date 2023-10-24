import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Inject, Injectable, InternalServerErrorException, Logger } from '@nestjs/common'
import { Dislike, Like } from '@prisma/client'
import { Cache } from 'cache-manager'
import { PrismaService } from '../../../../prisma/prisma.service'
import { UserAndCommentIds } from '../core/types'
import { red } from 'colorette'

@Injectable()
export class DislikesRepo {
	private readonly logger: Logger = new Logger(DislikesRepo.name)

	constructor(
		@Inject(CACHE_MANAGER) private readonly cache: Cache,
		private readonly prisma: PrismaService
	) {}

	public async create(data: UserAndCommentIds): Promise<Dislike> {
		const dislike: Dislike = await this.prisma.dislike
			.create({ data })
			.catch((err: string) => {
				this.logger.error(red(err))
				throw new InternalServerErrorException(red(err))
			})

		await this.cache.set(`dislike-id-${dislike.id}`, dislike, 1800)
		await this.cache.set(
			`dislike-ui-${dislike.userId}-ci-${dislike.commentId}`,
			dislike,
			1800
		)

		return dislike
	}

	public async delete(id: string): Promise<Dislike> {
		const dislike: Dislike = await this.prisma.dislike.delete({ where: { id } })

		await this.cleanCache(dislike)
		return dislike
	}

	public async findById(id: string): Promise<Dislike | null> {
		const dislike: Dislike | null = await this.cache.get(`dislike-id-${id}`)
		if (!dislike) {
			const dislike: Dislike | null = await this.prisma.dislike.findUnique({
				where: { id }
			})
			if (!dislike) return null
			await this.cache.set(`dislike-id-${id}`, dislike, 1800)
			return dislike
		}
		return dislike
	}

	public async findByUserAndCommentIds({
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

	// Helpers
	private async cleanCache(dislike: Dislike): Promise<void> {
		await this.cache.del(`dislike-id-${dislike.id}`)
		await this.cache.del(`dislike-ui-${dislike.userId}-ci-${dislike.id}`)
	}

	// Extra like methods
	public async deleteLike(id: string): Promise<Like> {
		const like = await this.prisma.like.delete({ where: { id } })

		await this.cache.del(`like-id-${id}`)
		await this.cache.del(`like-ui-${like.userId}-ci-${like.commentId}`)

		return like
	}

	public async findLikeByUserAndCommentIds({
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
}
