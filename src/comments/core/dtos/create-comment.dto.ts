import { CommentContentPattern } from '@patterns'
import { IsNotEmpty, IsOptional, IsString, Length, Matches } from 'class-validator'
import { FileType } from '../types'

export class CreateCommentDto {
	@IsNotEmpty()
	@IsString()
	@Matches(CommentContentPattern())
	@Length(1, 200)
	readonly content: string

	@IsOptional()
	readonly file: FileType
}
