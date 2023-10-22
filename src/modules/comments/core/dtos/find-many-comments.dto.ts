import { Prisma } from '@prisma/client'
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class FindManyCommentsDto {
	@IsOptional()
	@IsString()
	readonly query: string

	@IsOptional()
	@IsNumber()
	readonly page: number

	@IsOptional()
	@IsNumber()
	readonly limit: number

	@IsOptional()
	readonly orderByDate: Prisma.SortOrder

	@IsOptional()
	readonly orderByLikes: Prisma.SortOrder
}
