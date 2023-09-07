import { FC } from 'react'

import Scene from 'Components/Scene/Scene'
import Sidebar from 'Components/Sidebar/Sidebar'

import { FullScreenProvider } from 'Contexts/FullScreen'

import { Container } from './AppStyles'
import { LyricsProvider } from 'Contexts/Lyrics'

const App: FC = () => {
	return (
		<FullScreenProvider>
			<LyricsProvider>
				<Container>
					<Scene />
					<Sidebar />
				</Container>
			</LyricsProvider>
		</FullScreenProvider>
	)
}

export default App
