import { FC } from 'react'

import useLyric from 'Hooks/useLyric'

import { AddButton, Container, Content } from './Styles'

const Timeline: FC = () => {
	const { LyricSegments, CurrentSegmentID, SetCurrentSegmentID } = useLyric()

	return (
		<Container>
			<AddButton>Add</AddButton>
			{LyricSegments.map(segment => (
				<Content
					key={segment.id}
					onClick={() => SetCurrentSegmentID(segment.id)}
					$isActive={segment.id === CurrentSegmentID}
				>
					{segment.words}
				</Content>
			))}
			<AddButton>Add</AddButton>
		</Container>
	)
}

export default Timeline
