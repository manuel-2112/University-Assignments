import { StyleSheet } from 'react-native';
import { COLORS } from '@/constants';

export const searchStyle = StyleSheet.create({
	safeAreaView: {
		flex: 1,
		backgroundColor: COLORS.white,
	},
	mainView: {
		flex: 1,
		backgroundColor: COLORS.white,
	},
	activityIndicator: {
		color: COLORS.primary,
	},
	textCenter: {
		textAlign: 'center',
	},
});
