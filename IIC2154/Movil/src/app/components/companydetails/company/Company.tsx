import React from 'react'
import { View, Text, Image } from 'react-native'

import styles from './company.style'
import { URLS, icons } from '@/constants'
import { checkImageURL } from '@/app/utils/imageHelper'
import { CompanyProps } from '@/app/interfaces'
import { trimText } from '@/app/utils/textUtils'

const Company = ({ companyLogo, companyTitle, companyCity, companyAddress }: CompanyProps) => {
	return (
		<View style={styles.container}>
			<View style={styles.logoBox}>
				<Image
					source={{
						uri: checkImageURL(companyLogo) ? companyLogo : URLS.defaultCompanyLogo,
					}}
					style={styles.logoImage}
				/>
			</View>

			<View style={styles.companyTitleBox}>
				<Text style={styles.companyTitle}>{companyTitle}</Text>
			</View>

			<View style={styles.companyInfoBox}>
				<Text style={styles.companyAdress}>{companyCity} / </Text>
				<View style={styles.locationBox}>
					<Image source={icons.location} resizeMode="contain" style={styles.locationImage} />
					<Text style={styles.companyAdress}>{trimText(companyAddress, 30)}</Text>
				</View>
			</View>
		</View>
	)
}

export default Company
