import {
	FC,
	ReactNode,
	createContext,
	useCallback,
	useRef,
	useMemo,
	RefObject,
	useEffect,
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
	const FullScreenElementRef = useRef<HTMLDivElement>(null)

	const SetIsFullScreen = useCallback((isFullScreen: boolean) => {
		if (!navigator.userActivation.isActive) return

		if (isFullScreen)
			return void FullScreenElementRef?.current?.requestFullscreen()

		if (document.fullscreenElement) document.exitFullscreen()
	}, [])

	useEffect(() => {})

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
