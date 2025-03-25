import { StyleSheet } from 'react-native'
import { COLORS, SIZES } from '@/constants'

export const tabStyles = StyleSheet.create({
	safeAreaView: {
		flex: 1,
		backgroundColor: COLORS.white,
	},
	contentView: {
		flex: 1,
		padding: SIZES.medium,
		backgroundColor: COLORS.white,
	},
})
