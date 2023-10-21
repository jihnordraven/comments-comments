import { FileType } from '../../../comments/core/types'

export type CreateCommentInput = {
	content: string
	userId: string
	file: FileType
}
