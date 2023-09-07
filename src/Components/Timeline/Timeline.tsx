import { FC, useCallback } from 'react'

import useLyric from 'Hooks/useLyric'

import { AddButton, Container, Content } from './Styles'

const Timeline: FC = () => {
	const {
		LyricSegments,
		CurrentSegmentID,
		SetCurrentSegmentID,
		AddLyricSegment,
	} = useLyric()

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
				<Content
					key={segment.id}
					onClick={() => SetCurrentSegmentID(segment.id)}
					$isActive={segment.id === CurrentSegmentID}
				>
					{segment.words}
				</Content>
			))}
			<AddButton onClick={AddPreviousLyricSegment}>Add</AddButton>
		</Container>
	)
}

export default Timeline
