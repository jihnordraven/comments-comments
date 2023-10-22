import { SwaggerToStatus } from './app/status.swagger'
import { SwaggerToCreateComment } from './comments/create-comment.swagger'

export * from './swagger.setup'

export const APP_SWAGGER = { SwaggerToStatus }

export const COMMENTS_SWAGGER = { SwaggerToCreateComment }
