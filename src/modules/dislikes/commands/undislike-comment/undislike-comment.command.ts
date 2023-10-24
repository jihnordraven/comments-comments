import { UserAndCommentIds } from '../../core/types'

export class UndislikeCommentCommand {
	constructor(public readonly input: UserAndCommentIds) {}
}
