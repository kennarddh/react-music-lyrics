import { FC, ReactNode, createContext } from 'react'

import { UUID } from 'Types'

export interface ILyricSegment {
	id: UUID
	timeStartMS: number
	words: string
}

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
