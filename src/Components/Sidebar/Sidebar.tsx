import { FC } from 'react'

import useFullScreen from 'Hooks/useFullScreen'

import { Container, Label, Input, Button } from './Styles'

const Sidebar: FC = () => {
	const { SetIsFullScreen } = useFullScreen()

	return (
		<Container>
			<Label htmlFor='fontSize'>
				Font size
				<Input id='fontSize' type='number' min={0} max={100} />
			</Label>
			<Button onClick={() => SetIsFullScreen(true)}>
				Change to full screen
			</Button>
		</Container>
	)
}

export default Sidebar
