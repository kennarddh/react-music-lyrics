import { createGlobalStyle } from 'styled-components'

import FontFamilyGenericNames from 'Constants/FontFamilyGenericNames'

const GlobalStyle = createGlobalStyle`
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		font-family:${FontFamilyGenericNames.SansSerif};
	}
`

export default GlobalStyle
