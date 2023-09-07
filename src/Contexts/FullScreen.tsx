import {
	FC,
	ReactNode,
	createContext,
	useCallback,
	useRef,
	useState,
	RefObject,
} from 'react'

interface IPagesContext {
	IsFullScreen: boolean
	SetIsFullScreen: (title: boolean) => void
	FullScreenElementRef: RefObject<HTMLDivElement>
}

interface IPagesContextProvider {
	children: ReactNode
}

const FullScreenContext = createContext<IPagesContext>({
	IsFullScreen: false,
	SetIsFullScreen: () => undefined,
	FullScreenElementRef: {} as RefObject<HTMLDivElement>,
})

export const FullScreenProvider: FC<IPagesContextProvider> = ({ children }) => {
	const [IsFullScreen, SetIsFullScreenBase] = useState<boolean>(false)
	const FullScreenElementRef = useRef<HTMLDivElement>(null)

	const SetIsFullScreen = useCallback((isFullScreen: boolean) => {
		if (!navigator.userActivation.isActive) return

		if (isFullScreen)
			return void FullScreenElementRef?.current?.requestFullscreen()

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
