import { useThemeStore } from '@/store/use-theme-store'
import clsx from 'clsx'

type Props = {
	children: React.ReactNode
}

export const ThemeProvider = ({ children }: Props) => {
	const theme = useThemeStore((state) => state.theme)

	return (
		<div className={clsx([theme, 'bg-background', 'text-foreground'])}>
			{children}
		</div>
	)
}
