import useFetch from '@/app/hooks/useFetch'

import { View, Text, FlatList, ActivityIndicator } from 'react-native'

import styles from './popularcompany.style'
import { COLORS, SIZES } from '@/constants'
import PopularCompanyCard from '../cards/popular/PopularCompanyCard'
import { useRouter } from 'expo-router'

const PopularCompany = () => {
	const router = useRouter()
	const { data: companies, isLoading, error } = useFetch('/companies')

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.headerTitle}>Compañías populares</Text>
			</View>
			<View style={styles.cardsContainer}>
				{isLoading ? (
					<ActivityIndicator size="large" color={COLORS.primary} />
				) : error ? (
					<Text>Ocurrió un problema</Text>
				) : (
					<FlatList
						data={companies.slice(0, 10)}
						renderItem={({ item }) => (
							<PopularCompanyCard
								company={{
									_id: item._id,
									name: item.accountData.name,
									city: item.accountData.city,
									logo: item.accountData.logo,
								}}
								companyId={item._id}
								handleNavigate={(id) => {
									router.push(`/company-details/${id}`)
								}}
							/>
						)}
						keyExtractor={(item) => item._id}
						contentContainerStyle={{ columnGap: SIZES.medium }}
						horizontal
					/>
				)}
			</View>
		</View>
	)
}

export default PopularCompany
