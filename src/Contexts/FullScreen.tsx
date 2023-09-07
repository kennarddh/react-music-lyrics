import {
	FC,
	ReactNode,
	createContext,
	useCallback,
	useRef,
	useState,
} from 'react'

interface IPagesContext {
	IsFullScreen: boolean
	SetIsFullScreen: (title: boolean) => void
	SetFullScreenElement: (element: HTMLElement) => void
}

interface IPagesContextProvider {
	children: ReactNode
}

const FullScreenContext = createContext<IPagesContext>({
	IsFullScreen: false,
	SetIsFullScreen: () => undefined,
	SetFullScreenElement: () => undefined,
})

export const FullScreenProvider: FC<IPagesContextProvider> = ({ children }) => {
	const [IsFullScreen, SetIsFullScreenBase] = useState<boolean>(false)
	const FullScreenElement = useRef<HTMLElement>()

	const SetIsFullScreen = useCallback((isFullScreen: boolean) => {
		if (!navigator.userActivation.isActive) return

		if (isFullScreen)
			return void document
				.querySelector('#root :nth-child(1) div')
				?.requestFullscreen()

		if (document.fullscreenElement) document.exitFullscreen()

		SetIsFullScreenBase(isFullScreen)
	}, [])

	const SetFullScreenElement = useCallback((element: HTMLElement) => {
		FullScreenElement.current = element
	}, [])

	return (
		<FullScreenContext.Provider
			value={{ IsFullScreen, SetIsFullScreen, SetFullScreenElement }}
		>
			{children}
		</FullScreenContext.Provider>
	)
}

export default FullScreenContext
