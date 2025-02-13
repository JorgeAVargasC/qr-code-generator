import { create } from 'zustand'

type Store = {
	theme: 'light' | 'dark'
	setTheme: (theme: 'light' | 'dark') => void
	toggleTheme: () => void
}

export const useThemeStore = create<Store>((set, get) => ({
	theme: window.matchMedia('(prefers-color-scheme: dark)').matches
		? 'dark'
		: 'light',
	setTheme: (theme) => set({ theme }),
	toggleTheme: () => set({ theme: get().theme === 'light' ? 'dark' : 'light' })
}))
