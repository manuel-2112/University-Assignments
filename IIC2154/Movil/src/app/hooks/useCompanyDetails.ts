import { useCallback, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import useFetchCompany from './useFetchCompany'

const useCompanyDetails = () => {
	const { id: companyId } = useLocalSearchParams()
	const { data: company, isLoading, error, refetch } = useFetchCompany(`/companies/${companyId}`)

	const [refreshing, setRefreshing] = useState(false)

	const onRefresh = useCallback(() => {
		setRefreshing(true)
		refetch()
		setRefreshing(false)
	}, [refetch])

	return {
		company,
		isLoading,
		error,
		refreshing,
		onRefresh,
		refetch,
	}
}

export default useCompanyDetails
