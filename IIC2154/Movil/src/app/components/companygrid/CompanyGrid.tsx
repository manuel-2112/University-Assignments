import React from 'react'
import { View, FlatList } from 'react-native'
import NearbyCompanyCard from '../cards/nearby/NearbyCompanyCard'
import { useRouter } from 'expo-router'
import styles from './companygrid.style'
import { CompanyGridProps } from '@/app/interfaces'

const CompanyGrid = ({ companies }: CompanyGridProps) => {
	const router = useRouter()
	return (
		<FlatList
			data={companies}
			numColumns={2}
			renderItem={({ item }) => (
				<View style={styles.itemContainer}>
					<NearbyCompanyCard
						company={item.accountData}
						companyId={item._id}
						handleNavigate={(id) => {
							router.push(`/company-details/${id}`)
						}}
					/>
				</View>
			)}
			keyExtractor={(item) => item._id}
			contentContainerStyle={styles.container}
		/>
	)
}

export default CompanyGrid
