import { FC } from 'react'

import { Container, Label, Input, Button } from './Styles'

const Sidebar: FC = () => {
	return (
		<Container>
			<Label htmlFor='fontSize'>
				Font size
				<Input id='fontSize' type='number' min={0} max={100} />
			</Label>
			<Button>Change to full screen</Button>
		</Container>
	)
}

export default Sidebar
