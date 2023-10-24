import { CreateCommentCommand } from './create/create-comment.command'
import { CreateCommentHandler } from './create/create-comment.handler'
import { DeleteCommentCommand } from './delete/delete-comment.command'
import { DeleteCommentHandler } from './delete/delete-comment.handler'
import { UpdateCommentCommand } from './update/update-comment.command'
import { UpdateCommentHandler } from './update/update-comment.handler'

export const CC = { CreateCommentCommand, UpdateCommentCommand, DeleteCommentCommand }

export const CCH = [CreateCommentHandler, UpdateCommentHandler, DeleteCommentHandler]
