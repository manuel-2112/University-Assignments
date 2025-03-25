import React, { Fragment } from 'react'
import { View, Text, SafeAreaView, ActivityIndicator } from 'react-native'
import { searchStyle } from '@/styles'
import { useCompanySearch } from '../hooks/useCompanySearch'
import { CompanyGrid, FinderAutomatic } from '../components'

export default function Tab() {
	const { searchTerm, setSearchTerm, searchLoader, searchError, filteredCompanies } =
		useCompanySearch()

	return (
		<Fragment>
			<SafeAreaView style={searchStyle.safeAreaView}>
				<FinderAutomatic
					searchTerm={searchTerm}
					setSearchTerm={setSearchTerm}
					onChangeText={(text) => setSearchTerm(text)}
				/>

				<View style={searchStyle.mainView}>
					{searchLoader ? (
						<ActivityIndicator size="large" color={searchStyle.activityIndicator.color} />
					) : searchError ? (
						<Text style={searchStyle.textCenter}>{searchError}</Text>
					) : (
						<CompanyGrid companies={filteredCompanies} />
					)}
				</View>
			</SafeAreaView>
		</Fragment>
	)
}
