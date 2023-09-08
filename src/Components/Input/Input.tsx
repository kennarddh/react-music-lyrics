import { css, styled } from 'styled-components'

const Input = styled.input<{ $hidden?: boolean }>`
	width: 60%;

	border: none;
	border-radius: 4px;

	&:not([type='color']) {
		padding: 5px 10px;
	}

	&::-webkit-color-swatch {
		border-radius: 4px;
	}

	&::-moz-color-swatch {
		border-radius: 4px;
	}

	${({ $hidden }) =>
		$hidden
			? css`
					width: 0;
					height: 0;
					position: absolute;
					visibility: hidden;
			  `
			: ''}
`

export default Input
