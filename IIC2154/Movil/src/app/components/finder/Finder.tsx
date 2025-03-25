import { TextInput, TouchableOpacity, View } from 'react-native'
import styles from './finder.style'

import { AntDesign } from '@expo/vector-icons'
import { FinderProps } from '@/app/interfaces'

const Finder = ({ searchTerm, setSearchTerm, handleClick }: FinderProps) => {
	return (
		<View style={styles.searchBigContainer}>
			<View style={styles.searchContainer}>
				<View style={styles.searchWrapper}>
					<TextInput
						style={styles.searchInput}
						value={searchTerm}
						onChangeText={(text) => {
							setSearchTerm(text)
						}}
						placeholder="Escribe tu problema"
					/>
				</View>
				<TouchableOpacity style={styles.searchBtn} onPress={handleClick}>
					<AntDesign name="search1" size={20} color="white" />
				</TouchableOpacity>
			</View>
		</View>
	)
}

export default Finder
