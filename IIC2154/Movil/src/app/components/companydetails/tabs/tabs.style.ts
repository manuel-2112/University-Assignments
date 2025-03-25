// tabs.style.ts
import { StyleSheet, ViewStyle, TextStyle } from 'react-native'
import { COLORS, SHADOWS, SIZES } from '@/constants'

const styles = StyleSheet.create({
	container: {
		marginTop: SIZES.small,
		marginBottom: SIZES.small / 2,
	},
})

// Estilos dinámicos fuera de StyleSheet.create
export const getButtonStyle = (name: string, activeTab: string): ViewStyle => ({
	paddingVertical: SIZES.medium,
	paddingHorizontal: SIZES.xLarge,
	backgroundColor: name === activeTab ? COLORS.green : '#F3F4F8',
	borderRadius: SIZES.medium,
	marginLeft: 2,
	...SHADOWS.medium,
	shadowColor: COLORS.white,
})

export const getButtonTextStyle = (name: string, activeTab: string): TextStyle => ({
	fontFamily: 'DMMedium',
	fontSize: SIZES.medium,
	color: name === activeTab ? '#ffffff' : '#AAA9B8',
})

export default styles
