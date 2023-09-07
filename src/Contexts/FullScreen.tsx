import {
	FC,
	ReactNode,
	createContext,
	useCallback,
	useRef,
	useState,
	MutableRefObject,
} from 'react'

interface IPagesContext {
	IsFullScreen: boolean
	SetIsFullScreen: (title: boolean) => void
	FullScreenElementRef: MutableRefObject<HTMLElement | undefined>
}

interface IPagesContextProvider {
	children: ReactNode
}

const FullScreenContext = createContext<IPagesContext>({
	IsFullScreen: false,
	SetIsFullScreen: () => undefined,
	FullScreenElementRef: { current: undefined },
})

export const FullScreenProvider: FC<IPagesContextProvider> = ({ children }) => {
	const [IsFullScreen, SetIsFullScreenBase] = useState<boolean>(false)
	const FullScreenElementRef = useRef<HTMLElement>()

	const SetIsFullScreen = useCallback((isFullScreen: boolean) => {
		if (!navigator.userActivation.isActive) return

		if (isFullScreen)
			return void document
				.querySelector('#root :nth-child(1) div')
				?.requestFullscreen()

		if (document.fullscreenElement) document.exitFullscreen()

		SetIsFullScreenBase(isFullScreen)
	}, [])

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
