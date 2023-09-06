import { FC } from 'react'

import Scene from 'Components/Scene/Scene'
import Sidebar from 'Components/Sidebar/Sidebar'

import { FullScreenProvider } from 'Contexts/FullScreen'

import { Container } from './AppStyles'

const App: FC = () => {
	return (
		<FullScreenProvider>
			<Container>
				<Scene />
				<Sidebar />
			</Container>
		</FullScreenProvider>
	)
}

export default App
