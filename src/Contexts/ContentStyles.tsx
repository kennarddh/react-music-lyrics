import FontFamilyGenericNames from 'Constants/FontFamilyGenericNames'
import { FC, ReactNode, createContext, useState } from 'react'

interface IContentStylesContext {
	FontSize: number
	SetFontSize: (fontSize: number) => void
	TextColor: string
	SetTextColor: (textColor: string) => void
	TextFontFamilyGenericName: string
	SetTextFontFamilyGenericName: (textColor: string) => void
}

interface IContentStylesContextProvider {
	children: ReactNode
}

const ContentStylesContext = createContext<IContentStylesContext>({
	FontSize: 0,
	SetFontSize: () => undefined,
	TextColor: '',
	SetTextColor: () => undefined,
	TextFontFamilyGenericName: '',
	SetTextFontFamilyGenericName: () => undefined,
})

export const ContentStylesProvider: FC<IContentStylesContextProvider> = ({
	children,
}) => {
	const [FontSize, SetFontSize] = useState<number>(50)
	const [TextColor, SetTextColor] = useState<string>('#ffffff')
	const [TextFontFamilyGenericName, SetTextFontFamilyGenericName] =
		useState<string>(FontFamilyGenericNames.SansSerif)

	return (
		<ContentStylesContext.Provider
			value={{
				FontSize,
				SetFontSize,
				TextColor,
				SetTextColor,
				TextFontFamilyGenericName,
				SetTextFontFamilyGenericName,
			}}
		>
			{children}
		</ContentStylesContext.Provider>
	)
}

export default ContentStylesContext
