import { styled } from 'styled-components'

export const Container = styled.div`
	width: 75%;
	height: 100%;

	display: flex;
	justify-content: space-between;
	align-items: center;

	flex-direction: column;
`

export const ContentContainer = styled.div`
	width: 90%;
	height: 80%;

	display: flex;
	justify-content: center;
	align-items: center;
`

export const Content = styled.div`
	width: 90%;

	aspect-ratio: 16/9;

	position: relative;

	display: flex;
	justify-content: center;
	align-items: center;
`

export const BackgroundImage = styled.img`
	position: absolute;

	width: 100%;
	height: 100%;

	z-index: -100;
`

export const Text = styled.p``

export const Timeline = styled.div`
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
`

export const TimelineContent = styled.button<{ $isActive?: boolean }>`
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
