import { FC } from 'react'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import Scene from 'Components/Scene/Scene'
import Sidebar from 'Components/Sidebar/Sidebar'

import { ContentStylesProvider } from 'Contexts/ContentStyles'
import { FullScreenProvider } from 'Contexts/FullScreen'
import { LyricProvider } from 'Contexts/Lyric'

import { Container } from './AppStyles'

const App: FC = () => {
	return (
		<DndProvider backend={HTML5Backend}>
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
		</DndProvider>
	)
}

export default App
