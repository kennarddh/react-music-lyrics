import { FC } from 'react'

import { Container, Content, BackgroundImage, Text } from './Styles'

const Scene: FC = () => {
	return (
		<Container>
			<Content>
				<BackgroundImage src='/background.jpg' />
				<Text>Text</Text>
			</Content>
		</Container>
	)
}

export default Scene
