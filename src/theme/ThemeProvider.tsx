import { useThemeStore } from '../app/hooks'
import React, { useState, createContext, ReactNode } from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { theme } from './theme'

type ThemeContextType = {
	isDarkMode: boolean
	toggleTheme: () => void
	theme: {
		COLORS: {
			textw: string
			background: string
			gray: string
			grey: string
			bgColor: string
			descBox: string
			drawerBgColor: string
			opacityBgColor: string
			textsilver: string
			textGrey: string
			textGray: string
			borderColor: string
		}
	}
}
type ThemeProviderProps = {
	children: ReactNode
}
export const ThemeContext = createContext<ThemeContextType>(
	{} as ThemeContextType
)
const ThemeProvider = ({ children }: ThemeProviderProps) => {
	const { data: themeStore } = useThemeStore()

	const [isDarkMode, setIsDarkMode] = useState(themeStore?.darkMode)
	const themeCheck = theme.light

	const toggleTheme = () => {
		setIsDarkMode(!isDarkMode)
	}

	return (
		<ThemeContext.Provider
			value={{ isDarkMode, toggleTheme, theme: themeCheck }}>
			<StyledThemeProvider theme={themeCheck}>
				{children}
			</StyledThemeProvider>
		</ThemeContext.Provider>
	)
}

export default ThemeProvider
