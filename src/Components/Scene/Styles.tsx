import { styled } from 'styled-components'

export const Container = styled.div`
	width: 75%;

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
