import { View, Text } from 'react-native'

import styles from './about.style'

interface AboutProps {
	info: string
}

const About = ({ info }: AboutProps) => {
	return (
		<View style={styles.container}>
			<Text style={styles.headText}>Acerca de la compañía:</Text>

			<View style={styles.contentBox}>
				<Text style={styles.contextText}>{info}</Text>
			</View>
		</View>
	)
}

export default About
