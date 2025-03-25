import { StyleSheet, ViewStyle, TextStyle } from 'react-native'
import { COLORS, FONT, SHADOWS, SIZES } from '@/constants'

type StyleArgs = {
	selectedCompany: string
	item: { _id: string }
}

const dynamicContainerStyle = ({ selectedCompany, item }: StyleArgs): ViewStyle => ({
	width: 200,
	padding: SIZES.xLarge,
	backgroundColor: selectedCompany === item._id ? COLORS.lightWhite : '#FFF',
	borderRadius: SIZES.medium,
	justifyContent: 'space-between',
	...SHADOWS.medium,
	shadowColor: COLORS.lightWhite,
})

const dynamicLogoContainerStyle = ({ selectedCompany, item }: StyleArgs): ViewStyle => ({
	width: 50,
	height: 50,
	backgroundColor: selectedCompany === item._id ? '#FFF' : COLORS.white,
	borderRadius: SIZES.medium,
	justifyContent: 'center',
	alignItems: 'center',
})

const dynamicCompanyNameStyle = ({ selectedCompany, item }: StyleArgs): TextStyle => ({
	fontSize: SIZES.large,
	fontFamily: FONT.medium,
	color: selectedCompany === item._id ? COLORS.primary : COLORS.primary,
})

const dynamicPublisherStyle = ({ selectedCompany, item }: StyleArgs): TextStyle => ({
	fontSize: SIZES.medium - 2,
	fontFamily: FONT.regular,
	color: selectedCompany === item._id ? COLORS.primary : COLORS.primary,
})

const styles = StyleSheet.create({
	logoImage: {
		width: '70%',
		height: '70%',
	},
	infoContainer: {
		marginTop: SIZES.large,
	},
	infoWrapper: {
		flexDirection: 'row',
		marginTop: 5,
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
	location: {
		fontSize: SIZES.medium - 2,
		fontFamily: FONT.regular,
		color: '#B3AEC6',
	},
})

export {
	styles,
	dynamicContainerStyle,
	dynamicLogoContainerStyle,
	dynamicCompanyNameStyle,
	dynamicPublisherStyle,
}
