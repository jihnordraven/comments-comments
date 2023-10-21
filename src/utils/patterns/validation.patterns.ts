type ValidationPattern = () => RegExp

export const CommentContentPattern: ValidationPattern = (): RegExp =>
	/<([a|code|i|strong]+)[^>]*>[\s\S]*<\/\1>|[0-9a-zA-Z\s]+/g
