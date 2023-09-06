import { FC, ReactNode, createContext, useCallback, useState } from 'react'

interface IPagesContext {
	IsFullScreen: boolean
	SetIsFullScreen: (title: boolean) => void
}

interface IPagesContextProvider {
	children: ReactNode
}

const FullScreenContext = createContext<IPagesContext>({
	IsFullScreen: false,
	SetIsFullScreen: () => undefined,
})

export const FullScreenProvider: FC<IPagesContextProvider> = ({ children }) => {
	const [IsFullScreen, SetIsFullScreenBase] = useState<boolean>(false)

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
		<FullScreenContext.Provider value={{ IsFullScreen, SetIsFullScreen }}>
			{children}
		</FullScreenContext.Provider>
	)
}

export default FullScreenContext
