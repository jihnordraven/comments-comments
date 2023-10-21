import { CreateCommentInput } from './types'

export class CreateCommentCommand {
	constructor(public readonly input: CreateCommentInput) {}
}
