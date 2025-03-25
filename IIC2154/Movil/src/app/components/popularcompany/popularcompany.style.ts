import { StyleSheet } from 'react-native'

import { FONT, SIZES, COLORS } from '@/constants'

const styles = StyleSheet.create({
	container: {
		marginTop: 0,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	headerTitle: {
		fontSize: SIZES.large,
		fontFamily: FONT.bold,
		color: COLORS.primary,
	},
	headerBtn: {
		fontSize: SIZES.medium,
		fontFamily: FONT.medium,
		color: COLORS.gray,
	},
	cardsContainer: {
		marginTop: SIZES.medium,
	},
})

export default styles
