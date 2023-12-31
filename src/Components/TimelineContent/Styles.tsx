import { styled } from 'styled-components'

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
