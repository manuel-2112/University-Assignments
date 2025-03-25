import { StyleSheet } from 'react-native'

import { COLORS, FONT, SIZES } from '@/constants'

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		height: 80,
		padding: SIZES.small,
		justifyContent: 'space-between',
		alignItems: 'center',
		flexDirection: 'row',
	},
	likeBtn: {
		width: 55,
		height: 55,
		borderWidth: 1,
		borderColor: '#F37453',
		borderRadius: SIZES.medium,
		justifyContent: 'center',
		alignItems: 'center',
	},
	likeBtnImage: {
		width: '40%',
		height: '40%',
		tintColor: '#F37453',
	},
	applyBtn: {
		flex: 1,
		height: 55,
		backgroundColor: COLORS.green,
		justifyContent: 'center',
		alignItems: 'center',
		margin: SIZES.small,
		borderRadius: SIZES.medium,
	},
	applyBtnText: {
		fontSize: SIZES.medium,
		color: COLORS.white,
		fontFamily: FONT.bold,
	},
})

export default styles
