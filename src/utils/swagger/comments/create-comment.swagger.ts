import { HttpStatus, applyDecorators } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { CreateCommentDto } from '../../../modules/comments/core/dtos'

export const SwaggerToCreateComment = (): MethodDecorator => {
	return applyDecorators(
		ApiOperation({ summary: 'Create a comment' }),

		ApiBody({
			type: CreateCommentDto,
			examples: {
				example: {
					value: {
						content: "Hi! That's a good news!",
						parentId:
							'OPTIONAL! example: 455e02fb-07ef-4d6d-ad35-9afe26bed1d7',
						file: 'OPTIONAL! png | jpg | jpeg or txt files (img max image size | 100kb max txt size)'
					}
				}
			}
		}),

		ApiResponse({
			status: HttpStatus.OK,
			description:
				"Success. Comment created. emit client with event: 'comment-created'"
		}),
		ApiResponse({
			status: HttpStatus.UNAUTHORIZED,
			description: 'Access token is missing, invalid or expired'
		}),
		ApiResponse({
			status: HttpStatus.BAD_REQUEST,
			description:
				'Invalid data | content is longer than 200 chracters | invalid file type | file is too large'
		}),
		ApiResponse({
			status: HttpStatus.INTERNAL_SERVER_ERROR,
			description: 'The server is not responding'
		})
	)
}
