import { FC, ReactNode, createContext } from 'react'

interface ILyricsContext {}

interface ILyricsContextProvider {
	children: ReactNode
}

const LyricsContext = createContext<ILyricsContext>({})

export const LyricsProvider: FC<ILyricsContextProvider> = ({ children }) => {
	return (
		<LyricsContext.Provider value={{}}>{children}</LyricsContext.Provider>
	)
}

export default LyricsContext
