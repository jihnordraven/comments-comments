import { Prisma } from '@prisma/client'

export type FindManyComments = {
	query?: string
	page?: number
	limit?: number
	orderByDate?: Prisma.SortOrder
	orderByLikes?: Prisma.SortOrder
}
