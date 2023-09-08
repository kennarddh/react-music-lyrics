import { FC, useCallback } from 'react'

import TimelineContent from 'Components/TimelineContent/TimelineContent'

import useLyric from 'Hooks/useLyric'

import { AddButton, Container } from './Styles'

const Timeline: FC = () => {
	const { LyricSegments, AddLyricSegment } = useLyric()

	const AddPreviousLyricSegment = useCallback(() => {
		const id = crypto.randomUUID()

		AddLyricSegment({ id, timeStartMS: 0, words: '' })
	}, [AddLyricSegment])

	const AddNextLyricSegment = useCallback(() => {
		const id = crypto.randomUUID()

		AddLyricSegment({ id, timeStartMS: 0, words: '' }, 0)
	}, [AddLyricSegment])

	return (
		<Container>
			<AddButton onClick={AddNextLyricSegment}>Add</AddButton>
			{LyricSegments.map(segment => (
				<TimelineContent key={segment.id} segmentID={segment.id} />
			))}
			<AddButton onClick={AddPreviousLyricSegment}>Add</AddButton>
		</Container>
	)
}

export default Timeline
