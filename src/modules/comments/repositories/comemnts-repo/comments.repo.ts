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
		const comment = await this.prisma.comment
			.create({ data })
			.catch((err: string) => this.logger.error(red(err)))
		if (!comment) throw new InternalServerErrorException()

		return comment
	}

	public async findById(id: string): Promise<Comment> {
		return this.prisma.comment.findUnique({ where: { id } })
	}

	public async update(body: UpdateComment, userId: string): Promise<Comment> {
		const comment: Comment = await this.findById(body.id)

		if (!comment) throw new NotFoundException()
		if (comment.userId !== userId) throw new ForbiddenException()

		const updatedComment: Comment = await this.prisma.comment.update({
			where: { ...comment },
			data: { content: body.content }
		})
		return updatedComment
	}

	public async delete(body: DeleteComment, userId: string): Promise<Comment> {
		const comment: Comment = await this.findById(body.id)

		if (!comment) throw new NotFoundException()
		if (comment.userId !== userId) throw new ForbiddenException()

		const deletedComment: Comment = await this.prisma.comment.delete({
			where: { ...comment }
		})
		return deletedComment
	}
}
