export type CreateCommentInput = {
	content: string
	file: any /* Express.Multer.File */
	userId: string
}
