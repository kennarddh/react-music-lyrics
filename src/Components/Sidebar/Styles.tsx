import { css, styled } from 'styled-components'

export const Container = styled.div`
	width: 25%;

	padding: 20px;

	background-color: #eee;

	border-radius: 10px 0 0 0;

	display: flex;
	flex-direction: column;
	gap: 20px;
`

export const Label = styled.label`
	display: flex;

	justify-content: space-between;
`

export const Input = styled.input<{ $hidden?: boolean }>`
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

	&[type='radio']:checked + svg {
		outline: 2px solid #f00;
	}

	${({ $hidden }) =>
		$hidden
			? css`
				width: 0,
				height: 0;
				position: absolute;
				visibility: hidden;
				`
			: ''}
`

export const Button = styled.button`
	border: none;
	border-radius: 8px;

	padding: 10px 20px;

	background-color: #f90;
	color: #fff;

	cursor: pointer;

	&:hover {
		outline: 4px solid #ccc;
	}
`

export const Header = styled.h3``
