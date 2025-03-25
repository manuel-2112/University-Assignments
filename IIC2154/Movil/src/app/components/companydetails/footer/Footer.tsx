import { View, Text, TouchableOpacity, Linking } from 'react-native'

import styles from './footer.style'

interface FooterProps {
	url: string
}
const Footer = ({ url }: FooterProps) => {
	return (
		<View style={styles.container}>
			<TouchableOpacity style={styles.applyBtn} onPress={() => Linking.openURL(url)}>
				<Text style={styles.applyBtnText}>Contactar a la empresa</Text>
			</TouchableOpacity>
		</View>
	)
}

export default Footer
