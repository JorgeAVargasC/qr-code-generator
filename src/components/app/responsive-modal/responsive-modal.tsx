import { useMediaQuery } from '@/hooks/use-media-query'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog'
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger
} from '@/components/ui/drawer'
import { useState } from 'react'

type Props = {
	children: React.ReactNode
	triggerElement: React.ReactNode
	title: string
	description?: string
}

export const ResponsiveModal = ({
	children,
	triggerElement,
	title,
	description
}: Props) => {
	const [open, setOpen] = useState(false)
	const isDesktop = useMediaQuery('(min-width: 768px)')

	if (isDesktop) {
		return (
			<Dialog
				open={open}
				onOpenChange={setOpen}
			>
				<DialogTrigger asChild>{triggerElement}</DialogTrigger>
				<DialogContent className='sm:max-w-[425px]'>
					<DialogHeader>
						<DialogTitle>{title}</DialogTitle>
						{description && (
							<DialogDescription>{description}</DialogDescription>
						)}
					</DialogHeader>

					{children}
				</DialogContent>
			</Dialog>
		)
	}

	return (
		<Drawer
			open={open}
			onOpenChange={setOpen}
		>
			<DrawerTrigger asChild>{triggerElement}</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader className='text-left'>
					<DrawerTitle>{title}</DrawerTitle>
					{description && <DrawerDescription>{description}</DrawerDescription>}
				</DrawerHeader>

				<div className='px-4'>{children}</div>

				<DrawerFooter className='pt-6'>
					<DrawerClose asChild>
						<Button variant='outline'>Close</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	)
}
