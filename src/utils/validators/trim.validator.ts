import { Transform } from 'class-transformer'

export function TrimValidator(): PropertyDecorator {
	return Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
}
