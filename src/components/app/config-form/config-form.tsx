import { Label } from '../../ui/label'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue
} from '../../ui/select'
import { typeOptions } from '../../../constants/type-options'
import { levelsOptions } from '../../../constants/levels-options'
import { sizesOptions } from '../../../constants/sizes-options'
import { useQrCodeStore } from '../../../store/use-qr-code-store'

export const ConfigForm = () => {
	const size = useQrCodeStore((state) => state.size)
	const level = useQrCodeStore((state) => state.level)
	const type = useQrCodeStore((state) => state.type)
	const setSize = useQrCodeStore((state) => state.setSize)
	const setLevel = useQrCodeStore((state) => state.setLevel)
	const setType = useQrCodeStore((state) => state.setType)

	return (
		<>
			<fieldset className='flex flex-col gap-2'>
				<Label htmlFor='type'>Type</Label>

				<Select
					name='type'
					onValueChange={setType}
					defaultValue={type}
				>
					<SelectTrigger>
						<SelectValue placeholder='Select a type' />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectLabel>Types</SelectLabel>
							{Object.entries(typeOptions).map(([key, value]) => (
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
			</fieldset>

			<fieldset className='flex flex-col gap-2'>
				<Label htmlFor='errorCorrection'>Error Correction Level</Label>
				<Select
					name='errorCorrectionLevel'
					onValueChange={setLevel}
					defaultValue={level}
				>
					<SelectTrigger>
						<SelectValue placeholder='Select a level' />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectLabel>Levels</SelectLabel>
							{Object.entries(levelsOptions).map(([key, value]) => (
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
			</fieldset>

			<fieldset>
				<Label htmlFor='size'>Size</Label>

				<Select
					name='size'
					onValueChange={(value) => setSize(Number(value))}
					defaultValue={size.toString()}
				>
					<SelectTrigger>
						<SelectValue placeholder='Select a size' />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectLabel>Sizes</SelectLabel>
							{Object.entries(sizesOptions).map(([key, value]) => (
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
			</fieldset>
		</>
	)
}
