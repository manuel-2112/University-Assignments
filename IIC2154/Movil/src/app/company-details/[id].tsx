import React, { useState } from 'react'
import {
	View,
	Text,
	SafeAreaView,
	ScrollView,
	RefreshControl,
	ActivityIndicator,
} from 'react-native'
import { Stack, useRouter } from 'expo-router'
import { About, Company, Footer, HeaderBtn, Specifics, Tabs } from '../components'
import { companyDetailsStyles } from './companydetails.style'
import { COLORS, URLS } from '@/constants'
import useCompanyDetails from '../hooks/useCompanyDetails'

const tabs = ['Descripción', 'Contacto']

const CompanyDetails = () => {
	const { company, isLoading, error, refreshing, onRefresh } = useCompanyDetails()
	const router = useRouter()
	const [activeTab, setActiveTab] = useState(tabs[0])

	const displayTabContent = () => {
		switch (activeTab) {
			case 'Descripción':
				return <About info={company?.accountData.description ?? 'No hay información'} />
			case 'Contacto':
				return (
					<Specifics
						title="Contacto"
						points={[
							company?.accountData.contactEmail || 'No hay información',
							company?.accountData.contactPhone || 'No hay información',
							company?.accountData.linkedinUrl || 'No hay información',
							company?.accountData.instagramUrl || 'No hay información',
							company?.accountData.webpageUrl || 'No hay información',
						]}
					/>
				)
			default:
				return null
		}
	}

	return (
		<SafeAreaView style={companyDetailsStyles.safeAreaView}>
			<Stack.Screen
				options={{
					headerStyle: { backgroundColor: COLORS.lightWhite },
					headerShadowVisible: false,
					headerBackVisible: false,
					headerLeft: () => <HeaderBtn handlePress={() => router.back()} />,
					headerTitle: '',
				}}
			/>

			{isLoading ? (
				<ActivityIndicator size="large" color={COLORS.primary} />
			) : (
				<>
					<ScrollView
						showsVerticalScrollIndicator={false}
						refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
					>
						{error ? (
							<Text style={companyDetailsStyles.errorText}>Ocurrió un error</Text>
						) : company ? (
							<View style={companyDetailsStyles.contentView}>
								<Company
									companyLogo={company.accountData.logo ?? URLS.defaultCompanyLogo}
									companyTitle={company.accountData.name ?? 'Nombre no disponible'}
									companyCity={company.accountData.city ?? 'Ciudad no disponible'}
									companyAddress={company.accountData.address ?? 'Dirección no disponible'}
								/>
								<Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
								{displayTabContent()}
							</View>
						) : (
							<Text style={companyDetailsStyles.errorText}>No hay respuesta</Text>
						)}
					</ScrollView>
					<Footer url={company?.accountData?.webpageUrl ?? URLS.defaultCompanyWebpage} />
				</>
			)}
		</SafeAreaView>
	)
}

export default CompanyDetails
