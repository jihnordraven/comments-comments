export * from './comments.repo'
export * from './comments-query.repo'

import { CommentsQueryRepo } from './comments-query.repo'
import { CommentsRepo } from './comments.repo'

export const COMMENTS_REPOS = [CommentsRepo, CommentsQueryRepo]
