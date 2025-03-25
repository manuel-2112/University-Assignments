import React from 'react'
import { TouchableOpacity } from 'react-native'
import { styles } from './headerbtn.style'
import { AntDesign } from '@expo/vector-icons'
import { ScreenHeaderBtnProps } from '@/app/interfaces'

const HeaderBtn = ({ handlePress }: ScreenHeaderBtnProps) => {
	return (
		<TouchableOpacity style={styles.btnContainer} onPress={handlePress}>
			<AntDesign name="arrowleft" size={28} color="black" />
		</TouchableOpacity>
	)
}

export default HeaderBtn
