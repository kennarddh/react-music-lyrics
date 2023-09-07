import { FC, ReactNode, createContext, useState, useCallback } from 'react'

import { UUID } from 'Types'

export interface ILyricSegment {
	id: UUID
	timeStartMS: number
	words: string
}

interface ILyricsContext {
	LyricSegments: ILyricSegment[]

	AddLyricSegment: (newSegment: ILyricSegment) => void
	EditLyricSegment: (id: UUID, newSegment: Omit<ILyricSegment, 'id'>) => void
}

interface ILyricsContextProvider {
	children: ReactNode
}

const LyricsContext = createContext<ILyricsContext>({
	LyricSegments: [],

	AddLyricSegment: () => undefined,
	EditLyricSegment: () => undefined,
})

export const LyricsProvider: FC<ILyricsContextProvider> = ({ children }) => {
	const [LyricSegments, SetLyricSegments] = useState<ILyricSegment[]>([])

	const EditLyricSegment = useCallback(
		(id: UUID, newSegment: Omit<ILyricSegment, 'id'>) => {
			SetLyricSegments(prev =>
				prev.map(iterSegment =>
					iterSegment.id === id
						? { id, ...newSegment }
						: { ...iterSegment },
				),
			)
		},
		[],
	)

	const AddLyricSegment = useCallback((newSegment: ILyricSegment) => {
		SetLyricSegments(prev => [...prev, newSegment])
	}, [])

	return (
		<LyricsContext.Provider
			value={{ LyricSegments, AddLyricSegment, EditLyricSegment }}
		>
			{children}
		</LyricsContext.Provider>
	)
}

export default LyricsContext
