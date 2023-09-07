import { styled } from 'styled-components'

export const Container = styled.div`
	width: 100%;
	height: 20%;

	padding: 10px;

	background-color: #eee;

	border-radius: 10px 0 0 0;

	display: flex;
	justify-content: flex-start;
	align-items: center;
	flex-direction: row;
	gap: 10px;

	overflow-x: scroll;

	z-index: 10;
`

export const Content = styled.button<{ $isActive?: boolean }>`
	flex-shrink: 0;

	width: 30%;
	height: 90%;

	background-color: #fff;

	border-radius: 10px;
	border: none;

	padding: 10px 20px;

	outline: ${({ $isActive = false }) =>
		$isActive ? '4px solid #ccc' : 'none'};

	overflow: hidden;

	cursor: pointer;

	font-size: 16px;
	text-align: left;

	&:hover {
		outline: 4px solid #f90;
	}
`

export const AddButton = styled.button`
	height: 60%;

	aspect-ratio: 1/1;

	border-radius: 50%;
	border: none;

	cursor: pointer;

	background-color: #f90;
	color: #fff;
	text-align: center;

	&:hover {
		outline: 4px solid #ccc;
	}
`
