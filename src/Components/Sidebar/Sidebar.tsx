import { FC, useCallback, useId, useState } from 'react'

import {
	faAlignCenter,
	faAlignJustify,
	faAlignLeft,
	faAlignRight,
} from '@fortawesome/free-solid-svg-icons'

import IconRadioGroup from 'Components/IconRadioGroup/IconRadioGroup'
import Input from 'Components/Input/Input'
import Label from 'Components/Label/Label'

import Clamp from 'Utils/Clamp'
import SpotifyToLyricSegments from 'Utils/SpotifyToLyricSegments'

import useContentStyles from 'Hooks/useContentStyles'
import useFullScreen from 'Hooks/useFullScreen'
import useLyric from 'Hooks/useLyric'

import FontFamilyGenericNames from 'Constants/FontFamilyGenericNames'
import FontKerning from 'Constants/FontKerning'
import FontStretch from 'Constants/FontStretch'
import FontStyle from 'Constants/FontStyle'
import FontWeight from 'Constants/FontWeight'
import TextAlign from 'Constants/TextAlign'

import { Button, Container, Figure, Header } from './Styles'

const Sidebar: FC = () => {
	const [SpotifyTrackID, SetSpotifyTrackID] = useState<string>('')

	const { SetIsFullScreen } = useFullScreen()
	const {
		FontSize,
		SetFontSize,
		TextColor,
		SetTextColor,
		TextFontFamilyGenericName,
		SetTextFontFamilyGenericName,
		FontKerningState,
		SetFontKerningState,
		FontStretchState,
		SetFontStretchState,
		FontStyleState,
		SetFontStyleState,
		FontWeightState,
		SetFontWeightState,
		TextAlignState,
		SetTextAlignState,
	} = useContentStyles()

	const { SetLyricSegments, SetCurrentSegmentID } = useLyric()

	const FontSizeInputID = useId()
	const TextColorInputID = useId()
	const TextFontFamilyGenericNameInputID = useId()
	const FontKerningInputID = useId()
	const FontStretchInputID = useId()
	const FontStyleInputID = useId()
	const FontWeightInputID = useId()
	const TextAlignLeftRadioID = useId()
	const TextAlignCenterRadioID = useId()
	const TextAlignRightRadioID = useId()
	const TextAlignJustifyRadioID = useId()
	const LetterSpacingInputID = useId()
	const WordSpacingInputID = useId()

	const SpotifyTrackIDForImportID = useId()

	const ImportLyricFromSpotify = useCallback(async () => {
		if (
			!confirm(
				'Importing lyric from spotify will erase current lyric. Are you sure?',
			)
		)
			return

		const lyricSegments = await SpotifyToLyricSegments(SpotifyTrackID)

		if (lyricSegments[0]) return alert(lyricSegments[1])

		SetLyricSegments(lyricSegments[1])
		SetCurrentSegmentID(lyricSegments[1][0].id)
	}, [SetCurrentSegmentID, SetLyricSegments, SpotifyTrackID])

	return (
		<Container>
			<Header>Content Settings</Header>
			<Label htmlFor={FontSizeInputID}>
				Font Size
				<Input
					id={FontSizeInputID}
					type='number'
					min={0}
					max={50}
					step={0.1}
					value={FontSize}
					onChange={event =>
						SetFontSize(
							Clamp(parseFloat(event.target.value), 0, 50),
						)
					}
				/>
			</Label>
			<Label htmlFor={TextColorInputID}>
				Text Color
				<Input
					id={TextColorInputID}
					type='color'
					value={TextColor}
					onChange={event => SetTextColor(event.target.value)}
				/>
			</Label>
			<Label htmlFor={TextFontFamilyGenericNameInputID}>
				Text Font Family Generic
				<Input
					as='select'
					id={TextFontFamilyGenericNameInputID}
					value={TextFontFamilyGenericName}
					onChange={event =>
						SetTextFontFamilyGenericName(
							event.target.value as FontFamilyGenericNames,
						)
					}
				>
					{Object.entries(FontFamilyGenericNames).map(
						([name, value]) => (
							<option value={value} key={value}>
								{name}
							</option>
						),
					)}
				</Input>
			</Label>
			<Label htmlFor={FontKerningInputID}>
				Font Kerning
				<Input
					as='select'
					id={FontKerningInputID}
					value={FontKerningState}
					onChange={event =>
						SetFontKerningState(event.target.value as FontKerning)
					}
				>
					{Object.entries(FontKerning).map(([name, value]) => (
						<option value={value} key={value}>
							{name}
						</option>
					))}
				</Input>
			</Label>
			<Label htmlFor={FontStretchInputID}>
				Font Stretch
				<Input
					as='select'
					id={FontStretchInputID}
					value={FontStretchState}
					onChange={event =>
						SetFontStretchState(event.target.value as FontStretch)
					}
				>
					{Object.entries(FontStretch).map(([name, value]) => (
						<option value={value} key={value}>
							{name}
						</option>
					))}
				</Input>
			</Label>
			<Label htmlFor={FontStyleInputID}>
				Font Style
				<Input
					as='select'
					id={FontStyleInputID}
					value={FontStyleState}
					onChange={event =>
						SetFontStyleState(event.target.value as FontStyle)
					}
				>
					{Object.entries(FontStyle).map(([name, value]) => (
						<option value={value} key={value}>
							{name}
						</option>
					))}
				</Input>
			</Label>
			<Label htmlFor={FontWeightInputID}>
				Font Weight
				<Input
					as='select'
					id={FontWeightInputID}
					value={FontWeightState}
					onChange={event =>
						SetFontWeightState(
							event.target
								.value as (typeof FontWeight)[keyof typeof FontWeight],
						)
					}
				>
					{Object.entries(FontWeight).map(([name, value]) => (
						<option value={value} key={value}>
							{name}
						</option>
					))}
				</Input>
			</Label>
			<Figure>
				<figcaption>Text Align</figcaption>
				<IconRadioGroup
					options={[
						{
							icon: faAlignLeft,
							value: TextAlign.Left,
							id: TextAlignLeftRadioID,
						},
						{
							icon: faAlignCenter,
							value: TextAlign.Center,
							id: TextAlignCenterRadioID,
						},
						{
							icon: faAlignRight,
							value: TextAlign.Right,
							id: TextAlignRightRadioID,
						},
						{
							icon: faAlignJustify,
							value: TextAlign.Justify,
							id: TextAlignJustifyRadioID,
						},
					]}
					value={TextAlignState}
					onChange={value => SetTextAlignState(value as TextAlign)}
					name='textAlign'
				/>
			</Figure>
			<Label htmlFor={LetterSpacingInputID}>
				Letter Spacing
				<Input
					id={LetterSpacingInputID}
					type='number'
					min={0}
					max={50}
					step={1}
					value={FontSize}
					onChange={event =>
						SetFontSize(
							Clamp(parseFloat(event.target.value), 0, 50),
						)
					}
				/>
			</Label>
			<Label htmlFor={WordSpacingInputID}>
				Word Spacing
				<Input
					id={WordSpacingInputID}
					type='number'
					min={0}
					max={50}
					step={1}
					value={FontSize}
					onChange={event =>
						SetFontSize(
							Clamp(parseFloat(event.target.value), 0, 50),
						)
					}
				/>
			</Label>
			<Header>Import From Spotify</Header>
			<Label htmlFor={SpotifyTrackIDForImportID}>
				Spotify Track ID
				<Input
					id={SpotifyTrackIDForImportID}
					type='text'
					value={SpotifyTrackID}
					onChange={event => SetSpotifyTrackID(event.target.value)}
				/>
			</Label>
			<Button onClick={ImportLyricFromSpotify}>
				Import Lyric From Spotify
			</Button>
			<Button onClick={() => SetIsFullScreen(true)}>
				Change to full screen
			</Button>
		</Container>
	)
}

export default Sidebar
