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

export const TextInput = styled.textarea`
	width: 100%;
	height: 100%;

	display: flex;
	justify-content: center;
	align-items: center;

	text-align: center;

	background-color: transparent;

	outline: none;
	border: none;
`
