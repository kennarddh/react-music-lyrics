import {
	FC,
	ReactNode,
	createContext,
	useCallback,
	useEffect,
	useState,
} from 'react'

import { UUID } from 'Types'

import ArrayInsertAtIndexImmutable from 'Utils/ArrayInsertAtIndexImmutable'

import useFullScreen from 'Hooks/useFullScreen'

export interface ILyricSegment {
	id: UUID
	timeStartMS: number
	words: string
}

interface ILyricContext {
	LyricSegments: ILyricSegment[]
	SetLyricSegments: (segments: ILyricSegment[]) => void

	AddLyricSegment: (newSegment: ILyricSegment, index?: number) => void
	EditLyricSegment: (id: UUID, newSegment: Omit<ILyricSegment, 'id'>) => void

	CurrentSegmentID: UUID | null
	SetCurrentSegmentID: (newID: UUID | null) => void

	GetLyricSegmentByID: (id: UUID) => ILyricSegment | null

	GetSegmentIndexByID: (id: UUID) => number | null
	GetNextSegmentID: (id: UUID) => ILyricSegment | null
	GetPreviousSegmentID: (id: UUID) => ILyricSegment | null

	IsEditing: boolean
	SetIsEditing: (isEditing: boolean) => void
	IsAllowedToEdit: boolean
	SetIsAllowedToEdit: (isEditing: boolean) => void
}

interface ILyricContextProvider {
	children: ReactNode
}

const LyricContext = createContext<ILyricContext>({
	LyricSegments: [],
	SetLyricSegments: () => undefined,

	AddLyricSegment: () => undefined,
	EditLyricSegment: () => undefined,

	CurrentSegmentID: null,
	SetCurrentSegmentID: () => undefined,

	GetLyricSegmentByID: () => null,

	GetSegmentIndexByID: () => null,
	GetNextSegmentID: () => null,
	GetPreviousSegmentID: () => null,

	IsEditing: false,
	SetIsEditing: () => undefined,
	IsAllowedToEdit: true,
	SetIsAllowedToEdit: () => undefined,
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

	const [IsEditing, SetIsEditingBase] = useState<boolean>(false)
	const [IsAllowedToEdit, SetIsAllowedToEdit] = useState<boolean>(true)

	const { IsFullScreen } = useFullScreen()

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

	const AddLyricSegment = useCallback(
		(newSegment: ILyricSegment, index?: number) => {
			SetLyricSegments(prev =>
				ArrayInsertAtIndexImmutable(
					prev,
					index ?? prev.length,
					newSegment,
				),
			)
		},
		[],
	)

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

	const SetIsEditing = useCallback(
		(isEditing: boolean) => {
			if (!IsAllowedToEdit && isEditing) return false

			SetIsEditingBase(isEditing)
		},
		[IsAllowedToEdit],
	)

	useEffect(() => {
		if (!IsAllowedToEdit && IsEditing) SetIsEditing(false)
	}, [IsAllowedToEdit, IsEditing, SetIsEditing])

	useEffect(() => {
		if (IsFullScreen) SetIsAllowedToEdit(false)
		else SetIsAllowedToEdit(true)
	}, [IsFullScreen])

	return (
		<LyricContext.Provider
			value={{
				LyricSegments,
				SetLyricSegments,
				AddLyricSegment,
				EditLyricSegment,
				CurrentSegmentID,
				SetCurrentSegmentID,
				GetLyricSegmentByID,
				GetSegmentIndexByID,
				GetNextSegmentID,
				GetPreviousSegmentID,
				IsEditing,
				SetIsEditing,
				IsAllowedToEdit,
				SetIsAllowedToEdit,
			}}
		>
			{children}
		</LyricContext.Provider>
	)
}

export default LyricContext
