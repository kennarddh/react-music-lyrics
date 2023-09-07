import { styled } from 'styled-components'

export const Container = styled.div`
	width: 25%;

	padding: 20px;

	background-color: #eee;

	border-radius: 10px 0 0 0;

	display: flex;
	flex-direction: column;
	gap: 10px;
`

export const Label = styled.label`
	display: flex;

	justify-content: space-between;
`

export const Input = styled.input`
	width: 70%;

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
`

export const Button = styled.button`
	border: none;
	border-radius: 8px;

	padding: 10px 20px;

	background-color: #ddd;

	cursor: pointer;
`
