import { FC, useRef } from 'react'

import { UUID } from 'Types'
import { XYCoord, useDrag, useDrop } from 'react-dnd'

import useLyric from 'Hooks/useLyric'

import DndItemTypes from 'Constants/DndItemTypes'

import { Content } from './Styles'

interface ITimelineContentDndItem {
	segmentID: UUID
}

const TimelineContent: FC<{ segmentID: UUID }> = ({ segmentID }) => {
	const {
		CurrentSegmentID,
		SetCurrentSegmentID,
		GetLyricSegmentByID,
		GetSegmentIndexByID,
		MoveSegment,
	} = useLyric()

	const ContentRef = useRef<HTMLButtonElement>(null)

	const [{ isDragging }, drag] = useDrag<
		ITimelineContentDndItem,
		unknown,
		{ isDragging: boolean }
	>(
		() => ({
			type: DndItemTypes.TimelineContent,
			item: () => ({ segmentID }),
			collect: monitor => ({
				isDragging: !!monitor.isDragging(),
			}),
		}),
		[segmentID],
	)

	const [, drop] = useDrop<ITimelineContentDndItem>(
		() => ({
			accept: DndItemTypes.TimelineContent,
			hover(item, monitor) {
				if (!ContentRef.current) return

				const dragSegmentID = item.segmentID
				const hoverSegmentID = segmentID

				const hoverIndex = GetSegmentIndexByID(hoverSegmentID) as number

				if (dragSegmentID === hoverSegmentID) return

				const hoverBoundingRect =
					ContentRef.current.getBoundingClientRect()

				// Get vertical middle
				const hoverMiddleX =
					(hoverBoundingRect.right - hoverBoundingRect.left) / 2

				const dropTolerance = 0.5

				const minDistanceFromCenterToDrop =
					hoverMiddleX * (1 - dropTolerance)

				// Determine mouse position
				const clientOffset = monitor.getClientOffset() as XYCoord

				const hoverClientX = clientOffset.x - hoverBoundingRect.left

				const distanceFromCenter = hoverClientX - hoverMiddleX

				const moveToNext =
					distanceFromCenter >= minDistanceFromCenterToDrop
				const moveToPrev =
					distanceFromCenter <= -minDistanceFromCenterToDrop

				if (moveToNext) MoveSegment(dragSegmentID, hoverIndex + 1)
				else if (moveToPrev) MoveSegment(dragSegmentID, hoverIndex)
			},
		}),
		[MoveSegment, GetSegmentIndexByID, segmentID],
	)

	drag(drop(ContentRef))

	return (
		<Content
			ref={ContentRef}
			onClick={() => SetCurrentSegmentID(segmentID)}
			$isActive={segmentID === CurrentSegmentID}
			id={segmentID}
			style={{ visibility: isDragging ? 'hidden' : 'unset' }}
		>
			{GetLyricSegmentByID(segmentID)?.words}
		</Content>
	)
}

export default TimelineContent
