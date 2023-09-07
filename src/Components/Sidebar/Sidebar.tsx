import { FC, useId } from 'react'

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

	const FontSizeInputId = useId()
	const TextColorInputId = useId()
	const TextFontFamilyGenericNameInputId = useId()

	return (
		<Container>
			<Label htmlFor={FontSizeInputId}>
				Font size
				<Input
					id={FontSizeInputId}
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
			<Label htmlFor={TextColorInputId}>
				Text color
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
			<Button onClick={() => SetIsFullScreen(true)}>
				Change to full screen
			</Button>
		</Container>
	)
}

export default Sidebar
