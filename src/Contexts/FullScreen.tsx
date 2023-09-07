import {
	FC,
	ReactNode,
	RefObject,
	createContext,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react'

interface IFullScreenContext {
	IsFullScreen: boolean
	SetIsFullScreen: (title: boolean) => Promise<void>
	FullScreenElementRef: RefObject<HTMLDivElement>
}

interface IFullScreenContextProvider {
	children: ReactNode
}

const FullScreenContext = createContext<IFullScreenContext>({
	IsFullScreen: false,
	SetIsFullScreen: () => Promise.resolve(),
	FullScreenElementRef: {} as RefObject<HTMLDivElement>,
})

export const FullScreenProvider: FC<IFullScreenContextProvider> = ({
	children,
}) => {
	const [IsFullScreen, SetIsFullScreenBase] = useState<boolean>(false)

	const FullScreenElementRef = useRef<HTMLDivElement>(null)

	const SetIsFullScreen = useCallback(async (isFullScreen: boolean) => {
		if (!navigator.userActivation.isActive) return

		if (isFullScreen) {
			await FullScreenElementRef?.current?.requestFullscreen()

			SetIsFullScreenBase(true)

			return
		}

		if (document.fullscreenElement) {
			await document.exitFullscreen()

			SetIsFullScreenBase(true)
		}
	}, [])

	useEffect(() => {
		const OnKeyDown = async (event: KeyboardEvent) => {
			if (!navigator.userActivation.isActive) return

			if (event.key === 'F11') {
				if (document.fullscreenElement) {
					await document.exitFullscreen()

					SetIsFullScreenBase(false)
				}

				await FullScreenElementRef?.current?.requestFullscreen()

				SetIsFullScreenBase(true)
			}
		}

		addEventListener('keydown', OnKeyDown)

		return () => removeEventListener('keydown', OnKeyDown)
	}, [])

	useEffect(() => {
		const OnFullScreenChange = () => {
			SetIsFullScreenBase(!!document.fullscreenElement)
		}

		document.addEventListener('fullscreenchange', OnFullScreenChange)

		return () =>
			document.addEventListener('fullscreenchange', OnFullScreenChange)
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
