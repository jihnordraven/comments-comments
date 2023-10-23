import { UpdateCommentInput } from './types'

export class UpdateCommentCommand {
	constructor(public readonly input: UpdateCommentInput) {}
}
