export type CreateCommentInput = {
	content: string
	parentId?: string
	file?: Express.Multer.File
	userId: string
}
