import { LikeCommentCommand } from './like-comment/like-comment.command'
import { LikeCommentHandler } from './like-comment/like-comment.handler'

import { UnlikeCommentCommand } from './unlike-comment/unlike-comment.command'
import { UnlikeCommentHandler } from './unlike-comment/unlike-comment.handler'

export const LC = { LikeCommentCommand, UnlikeCommentCommand }

export const LH = [LikeCommentHandler, UnlikeCommentHandler]
