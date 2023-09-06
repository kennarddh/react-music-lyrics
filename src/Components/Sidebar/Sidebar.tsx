import { FC } from 'react'

import { Container, Label, Input } from './Styles'

const Sidebar: FC = () => {
	return (
		<Container>
			<Label htmlFor='fontSize'>
				Font size
				<Input id='fontSize' type='number' min={0} max={100} />
			</Label>
		</Container>
	)
}

export default Sidebar
