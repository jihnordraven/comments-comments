export * from './comments-query-repo/comments-query.repo'
export * from './comemnts-repo/comments.repo'

import { CommentsRepo } from './comemnts-repo/comments.repo'
import { CommentsQueryRepo } from './comments-query-repo/comments-query.repo'

export const COMMENTS_REPOS = [CommentsRepo, CommentsQueryRepo]
