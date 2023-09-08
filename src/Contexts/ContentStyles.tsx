import { FC, ReactNode, createContext, useState } from 'react'

import FontFamilyGenericNames from 'Constants/FontFamilyGenericNames'
import FontKerning from 'Constants/FontKerning'
import FontStretch from 'Constants/FontStretch'
import FontStyle from 'Constants/FontStyle'
import FontWeight from 'Constants/FontWeight'

interface IContentStylesContext {
	FontSize: number
	SetFontSize: (fontSize: number) => void
	TextColor: string
	SetTextColor: (textColor: string) => void
	TextFontFamilyGenericName: FontFamilyGenericNames
	SetTextFontFamilyGenericName: (
		fontFamilyGenericName: FontFamilyGenericNames,
	) => void
	FontKerningState: FontKerning
	SetFontKerningState: (fontKerning: FontKerning) => void
	FontStretchState: FontStretch
	SetFontStretchState: (fontStretch: FontStretch) => void
	FontStyleState: FontStyle
	SetFontStyleState: (fontStyle: FontStyle) => void
	FontWeightState: (typeof FontWeight)[keyof typeof FontWeight]
	SetFontWeightState: (
		fontWeight: (typeof FontWeight)[keyof typeof FontWeight],
	) => void
}

interface IContentStylesContextProvider {
	children: ReactNode
}

const ContentStylesContext = createContext<IContentStylesContext>({
	FontSize: 0,
	SetFontSize: () => undefined,
	TextColor: '',
	SetTextColor: () => undefined,
	TextFontFamilyGenericName: FontFamilyGenericNames.SansSerif,
	SetTextFontFamilyGenericName: () => undefined,
	FontKerningState: FontKerning.Normal,
	SetFontKerningState: () => undefined,
	FontStretchState: FontStretch.Normal,
	SetFontStretchState: () => undefined,
	FontStyleState: FontStyle.Normal,
	SetFontStyleState: () => undefined,
	FontWeightState: FontWeight.Normal,
	SetFontWeightState: () => undefined,
})

export const ContentStylesProvider: FC<IContentStylesContextProvider> = ({
	children,
}) => {
	const [FontSize, SetFontSize] = useState<number>(10)
	const [TextColor, SetTextColor] = useState<string>('#ffffff')
	const [TextFontFamilyGenericName, SetTextFontFamilyGenericName] =
		useState<FontFamilyGenericNames>(FontFamilyGenericNames.SansSerif)
	const [FontKerningState, SetFontKerningState] = useState<FontKerning>(
		FontKerning.Normal,
	)
	const [FontStretchState, SetFontStretchState] = useState<FontStretch>(
		FontStretch.Normal,
	)
	const [FontStyleState, SetFontStyleState] = useState<FontStyle>(
		FontStyle.Normal,
	)
	const [FontWeightState, SetFontWeightState] = useState<
		(typeof FontWeight)[keyof typeof FontWeight]
	>(FontWeight.Normal)

	return (
		<ContentStylesContext.Provider
			value={{
				FontSize,
				SetFontSize,
				TextColor,
				SetTextColor,
				TextFontFamilyGenericName,
				SetTextFontFamilyGenericName,
				FontKerningState,
				SetFontKerningState,
				FontStretchState,
				SetFontStretchState,
				FontStyleState,
				SetFontStyleState,
				FontWeightState,
				SetFontWeightState,
			}}
		>
			{children}
		</ContentStylesContext.Provider>
	)
}

export default ContentStylesContext
