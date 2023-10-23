export type UpdateCommentInput = {
	id: string
	content?: string
	file?: Express.Multer.File
	userId: string
}
