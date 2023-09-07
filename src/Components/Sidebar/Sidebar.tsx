import { FC, useId } from 'react'

import useFullScreen from 'Hooks/useFullScreen'
import useContentStyles from 'Hooks/useContentStyles'

import { Container, Label, Input, Button, Header } from './Styles'
import Clamp from 'Utils/Clamp'
import FontFamilyGenericNames from 'Constants/FontFamilyGenericNames'

const Sidebar: FC = () => {
	const { SetIsFullScreen } = useFullScreen()
	const {
		SetFontSize,
		FontSize,
		SetTextColor,
		TextColor,
		SetTextFontFamilyGenericName,
		TextFontFamilyGenericName,
	} = useContentStyles()

	const FontSizeInputId = useId()
	const TextColorInputId = useId()
	const TextFontFamilyGenericNameInputId = useId()
	const SpotifyTrackIDForImportID = useId()

	return (
		<Container>
			<Header>Content Settings</Header>
			<Label htmlFor={FontSizeInputId}>
				Font Size
				<Input
					id={FontSizeInputId}
					type='number'
					min={0}
					max={200}
					value={FontSize}
					onChange={event =>
						SetFontSize(
							Clamp(parseFloat(event.target.value), 0, 200),
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
				<Input id={SpotifyTrackIDForImportID} type='text' />
			</Label>
			<Button onClick={() => SetIsFullScreen(true)}>
				Change to full screen
			</Button>
		</Container>
	)
}

export default Sidebar
