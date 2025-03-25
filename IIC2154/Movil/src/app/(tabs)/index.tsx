import React, { useState, Fragment } from 'react'
import { ScrollView, View, SafeAreaView } from 'react-native'
import Finder from '../components/finder/Finder'
import PopularCompany from '../components/popularcompany/PopularCompany'
import NearbyCompany from '../components/nearbycompany/NearbyCompany'
import { useRouter } from 'expo-router'
import { tabStyles } from '@/styles'

export default function Tab() {
	const router = useRouter()
	const [searchTerm, setSearchTerm] = useState('')

	return (
		<Fragment>
			<SafeAreaView style={tabStyles.safeAreaView}>
				<Finder
					searchTerm={searchTerm}
					setSearchTerm={setSearchTerm}
					handleClick={() => {
						if (searchTerm) {
							router.push(`/search/${searchTerm}`)
						}
					}}
				/>
				<ScrollView showsVerticalScrollIndicator={false}>
					<View style={tabStyles.contentView}>
						<PopularCompany />
						<NearbyCompany />
					</View>
				</ScrollView>
			</SafeAreaView>
		</Fragment>
	)
}
