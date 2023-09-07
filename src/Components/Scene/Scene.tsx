import { FC } from 'react'

import { Container, Content, BackgroundImage, Text } from './Styles'

import useFullScreen from 'Hooks/useFullScreen'

const Scene: FC = () => {
	const { FullScreenElementRef } = useFullScreen()

	return (
		<Container>
			<Content ref={FullScreenElementRef}>
				<BackgroundImage src='/background.jpg' />
				<Text>Text</Text>
			</Content>
		</Container>
	)
}

export default Scene
