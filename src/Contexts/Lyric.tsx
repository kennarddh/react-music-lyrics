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

	CurrentSegmentID: UUID | null
	SetCurrentSegmentID: (newID: UUID | null) => void

	GetLyricSegmentByID: (id: UUID) => ILyricSegment | null

	GetSegmentIndexByID: (id: UUID) => number | null
	GetNextSegmentID: (id: UUID) => ILyricSegment | null
	GetPreviousSegmentID: (id: UUID) => ILyricSegment | null
}

interface ILyricContextProvider {
	children: ReactNode
}

const LyricContext = createContext<ILyricContext>({
	LyricSegments: [],

	AddLyricSegment: () => undefined,
	EditLyricSegment: () => undefined,

	CurrentSegmentID: null,
	SetCurrentSegmentID: () => undefined,

	GetLyricSegmentByID: () => null,

	GetSegmentIndexByID: () => null,
	GetNextSegmentID: () => null,
	GetPreviousSegmentID: () => null,
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

	const [CurrentSegmentID, SetCurrentSegmentID] = useState<UUID | null>(
		() => LyricSegments[0]?.id ?? null,
	)

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

	const GetLyricSegmentByID = useCallback(
		(id: UUID) =>
			LyricSegments.find(({ id: iterID }) => id === iterID) ?? null,
		[LyricSegments],
	)

	const GetSegmentIndexByID = useCallback(
		(id: UUID) =>
			LyricSegments.findIndex(({ id: iterID }) => id === iterID),
		[LyricSegments],
	)

	const GetNextSegmentID = useCallback(
		(id: UUID) => {
			const currentIndex = GetSegmentIndexByID(id)

			if (currentIndex === LyricSegments.length - 1) return null

			return LyricSegments[currentIndex + 1]
		},
		[GetSegmentIndexByID, LyricSegments],
	)

	const GetPreviousSegmentID = useCallback(
		(id: UUID) => {
			const currentIndex = GetSegmentIndexByID(id)

			if (currentIndex === 0) return null

			return LyricSegments[currentIndex - 1]
		},
		[GetSegmentIndexByID, LyricSegments],
	)

	return (
		<LyricContext.Provider
			value={{
				LyricSegments,
				AddLyricSegment,
				EditLyricSegment,
				CurrentSegmentID,
				SetCurrentSegmentID,
				GetLyricSegmentByID,
				GetSegmentIndexByID,
				GetNextSegmentID,
				GetPreviousSegmentID,
			}}
		>
			{children}
		</LyricContext.Provider>
	)
}

export default LyricContext
