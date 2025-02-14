import { Button } from '@/components/ui/button'
import { useThemeStore } from '@/store/use-theme-store'
import { Moon, Sun } from 'lucide-react'

export const ThemeButton = () => {
	const theme = useThemeStore((state) => state.theme)
	const toggleTheme = useThemeStore((state) => state.toggleTheme)

	return (
		<Button
			size={'icon'}
			aria-label='Toggle theme'
			onClick={toggleTheme}
		>
			{theme === 'light' ? <Moon /> : <Sun />}
		</Button>
	)
}
