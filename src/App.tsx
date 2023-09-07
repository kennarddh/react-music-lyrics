import { FC } from 'react'

import Scene from 'Components/Scene/Scene'
import Sidebar from 'Components/Sidebar/Sidebar'

import { FullScreenProvider } from 'Contexts/FullScreen'

import { Container } from './AppStyles'
import { LyricsProvider } from 'Contexts/Lyrics'
import { ContentStylesProvider } from 'Contexts/ContentStyles'

const App: FC = () => {
	return (
		<FullScreenProvider>
			<LyricsProvider>
				<ContentStylesProvider>
					<Container>
						<Scene />
						<Sidebar />
					</Container>
				</ContentStylesProvider>
			</LyricsProvider>
		</FullScreenProvider>
	)
}

export default App
