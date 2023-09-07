import { FC, ReactNode, createContext, useState, useCallback } from 'react'

import { UUID } from 'Types'

export interface ILyricSegment {
	id: UUID
	timeStartMS: number
	words: string
}

interface ILyricContext {
	LyricSegments: ILyricSegment[]

	AddLyricSegment: (newSegment: ILyricSegment) => void
	EditLyricSegment: (id: UUID, newSegment: Omit<ILyricSegment, 'id'>) => void
}

interface ILyricContextProvider {
	children: ReactNode
}

const LyricContext = createContext<ILyricContext>({
	LyricSegments: [],

	AddLyricSegment: () => undefined,
	EditLyricSegment: () => undefined,
})

export const LyricProvider: FC<ILyricContextProvider> = ({ children }) => {
	const [LyricSegments, SetLyricSegments] = useState<ILyricSegment[]>([
		{
			id: '504da5eb-1e22-48f6-b034-60bfe3a31b7b',
			timeStartMS: 2000,
			words: 'test lorem ipsum.',
		},
		{
			id: 'b9c99bf1-94bf-4735-bb80-8d89329890d7',
			timeStartMS: 5000,
			words: 'Dolor sit amet.',
		},
	])

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
		<LyricContext.Provider
			value={{ LyricSegments, AddLyricSegment, EditLyricSegment }}
		>
			{children}
		</LyricContext.Provider>
	)
}

export default LyricContext