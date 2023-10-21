import { IsNotEmpty, IsString, IsUUID } from 'class-validator'

export class RemoveCommentDto {
	@IsNotEmpty()
	@IsString()
	@IsUUID()
	readonly id: string
}
