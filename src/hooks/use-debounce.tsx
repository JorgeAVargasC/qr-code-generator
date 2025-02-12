import { useRef } from 'react'

export const useDebounce = () => {
	const timeout = useRef<NodeJS.Timeout | null>(null)

	const debounce = (fn: () => void, delay: number) => {
		if (timeout.current) clearTimeout(timeout.current)
		timeout.current = setTimeout(fn, delay)
	}

	return debounce
}
