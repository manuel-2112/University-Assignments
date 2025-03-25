import { StyleSheet } from 'react-native'

import { COLORS, FONT, SIZES } from '@/constants'

const styles = StyleSheet.create({
	container: {
		width: '100%',
	},
	userName: {
		fontFamily: FONT.regular,
		fontSize: SIZES.large,
		color: COLORS.secondary,
	},
	welcomeMessage: {
		fontFamily: FONT.bold,
		fontSize: SIZES.xLarge,
		color: COLORS.primary,
		marginTop: 2,
	},
	searchContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		height: 50,
		marginTop: 15,
		marginBottom: 10,
	},
	searchBigContainer: {
		backgroundColor: COLORS.white,
		paddingHorizontal: SIZES.medium,
	},
	searchWrapper: {
		flex: 1,
		backgroundColor: COLORS.lightWhite,
		marginRight: SIZES.small,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: SIZES.medium,
		height: '100%',
	},
	searchInput: {
		fontFamily: FONT.regular,
		width: '100%',
		height: '100%',
		paddingHorizontal: SIZES.medium,
	},

	searchBtn: {
		width: 50,
		height: '100%',
		backgroundColor: COLORS.green,
		borderRadius: SIZES.medium,
		justifyContent: 'center',
		alignItems: 'center',
	},
	searchBtnImage: {
		width: '50%',
		height: '50%',
		tintColor: COLORS.white,
	},
	tabsContainer: {
		width: '100%',
		marginTop: SIZES.medium,
	},
	categoryField: {
		fontSize: SIZES.large,
		fontFamily: FONT.bold,
		color: COLORS.primary,
	},
	categoryContainer: {
		marginBottom: SIZES.small,
		textAlign: 'left',
		paddingHorizontal: 0,
	},
})

export default styles
