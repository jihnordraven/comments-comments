import { DislikeCommentCommand } from './dislike-comment/dislike-comment.command'
import { DislikeCommentHandler } from './dislike-comment/dislike-comment.handler'

import { UndislikeCommentCommand } from './undislike-comment/undislike-comment.command'
import { UndislikeCommentHandler } from './undislike-comment/undislike-comment.handler'

export const DC = { DislikeCommentCommand, UndislikeCommentCommand }

export const DH = [DislikeCommentHandler, UndislikeCommentHandler]
