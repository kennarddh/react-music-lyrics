import { ChangeEvent, FC, useCallback, useEffect } from 'react'

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
	TextInput,
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
		EditLyricSegment,
		IsEditing,
		SetIsEditing,
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

	const OnTextChange = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			if (!CurrentSegmentID) return

			EditLyricSegment(CurrentSegmentID, {
				...(GetLyricSegmentByID(CurrentSegmentID) as ILyricSegment),
				words: event.target?.value,
			})
		},
		[CurrentSegmentID, EditLyricSegment, GetLyricSegmentByID],
	)

	return (
		<Container>
			<ContentContainer>
				<Content ref={FullScreenElementRef}>
					<BackgroundImage src='/background.jpg' alt='backround' />
					<TextInput
						style={{
							fontSize: FontSize,
							color: TextColor,
							fontFamily: TextFontFamilyGenericName,
						}}
						value={
							CurrentSegmentID
								? GetLyricSegmentByID(CurrentSegmentID)?.words
								: ''
						}
						onChange={OnTextChange}
						readOnly={!IsEditing}
						onFocus={() => SetIsEditing(true)}
						onBlur={() => SetIsEditing(false)}
					/>
				</Content>
			</ContentContainer>
			<Timeline />
		</Container>
	)
}

export default Scene
