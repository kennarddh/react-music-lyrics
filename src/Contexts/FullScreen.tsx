import {
	FC,
	ReactNode,
	RefObject,
	createContext,
	useCallback,
	useEffect,
	useMemo,
	useRef,
} from 'react'

interface IFullScreenContext {
	IsFullScreen: boolean
	SetIsFullScreen: (title: boolean) => void
	FullScreenElementRef: RefObject<HTMLDivElement>
}

interface IFullScreenContextProvider {
	children: ReactNode
}

const FullScreenContext = createContext<IFullScreenContext>({
	IsFullScreen: false,
	SetIsFullScreen: () => undefined,
	FullScreenElementRef: {} as RefObject<HTMLDivElement>,
})

export const FullScreenProvider: FC<IFullScreenContextProvider> = ({
	children,
}) => {
	const FullScreenElementRef = useRef<HTMLDivElement>(null)

	const SetIsFullScreen = useCallback((isFullScreen: boolean) => {
		if (!navigator.userActivation.isActive) return

		if (isFullScreen)
			return void FullScreenElementRef?.current?.requestFullscreen()

		if (document.fullscreenElement) document.exitFullscreen()
	}, [])

	useEffect(() => {
		const OnKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'F11') {
				if (document.fullscreenElement) document.exitFullscreen()

				FullScreenElementRef?.current?.requestFullscreen()
			}

			if (event.key === 'Escape' && document.fullscreenElement)
				document.exitFullscreen()
		}

		addEventListener('keydown', OnKeyDown)

		return () => removeEventListener('keydown', OnKeyDown)
	}, [])

	const IsFullScreen = useMemo(() => !!document.fullscreenElement, [])

	return (
		<FullScreenContext.Provider
			value={{
				IsFullScreen,
				SetIsFullScreen,
				FullScreenElementRef,
			}}
		>
			{children}
		</FullScreenContext.Provider>
	)
}

export default FullScreenContext
