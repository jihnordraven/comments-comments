import { UserAndCommentIds } from '../../../../modules/dislikes/core/types'

export class UnlikeCommentCommand {
	constructor(public readonly input: UserAndCommentIds) {}
}
