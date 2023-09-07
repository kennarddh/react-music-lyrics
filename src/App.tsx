import { FC } from 'react'

import Scene from 'Components/Scene/Scene'
import Sidebar from 'Components/Sidebar/Sidebar'

import { FullScreenProvider } from 'Contexts/FullScreen'

import { Container } from './AppStyles'

import { LyricProvider } from 'Contexts/Lyric'
import { ContentStylesProvider } from 'Contexts/ContentStyles'

const App: FC = () => {
	return (
		<FullScreenProvider>
			<LyricProvider>
				<ContentStylesProvider>
					<Container>
						<Scene />
						<Sidebar />
					</Container>
				</ContentStylesProvider>
			</LyricProvider>
		</FullScreenProvider>
	)
}

export default App
