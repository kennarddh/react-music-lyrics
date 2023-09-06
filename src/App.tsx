import { FC } from 'react'

import Scene from 'Components/Scene/Scene'
import Sidebar from 'Components/Sidebar/Sidebar'

import { Container } from './AppStyles'

const App: FC = () => {
	return (
		<Container>
			<Scene />
			<Sidebar />
		</Container>
	)
}

export default App
