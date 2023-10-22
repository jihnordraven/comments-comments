import { CommentContentPattern } from '@patterns'
import {
	IsNotEmpty,
	IsOptional,
	IsString,
	IsUUID,
	Length,
	Matches
} from 'class-validator'

export class CreateCommentDto {
	@IsNotEmpty()
	@IsString()
	@Matches(CommentContentPattern())
	@Length(1, 200)
	readonly content: string

	@IsOptional()
	@IsString()
	@IsUUID()
	readonly parentId: string
}
