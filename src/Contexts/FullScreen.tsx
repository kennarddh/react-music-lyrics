import { FC, ReactNode, createContext, useEffect, useState } from 'react'

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
	const [IsFullScreen, SetIsFullScreen] = useState<boolean>(false)

	useEffect(() => {
		if (IsFullScreen)
			return void document
				.querySelector('#root :nth-child(1) div')
				?.requestFullscreen()

		if (document.fullscreenElement) document.exitFullscreen()
	}, [IsFullScreen])

	return (
		<FullScreenContext.Provider value={{ IsFullScreen, SetIsFullScreen }}>
			{children}
		</FullScreenContext.Provider>
	)
}

export default FullScreenContext
