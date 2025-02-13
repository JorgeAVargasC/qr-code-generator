import { QRCodeDataURLType, QRCodeErrorCorrectionLevel } from 'qrcode'

import { create } from 'zustand'

type State = {
	size: number
	level: QRCodeErrorCorrectionLevel
	type: QRCodeDataURLType
}

type Actions = {
	setSize: (size: number) => void
	setLevel: (level: QRCodeErrorCorrectionLevel) => void
	setType: (type: QRCodeDataURLType) => void
}

type Store = State & Actions

export const useQrCodeStore = create<Store>((set) => ({
	size: 300,
	level: 'medium',
	type: 'image/png',
	setSize: (size) => set({ size }),
	setLevel: (level) => set({ level }),
	setType: (type) => set({ type })
}))
