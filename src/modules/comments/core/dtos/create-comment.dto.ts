import { ApiProperty } from '@nestjs/swagger'
import { CommentContentPattern } from '../../../../utils/patterns'
import {
	IsNotEmpty,
	IsOptional,
	IsString,
	IsUUID,
	Length,
	Matches
} from 'class-validator'

export class CreateCommentDto {
	@ApiProperty({ example: 'Comment text' })
	@IsNotEmpty()
	@IsString()
	@Matches(CommentContentPattern())
	@Length(1, 200)
	readonly content: string

	@ApiProperty({ example: '455e02fb-07ef-4d6d-ad35-9afe26bed1d7' })
	@IsOptional()
	@IsString()
	@IsUUID()
	readonly parentId?: string
}
