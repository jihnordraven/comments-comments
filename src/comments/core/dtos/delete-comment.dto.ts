import { IsNotEmpty } from 'class-validator'

export class DeleteCommentDto {
	@IsNotEmpty()
	readonly id: string
}
