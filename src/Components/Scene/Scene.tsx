import { FC } from 'react'

import useFullScreen from 'Hooks/useFullScreen'
import useContentStyles from 'Hooks/useContentStyles'
import useLyric from 'Hooks/useLyric'

import {
	Container,
	Content,
	ContentContainer,
	BackgroundImage,
	Text,
	Timeline,
	TimelineContent,
} from './Styles'

const Scene: FC = () => {
	const { FullScreenElementRef } = useFullScreen()
	const { FontSize, TextColor, TextFontFamilyGenericName } =
		useContentStyles()

	const { LyricSegments, CurrentSegmentID, GetLyricSegmentByID } = useLyric()

	return (
		<Container>
			<ContentContainer>
				<Content ref={FullScreenElementRef}>
					<BackgroundImage src='/background.jpg' alt='backround' />
					<Text
						style={{
							fontSize: FontSize,
							color: TextColor,
							fontFamily: TextFontFamilyGenericName,
						}}
					>
						{CurrentSegmentID
							? GetLyricSegmentByID(CurrentSegmentID)?.words
							: null}
					</Text>
				</Content>
			</ContentContainer>
			<Timeline>
				{LyricSegments.map(segment => (
					<TimelineContent key={segment.id}>
						{segment.words}
					</TimelineContent>
				))}
			</Timeline>
		</Container>
	)
}

export default Scene
