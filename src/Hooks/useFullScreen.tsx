import { useContext } from 'react'

import FullScreenContext from 'Contexts/FullScreen'

const useFullScreen = () => useContext(FullScreenContext)

export default useFullScreen
