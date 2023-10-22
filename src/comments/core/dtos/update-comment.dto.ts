import { IsNotEmpty, IsString, IsUUID, Length, Matches } from 'class-validator'
import { CommentContentPattern } from '../../../utils/patterns'

export class UpdateCommentDto {
	@IsNotEmpty()
	@IsString()
	@IsUUID()
	readonly id: string

	@IsNotEmpty()
	@IsString()
	@Matches(CommentContentPattern())
	@Length(1, 200)
	readonly content: string
}
