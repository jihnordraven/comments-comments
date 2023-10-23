import {
	ForbiddenException,
	Injectable,
	InternalServerErrorException,
	Logger,
	NotFoundException
} from '@nestjs/common'
import { PrismaService } from '../../../../../prisma/prisma.service'
import { Comment } from '@prisma/client'
import { red } from 'colorette'
import { CreateComment, DeleteComment, UpdateComment } from '../../core/types'

@Injectable()
export class CommentsRepo {
	private readonly logger: Logger = new Logger(CommentsRepo.name)

	constructor(private readonly prisma: PrismaService) {}

	public async create(data: CreateComment): Promise<Comment> {
		const comment: Comment | void = await this.prisma.comment
			.create({ data })
			.catch((err: string) => this.logger.error(red(err)))
		if (!comment) throw new InternalServerErrorException()

		return comment
	}

	public async findById(id: string): Promise<Comment> {
		return this.prisma.comment.findUnique({ where: { id } })
	}

	public async update(id: string, body: UpdateComment): Promise<Comment> {
		return this.prisma.comment.update({
			where: { id },
			data: body
		})
	}

	public async delete(id: string): Promise<Comment> {
		const comment: Comment | void = await this.prisma.comment
			.delete({
				where: { id }
			})
			.catch((err: string) => this.logger.error(red(err)))

		if (!comment) throw new InternalServerErrorException()
		return comment
	}
}
