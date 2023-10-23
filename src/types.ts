// it is not the production file

export type FileUploadSend = {
	buffer: Buffer
	originalname: string
}

export type FileUploadRes = {
	ok: boolean
	fileUrl?: string
	err?: string
}

export type FileDeleteRes = {
	ok: boolean
	err?: string
}
