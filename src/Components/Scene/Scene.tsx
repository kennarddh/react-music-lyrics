import { FC, useEffect } from 'react'

import Timeline from 'Components/Timeline/Timeline'

import { ILyricSegment } from 'Contexts/Lyric'

import useContentStyles from 'Hooks/useContentStyles'
import useFullScreen from 'Hooks/useFullScreen'
import useLyric from 'Hooks/useLyric'

import {
	BackgroundImage,
	Container,
	Content,
	ContentContainer,
	Text,
} from './Styles'

const Scene: FC = () => {
	const { FullScreenElementRef } = useFullScreen()
	const { FontSize, TextColor, TextFontFamilyGenericName } =
		useContentStyles()

	const {
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
			<Timeline />
		</Container>
	)
}

export default Scene
