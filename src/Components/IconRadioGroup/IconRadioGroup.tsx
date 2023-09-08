import { FC } from 'react'

import { IconProp } from '@fortawesome/fontawesome-svg-core'

import Label from 'Components/Label/Label'

import { Container, FontAwesomeIconStyled, RadioInput } from './Styles'

type IIconRadioGroup<T> = FC<{
	name: string
	options: { icon: IconProp; value: T; id: string }[]
	value: T
	onChange: (value: T) => void
}>

const IconRadioGroup: IIconRadioGroup<unknown> = ({
	options,
	value,
	onChange,
	name,
}) => {
	return (
		<Container>
			{options.map(option => (
				<Label htmlFor={option.id} key={option.id}>
					<RadioInput
						name={name}
						type='radio'
						id={option.id}
						checked={value === option.value}
						onChange={() => onChange(option.value)}
						$hidden
					/>
					<FontAwesomeIconStyled icon={option.icon} />
				</Label>
			))}
		</Container>
	)
}

export default IconRadioGroup
