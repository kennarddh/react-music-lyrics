import { FC, useEffect } from 'react'

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
import { ILyricSegment } from 'Contexts/Lyric'

const Scene: FC = () => {
	const { FullScreenElementRef } = useFullScreen()
	const { FontSize, TextColor, TextFontFamilyGenericName } =
		useContentStyles()

	const {
		LyricSegments,
		CurrentSegmentID,
		SetCurrentSegmentID,
		GetLyricSegmentByID,
		GetNextSegmentID,
		GetPreviousSegmentID,
	} = useLyric()

	useEffect(() => {
		const OnKeyDown = (event: KeyboardEvent) => {
			if (!CurrentSegmentID) return

			let targetSegment: ILyricSegment | null = null

			if (event.key === 'ArrowRight')
				targetSegment = GetNextSegmentID(CurrentSegmentID)

			if (event.key === 'ArrowLeft')
				targetSegment = GetPreviousSegmentID(CurrentSegmentID)

			if (targetSegment) SetCurrentSegmentID(targetSegment.id)
		}

		addEventListener('keydown', OnKeyDown)

		return () => removeEventListener('keydown', OnKeyDown)
	}, [
		CurrentSegmentID,
		GetNextSegmentID,
		GetPreviousSegmentID,
		SetCurrentSegmentID,
	])

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
					<TimelineContent
						key={segment.id}
						onClick={() => SetCurrentSegmentID(segment.id)}
						$isActive={segment.id === CurrentSegmentID}
					>
						{segment.words}
					</TimelineContent>
				))}
			</Timeline>
		</Container>
	)
}

export default Scene
