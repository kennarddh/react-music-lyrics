import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { styled } from 'styled-components'

import Input from 'Components/Input/Input'

export const Container = styled.div`
	display: flex;
	align-items: center;
	flex-direction: row;

	gap: 5px;
`

export const FontAwesomeIconStyled = styled(FontAwesomeIcon)`
	cursor: pointer;

	background-color: #fff;

	padding: 5px;

	border-radius: 5px;
`

export const RadioInput = styled(Input)`
	&[type='radio']:checked + svg {
		outline: 2px solid #ccc;
	}

	&[type='radio']:hover + svg {
		outline: 2px solid #f90;
	}
`
