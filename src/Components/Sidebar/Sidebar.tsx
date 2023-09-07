import { FC, useCallback, useId, useState } from 'react'

import Clamp from 'Utils/Clamp'
import SpotifyToLyricSegments from 'Utils/SpotifyToLyricSegments'

import useContentStyles from 'Hooks/useContentStyles'
import useFullScreen from 'Hooks/useFullScreen'
import useLyric from 'Hooks/useLyric'

import FontFamilyGenericNames from 'Constants/FontFamilyGenericNames'

import { Button, Container, Header, Input, Label } from './Styles'

const Sidebar: FC = () => {
	const [SpotifyTrackID, SetSpotifyTrackID] = useState<string>('')

	const { SetIsFullScreen } = useFullScreen()
	const {
		SetFontSize,
		FontSize,
		SetTextColor,
		TextColor,
		SetTextFontFamilyGenericName,
		TextFontFamilyGenericName,
	} = useContentStyles()

	const { SetLyricSegments, SetCurrentSegmentID } = useLyric()

	const FontSizeInputId = useId()
	const TextColorInputId = useId()
	const TextFontFamilyGenericNameInputId = useId()
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
			<Label htmlFor={FontSizeInputId}>
				Font Size
				<Input
					id={FontSizeInputId}
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
			<Label htmlFor={TextColorInputId}>
				Text Color
				<Input
					id={TextColorInputId}
					type='color'
					value={TextColor}
					onChange={event => SetTextColor(event.target.value)}
				/>
			</Label>
			<Label htmlFor={TextFontFamilyGenericNameInputId}>
				Text Font Family Generic
				<Input
					as='select'
					id={TextFontFamilyGenericNameInputId}
					value={TextFontFamilyGenericName}
					onChange={event =>
						SetTextFontFamilyGenericName(event.target.value)
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
