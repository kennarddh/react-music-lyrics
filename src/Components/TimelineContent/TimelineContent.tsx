import { FC, useRef } from 'react'

import { UUID } from 'Types'
import { useDrag, useDrop } from 'react-dnd'

import useLyric from 'Hooks/useLyric'

import DndItemTypes from 'Constants/DndItemTypes'

import { Content } from './Styles'

interface IDndItem

const TimelineContent: FC<{ segmentID: UUID }> = ({ segmentID }) => {
	const { CurrentSegmentID, SetCurrentSegmentID, GetLyricSegmentByID } =
		useLyric()

	const ContentRef = useRef<HTMLButtonElement>(null)

	const [{ isDragging }, drag] = useDrag(() => ({
		type: DndItemTypes.TimelineContent,
		item: () => {
			return { segmentID }
		},
		collect: monitor => ({
			isDragging: !!monitor.isDragging(),
		}),
	}))

	const [, drop] = useDrop(() => ({
		accept: DndItemTypes.TimelineContent,
	}))

	drag(drop(ContentRef))

	return (
		<Content
			ref={ContentRef}
			onClick={() => SetCurrentSegmentID(segmentID)}
			$isActive={segmentID === CurrentSegmentID}
			style={{ visibility: isDragging ? 'hidden' : 'unset' }}
		>
			{GetLyricSegmentByID(segmentID)?.words}
		</Content>
	)
}

export default TimelineContent
