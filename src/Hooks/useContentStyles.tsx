import { useContext } from 'react'

import ContentStylesContext from 'Contexts/ContentStyles'

const useContentStyles = () => useContext(ContentStylesContext)

export default useContentStyles
