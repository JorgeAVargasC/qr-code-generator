import React from 'react'

export const useMediaQuery = (bp: string) => {
	const [match, setMatch] = React.useState(window.matchMedia(bp).matches)

	React.useEffect(() => {
		const query = window.matchMedia(bp)
		setMatch(query.matches)
		const listener = (event: MediaQueryListEvent) => {
			setMatch(event.matches)
		}

		query.addEventListener('change', listener)
		return () => {
			query.removeEventListener('change', listener)
		}
	}, [bp])

	return React.useMemo(() => {
		return match
	}, [match])
}
