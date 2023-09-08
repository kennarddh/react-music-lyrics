import { styled } from 'styled-components'

export const Container = styled.div`
	width: 25%;
	height: 100%;

	padding: 20px;

	background-color: #eee;

	border-radius: 10px 0 0 0;

	display: flex;
	flex-direction: column;
	gap: 20px;

	overflow-y: scroll;
`

export const Label = styled.label`
	display: flex;

	justify-content: space-between;
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
