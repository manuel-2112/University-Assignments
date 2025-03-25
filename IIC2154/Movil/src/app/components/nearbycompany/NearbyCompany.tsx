import React from 'react'
import { useRouter } from 'expo-router'
import { View, Text, ActivityIndicator } from 'react-native'
import styles from './nearbycompany.style'
import useFetch from '@/app/hooks/useFetch'
import { COLORS } from '@/constants'
import NearbyCompanyCard from '../cards/nearby/NearbyCompanyCard'


const NearbyCompany = () => {
	const router = useRouter()
	const { data: companies, isLoading, error } = useFetch('companies')

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.headerTitle}>Compañías cercanas</Text>
			</View>
			<View style={styles.cardsContainer}>
				{isLoading ? (
					<ActivityIndicator size="large" color={COLORS.primary} />
				) : error ? (
					<Text>Ocurrió un problema</Text>
				) : (
					companies
						.slice(0, 10)
						?.map((item) => (
							<NearbyCompanyCard
								company={item.accountData}
								companyId={item._id}
								key={`nearby-company-${item._id}`}
								handleNavigate={() => router.push(`/company-details/${item._id}`)}
							/>
						))
				)}
			</View>
		</View>
	)
}

export default NearbyCompany
