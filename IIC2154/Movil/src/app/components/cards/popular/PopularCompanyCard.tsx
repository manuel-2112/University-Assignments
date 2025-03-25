import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import {
	dynamicContainerStyle,
	dynamicLogoContainerStyle,
	dynamicCompanyNameStyle,
	styles,
} from './popularcompanycard.style'
import { checkImageURL } from '@/app/utils/imageHelper'
import { URLS } from '@/constants'
import { PopularCompanyCardProps } from '@/app/interfaces'

const PopularCompanyCard = ({ company, companyId, handleNavigate }: PopularCompanyCardProps) => {
	const navigateToDetails = () => {
		handleNavigate(companyId)
	}

	return (
		<TouchableOpacity
			style={dynamicContainerStyle({ selectedCompany: companyId, item: company })}
			onPress={navigateToDetails}
		>
			<TouchableOpacity
				style={dynamicLogoContainerStyle({ selectedCompany: companyId, item: company })}
			>
				<Image
					source={{
						uri: checkImageURL(company.logo) ? company.logo : URLS.defaultCompanyLogo, // Usando URL desde constantes
					}}
					resizeMode="contain"
					style={styles.logoImage}
				/>
			</TouchableOpacity>
			<View style={styles.infoContainer}>
				<Text
					style={dynamicCompanyNameStyle({ selectedCompany: companyId, item: company })}
					numberOfLines={1}
				>
					{company.name}
				</Text>
				<Text style={styles.location}>{company.city}</Text>
			</View>
		</TouchableOpacity>
	)
}

export default PopularCompanyCard
