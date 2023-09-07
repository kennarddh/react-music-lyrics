import { FC } from 'react'

import useFullScreen from 'Hooks/useFullScreen'
import useContentStyles from 'Hooks/useContentStyles'

import { Container, Label, Input, Button } from './Styles'
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

	return (
		<Container>
			<Label htmlFor='fontSize'>
				Font size
				<Input
					id='fontSize'
					type='number'
					min={0}
					max={100}
					value={FontSize}
					onChange={event =>
						SetFontSize(
							Clamp(parseFloat(event.target.value), 0, 100),
						)
					}
				/>
			</Label>
			<Label htmlFor='color'>
				Text color
				<Input
					id='color'
					type='color'
					value={TextColor}
					onChange={event => SetTextColor(event.target.value)}
				/>
			</Label>
			<Label htmlFor='textFontFamilyGenericName'>
				Text Font Family Generic
				<Input
					as='select'
					id='textFontFamilyGenericName'
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
			<Button onClick={() => SetIsFullScreen(true)}>
				Change to full screen
			</Button>
		</Container>
	)
}

export default Sidebar
