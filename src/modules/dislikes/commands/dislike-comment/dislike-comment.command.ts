import { UserAndCommentIds } from '../../core/types'

export class DislikeCommentCommand {
	constructor(public readonly input: UserAndCommentIds) {}
}
