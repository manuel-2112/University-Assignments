import { StyleSheet, ImageStyle, ViewStyle } from 'react-native'
import { COLORS, SIZES } from '@/constants'

const styles = StyleSheet.create({
	btnContainer: {
		width: 40,
		height: 40,
		backgroundColor: COLORS.white,
		borderRadius: SIZES.small / 1.25,
		justifyContent: 'center',
		alignItems: 'center',
	} as ViewStyle,
})

const btnImg = (dimension: number): ImageStyle => ({
	width: dimension,
	height: dimension,
})

export { styles, btnImg }
