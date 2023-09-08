import { FC } from 'react'

import { UUID } from 'Types'

import useLyric from 'Hooks/useLyric'

import { Content } from './Styles'

const TimelineContent: FC<{ segmentID: UUID }> = ({ segmentID }) => {
	const { CurrentSegmentID, SetCurrentSegmentID, GetLyricSegmentByID } =
		useLyric()

	return (
		<Content
			onClick={() => SetCurrentSegmentID(segmentID)}
			$isActive={segmentID === CurrentSegmentID}
		>
			{GetLyricSegmentByID(segmentID)?.words}
		</Content>
	)
}

export default TimelineContent
