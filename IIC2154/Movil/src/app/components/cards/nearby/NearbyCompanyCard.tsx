import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import styles from './nearbycompanycard.style'
import { checkImageURL } from '@/app/utils/imageHelper'
import { NearbyCompanyCardProps } from '@/app/interfaces'
import { URLS } from '@/constants'

const NearbyCompanyCard = ({ company, companyId, handleNavigate }: NearbyCompanyCardProps) => {
	const navigateToDetails = () => {
		handleNavigate(companyId)
	}

	return (
		<TouchableOpacity style={styles.container} onPress={navigateToDetails}>
			<TouchableOpacity style={styles.logoContainer}>
				<Image
					source={{
						uri: checkImageURL(company.logo) ? company.logo : URLS.defaultCompanyLogo,
					}}
					resizeMode="contain"
					style={styles.logoImage}
				/>
			</TouchableOpacity>
			<View style={styles.textContainer}>
				<Text style={styles.companyName} numberOfLines={1}>
					{company.name}
				</Text>
				<Text style={styles.companyType}>{company.region}</Text>
			</View>
		</TouchableOpacity>
	)
}

export default NearbyCompanyCard
