import { TextInput, View } from 'react-native'
import styles from './finderautomatic.style'
import { FinderPropsAutomatic } from '@/app/interfaces'

const FinderAutomatic = ({ searchTerm, setSearchTerm, onChangeText }: FinderPropsAutomatic) => {
	return (
		<View style={styles.searchBigContainer}>
			<View style={styles.searchContainer}>
				<View style={styles.searchWrapper}>
					<TextInput
						style={styles.searchInput}
						value={searchTerm}
						onChangeText={onChangeText || setSearchTerm}
						placeholder="Encuentra tu Compañía"
					/>
				</View>
			</View>
		</View>
	)
}

export default FinderAutomatic
