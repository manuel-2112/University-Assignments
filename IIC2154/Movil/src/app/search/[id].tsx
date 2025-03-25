import React, { useEffect, useState } from 'react'
import {
	ActivityIndicator,
	FlatList,
	Image,
	TouchableOpacity,
	View,
	Text,
	SafeAreaView,
} from 'react-native'
import { useRouter, useLocalSearchParams, Stack } from 'expo-router'
import axios from 'axios'

import { COLORS, icons, SIZES } from '../../constants'
import HeaderBtn from '../components/header/HeaderBtn'
import NearbyCompanyCard from '../components/cards/nearby/NearbyCompanyCard'
import styles from '@/styles'

interface CompanyData {
	name: string
	logo: string
	region: string
}

interface CompanyItem {
	accountData: CompanyData
	_id: string
}

const CompanySearch = () => {
	const params = useLocalSearchParams()
	const router = useRouter()

	const [searchResult, setSearchResult] = useState<CompanyItem[]>([])
	const [searchLoader, setSearchLoader] = useState(false)
	const [searchError, setSearchError] = useState<unknown>(null)
	const [page, setPage] = useState(1)

	const handleSearch = async () => {
		setSearchLoader(true)
		setSearchResult([])

		try {
			const options = {
				method: 'GET',
				url: `https://agrotech-api-capstone.online/api/companies`,
				headers: {},
			}

			const response = await axios.request(options)
			setSearchResult(response.data.company)
		} catch (error) {
			setSearchError(error)
		} finally {
			setSearchLoader(false)
		}
	}

	const handlePagination = (direction: string) => {
		if (direction === 'left' && page > 1) {
			setPage(page - 1)
		} else if (direction === 'right') {
			setPage(page + 1)
		}
		handleSearch()
	}

	useEffect(() => {
		handleSearch()
	}, [page])

	const filterProducts = (item: CompanyItem) => {
		const searchId = typeof params.id === 'string' ? params.id : params.id[0]
		return item.accountData.name.toLowerCase().includes(searchId.toLowerCase())
	}

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
			<Stack.Screen
				options={{
					headerStyle: { backgroundColor: COLORS.white },
					headerShadowVisible: false,
					headerBackVisible: false,
					headerLeft: () => <HeaderBtn handlePress={() => router.back()} />,
					headerTitle: '',
				}}
			/>
			<FlatList
				data={searchResult.filter(filterProducts)}
				renderItem={({ item }) => (
					<NearbyCompanyCard
						company={item.accountData}
						companyId={item._id}
						handleNavigate={(id) => {
							router.push(`/company-details/${id}`)
						}}
					/>
				)}
				keyExtractor={(item) => item._id}
				contentContainerStyle={{ padding: SIZES.medium, rowGap: SIZES.medium }}
				ListHeaderComponent={() => (
					<>
						<View style={styles.container}>
							<Text style={styles.searchTitle}>{params.id}</Text>
							<Text style={styles.noOfSearchedCompany}>Compañías encontradas</Text>
						</View>
						<View style={styles.loaderContainer}>
							{searchLoader ? (
								<ActivityIndicator size="large" color={COLORS.primary} />
							) : searchError ? (
								<Text>Oops, something went wrong</Text>
							) : null}
						</View>
					</>
				)}
				ListFooterComponent={() => (
					<View style={styles.footerContainer}>
						<TouchableOpacity
							style={styles.paginationButton}
							onPress={() => handlePagination('left')}
						>
							<Image
								source={icons.chevronLeft}
								style={styles.paginationImage}
								resizeMode="contain"
							/>
						</TouchableOpacity>
						<View style={styles.paginationTextBox}>
							<Text style={styles.paginationText}>{page}</Text>
						</View>
						<TouchableOpacity
							style={styles.paginationButton}
							onPress={() => handlePagination('right')}
						>
							<Image
								source={icons.chevronRight}
								style={styles.paginationImage}
								resizeMode="contain"
							/>
						</TouchableOpacity>
					</View>
				)}
			/>
		</SafeAreaView>
	)
}

export default CompanySearch
