import { useState, useEffect, useCallback } from 'react'
import QRCode from 'qrcode'
import { QrCode, Download, Moon, Sun, Settings2 } from 'lucide-react'
import { Input } from './components/ui/input'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from './components/ui/card'
import { Button } from './components/ui/button'
import { useDebounce } from './hooks/use-debounce'

import { Skeleton } from './components/ui/skeleton'
import { useQrCodeStore } from './store/use-qr-code-store'
import { Spinner } from './components/app/spinner/spinner'
import clsx from 'clsx'
import { useThemeStore } from './store/use-theme-store'
import { ResponsiveModal } from './components/app/responsive-modal/responsive-modal'
import { ConfigForm } from './components/app/config-form/config-form'

function App() {
	const [text, setText] = useState<string>('')
	const [qrUrl, setQrUrl] = useState<string>('')

	const handleClear = () => {
		setText('')
		setQrUrl('')
	}

	const size = useQrCodeStore((state) => state.size)
	const level = useQrCodeStore((state) => state.level)
	const type = useQrCodeStore((state) => state.type)

	const [isLoading, setIsLoading] = useState(false)

	const generateQR = useCallback(async () => {
		if (!text) return

		await QRCode.toDataURL(text, {
			width: size,
			errorCorrectionLevel: level,
			type
		})
			.then((url) => setQrUrl(url))
			.catch((err) => {
				console.error(err)
				setQrUrl('')
			})
			.finally(() => setIsLoading(false))
	}, [level, size, type, text])

	const DELAY = 1000
	const debounce = useDebounce()

	useEffect(() => {
		if (!text) handleClear()
		if (text) {
			setIsLoading(true)
			debounce(generateQR, DELAY)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [text, generateQR])

	const downloadQR = () => {
		if (!qrUrl) return
		const link = document.createElement('a')
		link.href = qrUrl
		link.download = `${text}.${type.split('/')[1]}`
		document.body.appendChild(link)
		link.click()
		document.body.removeChild(link)
	}

	const theme = useThemeStore((state) => state.theme)
	const toggleTheme = useThemeStore((state) => state.toggleTheme)

	return (
		<div
			className={clsx([
				theme,
				'bg-background text-foreground relative grid min-h-screen place-items-center'
			])}
		>
			<div className='absolute top-4 right-4'>
				<Button
					size={'icon'}
					onClick={toggleTheme}
				>
					{theme === 'light' ? <Moon /> : <Sun />}
				</Button>
			</div>

			<Card className='w-[350px] flex-1'>
				<CardHeader>
					<CardTitle className='flex items-center gap-2'>
						<QrCode className='h-5 w-5 text-sky-400' />
						<h1>QR Code Generator</h1>
					</CardTitle>
					<CardDescription>Customize and download your QR code</CardDescription>
				</CardHeader>
				<CardContent className='grid gap-4'>
					<div className='aspect-square rounded-lg border p-4'>
						{isLoading && <Skeleton className='aspect-square rounded-md' />}

						{qrUrl && !isLoading && (
							<img
								src={qrUrl}
								alt='QR Code'
								className='aspect-square rounded-md'
							/>
						)}
					</div>
					<div className='flex items-center gap-2'>
						<Input
							type='text'
							value={text}
							onChange={(e) => setText(e.target.value)}
							placeholder='Please enter some text'
						/>

						<ResponsiveModal
							title='Preferences for QR Code'
							triggerElement={
								<Button
									size='icon'
									className='aspect-square'
								>
									<Settings2 />
								</Button>
							}
						>
							<ConfigForm />
						</ResponsiveModal>
					</div>
				</CardContent>
				<CardFooter className='flex gap-2'>
					{!qrUrl && (
						<Button
							variant='outline'
							className='flex-1'
							disabled={isLoading}
						>
							{isLoading && <Spinner />}
							{isLoading ? 'Generating...' : 'Generate'}
						</Button>
					)}
					{qrUrl && (
						<Button
							variant='outline'
							className='flex-1'
							onClick={handleClear}
							disabled={isLoading}
						>
							Clear
						</Button>
					)}
					{qrUrl && (
						<Button
							className='flex-1'
							onClick={downloadQR}
							disabled={isLoading}
						>
							<Download />
							Download
						</Button>
					)}
				</CardFooter>
			</Card>
		</div>
	)
}

export default App
