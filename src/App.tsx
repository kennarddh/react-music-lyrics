import { FC } from 'react'

import Scene from 'Components/Scene/Scene'
import Sidebar from 'Components/Sidebar/Sidebar'

import { ContentStylesProvider } from 'Contexts/ContentStyles'
import { FullScreenProvider } from 'Contexts/FullScreen'
import { LyricProvider } from 'Contexts/Lyric'

import { Container } from './AppStyles'

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
