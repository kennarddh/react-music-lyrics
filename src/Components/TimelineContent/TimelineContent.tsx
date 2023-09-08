import { FC } from 'react'

import { UUID } from 'Types'
import { useDrag } from 'react-dnd'

import useLyric from 'Hooks/useLyric'

import DndItemTypes from 'Constants/DndItemTypes'

import { Content } from './Styles'

const TimelineContent: FC<{ segmentID: UUID }> = ({ segmentID }) => {
	const { CurrentSegmentID, SetCurrentSegmentID, GetLyricSegmentByID } =
		useLyric()

	const [{ isDragging }, drag] = useDrag(() => ({
		type: DndItemTypes.TimelineContent,
		collect: monitor => ({
			isDragging: !!monitor.isDragging(),
		}),
	}))

	if (isDragging) return null

	return (
		<Content
			ref={drag}
			onClick={() => SetCurrentSegmentID(segmentID)}
			$isActive={segmentID === CurrentSegmentID}
		>
			{GetLyricSegmentByID(segmentID)?.words}
		</Content>
	)
}

export default TimelineContent
