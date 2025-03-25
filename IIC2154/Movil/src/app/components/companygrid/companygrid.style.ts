import { StyleSheet } from 'react-native'

import { FONT, SIZES, COLORS } from '@/constants'

const styles = StyleSheet.create({
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
	container: {
		paddingHorizontal: 10,
		paddingBottom: 10,
    backgroundColor: COLORS.white,

	},
	itemContainer: {
		flex: 1,
		margin: 10,
	},
})

export default styles
