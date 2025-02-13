import { QRCodeErrorCorrectionLevel as T } from 'qrcode'

export const levelsOptions: Partial<Record<T, string>> = {
	high: 'High',
	quartile: 'Quartile',
	medium: 'Medium',
	low: 'Low'
}
