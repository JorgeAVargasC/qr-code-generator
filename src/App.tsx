import { useState, useEffect, useCallback } from 'react'
import QRCode from 'qrcode'
import { QrCode, Download, Settings2 } from 'lucide-react'
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
import { ResponsiveModal } from './components/app/responsive-modal/responsive-modal'
import { ConfigForm } from './components/app/config-form/config-form'
import { ThemeButton } from './components/app/theme-button/theme-button'
import { QrCodeGuy } from './components/app/svg/qr-code-guy'

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

	const DELAY = 700
	const debounce = useDebounce()

	useEffect(() => {
		if (!text) setQrUrl('')
		if (text) {
			setIsLoading(true)
			setQrUrl('')
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

	return (
		<div
			className={
				'relative container mx-auto grid min-h-[100dvh] place-items-center px-4'
			}
		>
			<div className='absolute top-4 right-4 hidden md:block'>
				<ThemeButton />
			</div>

			<Card className='w-full shadow-none md:w-sm'>
				<CardHeader className='flex flex-row items-center justify-between'>
					<div className='grid gap-1'>
						<CardTitle className='flex items-center justify-between'>
							<div className='flex items-center gap-2'>
								<QrCode className='text-primary h-6 w-6' />
								<h1>QR Code Generator</h1>
							</div>
						</CardTitle>
						<CardDescription>
							Customize and download your QR code
						</CardDescription>
					</div>
					<div className='block md:hidden'>
						<ThemeButton />
					</div>
				</CardHeader>
				<CardContent className='grid gap-4'>
					<div className='aspect-square rounded-lg border p-4'>
						{isLoading && <Skeleton className='aspect-square rounded-md' />}

						{qrUrl && !isLoading && (
							<img
								src={qrUrl}
								alt='QR Code'
								className='aspect-square w-full rounded-lg border'
							/>
						)}

						{!qrUrl && !isLoading && <QrCodeGuy />}
					</div>
					<div className='focus-within:ring-ring flex items-center gap-2 rounded-md border p-2 focus-within:ring-1'>
						<Input
							type='text'
							value={text}
							onChange={(e) => setText(e.target.value)}
							placeholder='https://jorgeavargasc.github.io'
							autoFocus
							className='border-none shadow-none focus-visible:ring-0'
						/>

						<ResponsiveModal
							title='Preferences for QR Code'
							triggerElement={
								<Button
									size='icon'
									className='aspect-square'
									aria-label='Preferences'
								>
									<Settings2 />
								</Button>
							}
						>
							<ConfigForm />
						</ResponsiveModal>
					</div>
				</CardContent>
				<CardFooter className='grid gap-2'>
					{!qrUrl && (
						<Button
							size={'lg'}
							aria-label='Generate QR Code'
							variant={isLoading ? 'outline' : 'default'}
							disabled={isLoading}
						>
							{isLoading && <Spinner />}
							{isLoading ? 'Generating...' : 'Generate'}
						</Button>
					)}

					{qrUrl && !isLoading && (
						<div className='grid grid-cols-2 gap-4'>
							<Button
								variant='outline'
								size={'lg'}
								onClick={handleClear}
								disabled={isLoading}
								aria-label='Clear'
							>
								Clear
							</Button>

							<Button
								size={'lg'}
								onClick={downloadQR}
								disabled={isLoading}
								aria-label='Download'
							>
								<Download />
								Download
							</Button>
						</div>
					)}
				</CardFooter>
			</Card>
		</div>
	)
}

export default App
