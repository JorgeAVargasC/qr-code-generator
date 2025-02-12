import { useState, useEffect, useCallback } from 'react'
import QRCode, { QRCodeDataURLType, QRCodeErrorCorrectionLevel } from 'qrcode'
import { QrCode, Download } from 'lucide-react'
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
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue
} from './components/ui/select'

function App() {
	const [text, setText] = useState<string>('')
	const [qrUrl, setQrUrl] = useState<string>('')
	const [size, setSize] = useState<number>(300)

	const sizesRecordOptions: Record<number, string> = {
		300: '300px',
		600: '600px',
		900: '900px',
		1200: '1200px',
		1500: '1500px',
		1800: '1800px'
	}

	const [errorCorrectionLevel, setErrorCorrectionLevel] =
		useState<QRCodeErrorCorrectionLevel>('medium')

	const errorCorrectionOptionsRecord: Partial<
		Record<QRCodeErrorCorrectionLevel, string>
	> = {
		high: 'High',
		low: 'Low',
		medium: 'Medium',
		quartile: 'Quartile'
	}

	const [type, setType] = useState<QRCodeDataURLType>('image/png')
	const typeOptionsRecord: Record<QRCodeDataURLType, string> = {
		'image/png': 'PNG',
		'image/jpeg': 'JPEG',
		'image/webp': 'WEBP'
	}

	const generateQR = useCallback(async () => {
		if (!text) return

		await QRCode.toDataURL(text, {
			width: size,
			type: type,
			errorCorrectionLevel
		})
			.then((url) => setQrUrl(url))
			.catch((err) => console.error(err))
	}, [size, errorCorrectionLevel, type, text])

	const DELAY = 500
	const debounce = useDebounce()

	useEffect(() => {
		if (text) debounce(generateQR, DELAY)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [text, generateQR])

	const downloadQR = () => {
		if (!qrUrl) return
		const link = document.createElement('a')
		link.href = qrUrl
		link.download = 'qrcode.png'
		document.body.appendChild(link)
		link.click()
		document.body.removeChild(link)
	}

	return (
		<div className='dark bg-background text-foreground grid min-h-screen place-items-center'>
			<div className='flex flex-col gap-5 rounded-3xl border p-4 lg:flex-row'>
				<Card className='w-[350px] flex-1'>
					<CardHeader>
						<CardTitle className='flex items-center gap-2'>
							<QrCode className='h-5 w-5 text-sky-400' />
							<h1>QR Code Generator</h1>
						</CardTitle>
						<CardDescription>
							Customize and download your QR code
						</CardDescription>
					</CardHeader>
					<CardContent className='grid gap-5'>
						<Input
							type='text'
							value={text}
							onChange={(e) => setText(e.target.value)}
							placeholder='Type something...'
						/>

						<Select
							onValueChange={(value) => setType(value as QRCodeDataURLType)}
							defaultValue={type}
						>
							<SelectTrigger>
								<SelectValue placeholder='Select a type' />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectLabel>Types</SelectLabel>
									{Object.entries(typeOptionsRecord).map(([key, value]) => (
										<SelectItem
											key={key}
											value={key}
										>
											{value}
										</SelectItem>
									))}
								</SelectGroup>
							</SelectContent>
						</Select>

						<Select
							onValueChange={(value) =>
								setErrorCorrectionLevel(value as QRCodeErrorCorrectionLevel)
							}
							defaultValue={errorCorrectionLevel}
						>
							<SelectTrigger>
								<SelectValue placeholder='Select a level' />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectLabel>Levels</SelectLabel>
									{Object.entries(errorCorrectionOptionsRecord).map(
										([key, value]) => (
											<SelectItem
												key={key}
												value={key}
											>
												{value}
											</SelectItem>
										)
									)}
								</SelectGroup>
							</SelectContent>
						</Select>

						<Select
							onValueChange={(value) => setSize(Number(value))}
							defaultValue={size.toString()}
						>
							<SelectTrigger>
								<SelectValue placeholder='Select a size' />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectLabel>Sizes</SelectLabel>
									{Object.entries(sizesRecordOptions).map(([key, value]) => (
										<SelectItem
											key={key}
											value={key}
										>
											{value}
										</SelectItem>
									))}
								</SelectGroup>
							</SelectContent>
						</Select>
					</CardContent>
					<CardFooter></CardFooter>
				</Card>

				<Card className='w-[350px] flex-1'>
					<CardHeader>
						<CardTitle>Real Time Preview</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='aspect-square rounded-lg border p-4'>
							{qrUrl && (
								<img
									src={qrUrl}
									alt='QR Code'
									className='aspect-square rounded-md'
								/>
							)}
						</div>
					</CardContent>
					<CardFooter className='flex gap-2'>
						<Button
							variant='outline'
							className='flex-1'
							onClick={() => setText('')}
						>
							Clear
						</Button>
						{qrUrl && (
							<Button
								className='flex-1'
								onClick={downloadQR}
							>
								<Download />
								Download
							</Button>
						)}
					</CardFooter>
				</Card>
			</div>

			{/* <div className='mx-auto max-w-md rounded-xl bg-white p-8 shadow-lg'>
				<div className='mb-6 flex items-center justify-center'></div>

				<div className='space-y-6'>
					<div>
						<label className='block text-sm font-medium text-gray-700'>
							Enter text or URL
						</label>
						<div className='relative'></div>
					</div>

					<div className='grid grid-cols-2 gap-4'>
						<div>
							<label className='text-sm'>Size</label>
							<input
								type='number'
								value={size}
								onChange={(e) => setSize(Number(e.target.value))}
								className='w-full rounded border px-2 py-1'
								min='100'
								max='1000'
							/>
						</div>
						<div>
							<label className='text-sm'>Error Correction</label>
							<select
								value={errorCorrection}
								onChange={(e) => setErrorCorrection(e.target.value)}
								className='w-full rounded border px-2 py-1'
							>
								<option value='L'>L (Low)</option>
								<option value='M'>M (Medium)</option>
								<option value='Q'>Q (Quartile)</option>
								<option value='H'>H (High)</option>
							</select>
						</div>
					</div>

					<div className='grid grid-cols-2 gap-4'>
						<div>
							<label className='text-sm'>Dark Color</label>
							<input
								type='color'
								value={darkColor}
								onChange={(e) => setDarkColor(e.target.value)}
								className='w-full rounded'
							/>
						</div>
						<div>
							<label className='text-sm'>Light Color</label>
							<input
								type='color'
								value={lightColor}
								onChange={(e) => setLightColor(e.target.value)}
								className='w-full rounded'
							/>
						</div>
					</div>

					{qrUrl && (
						<div className='flex flex-col items-center space-y-4'>
							<img
								src={qrUrl}
								alt='QR Code'
								className='w-full max-w-[300px]'
							/>
							<button
								onClick={downloadQR}
								className='flex items-center rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700'
							>
								<Download className='mr-2 h-5 w-5' /> Download QR
							</button>
						</div>
					)}
				</div>
			</div> */}
		</div>
	)
}

export default App
