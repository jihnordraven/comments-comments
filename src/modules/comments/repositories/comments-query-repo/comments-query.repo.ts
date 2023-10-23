import { Inject, Injectable } from '@nestjs/common'
import { PrismaService } from '../../../../../prisma/prisma.service'
import { FindManyComments } from '../../core/types'
import { Comment } from '@prisma/client'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Cache } from 'cache-manager'

@Injectable()
export class CommentsQueryRepo {
	constructor(
		@Inject(CACHE_MANAGER) private readonly cache: Cache,
		private readonly prisma: PrismaService
	) {}

	public async findMany({
		query = '',
		page = 1,
		limit = 25,
		orderByDate = 'desc',
		orderByLikes = 'desc'
	}: FindManyComments): Promise<any> {
		const skip = (page - 1) * limit

		const comments: Comment[] = await this.cache.get<Comment[]>('comments')

		if (!comments) {
			const comments: Comment[] = await this.prisma.comment.findMany({
				where: { content: query },
				skip,
				take: limit,
				orderBy: [{ createdAt: orderByDate }, { likesCount: orderByLikes }]
			})
			await this.cache.set('comments', comments, 1800)
			return comments
		}
		return comments
	}
}
