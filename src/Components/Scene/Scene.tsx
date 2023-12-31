import { FC, FormEvent, useCallback, useEffect, useRef } from 'react'

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
	TextArea,
} from './Styles'

const Scene: FC = () => {
	const { FullScreenElementRef } = useFullScreen()
	const {
		FontSize,
		TextColor,
		TextFontFamilyGenericName,
		FontKerningState,
		FontStretchState,
		FontStyleState,
		FontWeightState,
		TextAlignState,
		LetterSpacing,
		WordSpacing,
	} = useContentStyles()

	const {
		CurrentSegmentID,
		SetCurrentSegmentID,
		GetLyricSegmentByID,
		GetNextSegmentID,
		GetPreviousSegmentID,
		EditLyricSegment,
		LyricSegments,
		IsAllowedToEdit,
		SetIsEditing,
		IsEditing,
	} = useLyric()

	const TextRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const OnKeyDown = (event: KeyboardEvent) => {
			if (!CurrentSegmentID) return
			if (IsEditing) return

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
		IsEditing,
	])

	const OnTextChange = useCallback(
		(event: FormEvent<HTMLDivElement>) => {
			if (!CurrentSegmentID) return

			const target = event.target as HTMLDivElement

			EditLyricSegment(CurrentSegmentID, {
				...(GetLyricSegmentByID(CurrentSegmentID) as ILyricSegment),
				words: target.innerText,
			})
		},
		[CurrentSegmentID, EditLyricSegment, GetLyricSegmentByID],
	)

	useEffect(() => {
		if (!CurrentSegmentID) return

		if (
			TextRef.current &&
			GetLyricSegmentByID(CurrentSegmentID)?.words !==
				TextRef.current?.innerText
		) {
			TextRef.current.innerText =
				GetLyricSegmentByID(CurrentSegmentID)?.words ?? ''
		}
	}, [CurrentSegmentID, GetLyricSegmentByID, LyricSegments])

	return (
		<Container>
			<ContentContainer>
				<Content ref={FullScreenElementRef}>
					<BackgroundImage src='/background.jpg' alt='backround' />
					<TextArea
						style={{
							fontSize: `${FontSize}cqw`,
							color: TextColor,
							fontFamily: TextFontFamilyGenericName,
							fontKerning: FontKerningState,
							fontStretch: FontStretchState,
							fontStyle: FontStyleState,
							fontWeight: FontWeightState,
							textAlign: TextAlignState,
							letterSpacing: LetterSpacing,
							wordSpacing: WordSpacing,
						}}
						contentEditable={IsAllowedToEdit}
						suppressContentEditableWarning
						onInput={OnTextChange}
						ref={TextRef}
						defaultValue={
							CurrentSegmentID
								? GetLyricSegmentByID(CurrentSegmentID)?.words
								: ''
						}
						onFocus={() => SetIsEditing(true)}
						onBlur={() => SetIsEditing(false)}
					>
						{/* {CurrentSegmentID
							? GetLyricSegmentByID(CurrentSegmentID)?.words
							: ''} */}
					</TextArea>
				</Content>
			</ContentContainer>
			<Timeline />
		</Container>
	)
}

export default Scene
