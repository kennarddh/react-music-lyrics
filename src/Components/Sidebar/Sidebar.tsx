import { FC } from 'react'

import useFullScreen from 'Hooks/useFullScreen'
import useContentStyles from 'Hooks/useContentStyles'

import { Container, Label, Input, Button } from './Styles'
import Clamp from 'Utils/Clamp'

const Sidebar: FC = () => {
	const { SetIsFullScreen } = useFullScreen()
	const { SetFontSize, FontSize, SetTextColor, TextColor } =
		useContentStyles()

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
			<Button onClick={() => SetIsFullScreen(true)}>
				Change to full screen
			</Button>
		</Container>
	)
}

export default Sidebar
