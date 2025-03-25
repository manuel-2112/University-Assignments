import { StyleSheet } from 'react-native'
import { COLORS, SIZES } from '@/constants'

export const companyDetailsStyles = StyleSheet.create({
	safeAreaView: {
		flex: 1,
		backgroundColor: COLORS.lightWhite,
	},
	contentView: {
		padding: SIZES.medium,
		paddingBottom: 100,
	},
	errorText: {
		color: COLORS.danger,
	},
})
