import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../../../prisma/prisma.service'
import { FindManyComments } from '../../core/types'
import { Comment } from '@prisma/client'

@Injectable()
export class CommentsQueryRepo {
	constructor(private readonly prisma: PrismaService) {}

	public async findMany({
		query = '',
		page = 1,
		limit = 25,
		orderByDate = 'desc',
		orderByLikes = 'desc'
	}: FindManyComments): Promise<any> {
		const skip = (page - 1) * limit

		const comments: Comment[] = await this.prisma.comment.findMany({
			where: { content: query },
			skip,
			take: limit,
			orderBy: [{ createdAt: orderByDate }, { likesCount: orderByLikes }]
		})

		if (!comments.length) return null

		return comments
	}
}
