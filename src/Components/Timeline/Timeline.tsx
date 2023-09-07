import { FC } from 'react'

import useLyric from 'Hooks/useLyric'

import { AddSegmentButton, Container, Content } from './Styles'

const Timeline: FC = () => {
	const { LyricSegments, CurrentSegmentID, SetCurrentSegmentID } = useLyric()

	return (
		<Container>
			<AddSegmentButton>Add</AddSegmentButton>
			{LyricSegments.map(segment => (
				<Content
					key={segment.id}
					onClick={() => SetCurrentSegmentID(segment.id)}
					$isActive={segment.id === CurrentSegmentID}
				>
					{segment.words}
				</Content>
			))}
			<AddSegmentButton>Add</AddSegmentButton>
		</Container>
	)
}

export default Timeline
