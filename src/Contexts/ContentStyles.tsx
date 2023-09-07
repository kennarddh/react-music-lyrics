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
	const [FontSize, SetFontSize] = useState<number>(24)
	const [TextColor, SetTextColor] = useState<string>('#000000')
	const [TextFontFamilyGenericName, SetTextFontFamilyGenericName] =
		useState<string>('#000000')

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
