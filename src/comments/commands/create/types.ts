export type CreateCommentInput = {
	content: string
	parentId: string
	file: any /* Express.Multer.File */
	userId: string
}
