import { StyleSheet } from 'react-native'

import { COLORS, FONT, SIZES } from '@/constants'

const styles = StyleSheet.create({
	container: {
		marginVertical: SIZES.medium,
		justifyContent: 'center',
		alignItems: 'center',
	},
	logoBox: {
		width: 80,
		height: 80,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#FFF',
		borderRadius: SIZES.large,
	},
	logoImage: {
		width: '80%',
		height: '80%',
	},
	companyTitleBox: {
		marginTop: SIZES.small,
	},
	companyTitle: {
		fontSize: SIZES.large,
		color: COLORS.primary,
		fontFamily: FONT.bold,
		textAlign: 'center',
	},
	companyInfoBox: {
		marginTop: SIZES.small / 2,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	locationBox: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	locationImage: {
		width: 14,
		height: 14,
		tintColor: COLORS.gray,
	},
	companyAdress: {
		fontSize: SIZES.medium - 2,
		color: COLORS.gray,
		fontFamily: FONT.regular,
		marginLeft: 2,
	},
})

export default styles
