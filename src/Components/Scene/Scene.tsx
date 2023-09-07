import { FC } from 'react'

import { Container, Content, BackgroundImage, Text } from './Styles'

import useFullScreen from 'Hooks/useFullScreen'
import useContentStyles from 'Hooks/useContentStyles'

const Scene: FC = () => {
	const { FullScreenElementRef } = useFullScreen()
	const { FontSize, TextColor } = useContentStyles()

	return (
		<Container>
			<Content ref={FullScreenElementRef}>
				<BackgroundImage src='/background.jpg' />
				<Text style={{ fontSize: FontSize, color: TextColor }}>
					Text
				</Text>
			</Content>
		</Container>
	)
}

export default Scene
