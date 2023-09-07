import { FC } from 'react'

import useLyric from 'Hooks/useLyric'

import { Container, Content } from './Styles'

const Timeline: FC = () => {
	const { LyricSegments, CurrentSegmentID, SetCurrentSegmentID } = useLyric()

	return (
		<Container>
			{LyricSegments.map(segment => (
				<Content
					key={segment.id}
					onClick={() => SetCurrentSegmentID(segment.id)}
					$isActive={segment.id === CurrentSegmentID}
				>
					{segment.words}
				</Content>
			))}
		</Container>
	)
}

export default Timeline
