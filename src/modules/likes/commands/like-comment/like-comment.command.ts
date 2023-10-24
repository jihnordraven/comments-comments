import { UserAndCommentIds } from '../../../../modules/dislikes/core/types'

export class LikeCommentCommand {
	constructor(public readonly input: UserAndCommentIds) {}
}
