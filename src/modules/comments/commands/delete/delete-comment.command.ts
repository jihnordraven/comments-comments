import { DeleteCommentInput } from './types'

export class DeleteCommentCommand {
	constructor(public readonly input: DeleteCommentInput) {}
}
