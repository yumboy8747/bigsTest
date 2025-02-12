export const COLORS = {
	textLightGrey: '##888B90',
	textLightGray: '#888B90',
	textDarkGray: '#888B90',
	textDarkGrey: '##888B90',
	darkBg: '#09021d',
	drawerBg: '#2B293B',
	darkBox: '#343140',
	darkBoxOpacity: '#34314022',
	lightBg: '#D9DFFF',
	white: '#ffffff',
	whiteOpacity: 'rgba(255, 255, 255, 0.8)',
	blackOpacity: 'rgba(0, 0, 0, 0.8)',
	black: '#000',
	darkGray: '#1C1C1C',
	darkGrey: '#333333',
	lightGrey: '#e9e9e9',
	lightGray: '#eee',
	lightSilver: '#888b90',
	darkBorder: '#ccc',
	lightBorder: '#555',
}
export const theme: {
	light: { COLORS: any }
	dark: { COLORS: any }
} = {
	light: {
		COLORS: {
			background: COLORS.darkBg,
			bgColor: COLORS.black,
			drawerBgColor: COLORS.drawerBg,
			opacityBgColor: COLORS.blackOpacity,
			descBox: COLORS.darkBox,
			textsilver: COLORS.lightSilver,
			gray: COLORS.darkGray,
			grey: COLORS.darkGrey,
			textw: COLORS.white,
			textGrey: COLORS.textLightGrey,
			textGray: COLORS.textLightGrey,
			borderColor: COLORS.lightBorder,
		},
	},
	dark: {
		COLORS: {
			background: COLORS.lightBg,
			drawerBgColor: COLORS.white,
			opacityBgColor: COLORS.whiteOpacity,
			descBox: COLORS.darkBoxOpacity,
			bgColor: COLORS.white,
			textsilver: COLORS.lightSilver,
			gray: COLORS.lightGray,
			grey: COLORS.lightGrey,
			textw: COLORS.black,
			textGrey: COLORS.textLightGrey,
			textGray: COLORS.textLightGrey,
			borderColor: COLORS.darkBorder,
		},
	},
}
