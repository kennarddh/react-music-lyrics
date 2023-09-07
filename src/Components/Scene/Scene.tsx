import { FC } from 'react'

import {
	Container,
	Content,
	ContentContainer,
	BackgroundImage,
	Text,
	Timeline,
	TimelineContent,
} from './Styles'

import useFullScreen from 'Hooks/useFullScreen'
import useContentStyles from 'Hooks/useContentStyles'

const Scene: FC = () => {
	const { FullScreenElementRef } = useFullScreen()
	const { FontSize, TextColor, TextFontFamilyGenericName } =
		useContentStyles()

	return (
		<Container>
			<ContentContainer>
				<Content ref={FullScreenElementRef}>
					<BackgroundImage src='/background.jpg' />
					<Text
						style={{
							fontSize: FontSize,
							color: TextColor,
							fontFamily: TextFontFamilyGenericName,
						}}
					>
						Text
					</Text>
				</Content>
			</ContentContainer>
			<Timeline>
				<TimelineContent>
					Lorem, ipsum dolor sit amet consectetur adipisicing elit.
					Quo, delectus.
				</TimelineContent>
			</Timeline>
		</Container>
	)
}

export default Scene
