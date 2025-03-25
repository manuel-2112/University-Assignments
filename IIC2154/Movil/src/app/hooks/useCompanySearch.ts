import { useState, useEffect } from 'react'
import axios from 'axios'
import { ApiResponse, Company } from '../interfaces/companyInterfaces'

export const useCompanySearch = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const [searchResult, setSearchResult] = useState<Company[]>([])
	const [searchLoader, setSearchLoader] = useState(false)
	const [searchError, setSearchError] = useState<string | null>(null)

	useEffect(() => {
		fetchCompanies()
	}, [])

	const fetchCompanies = async () => {
		setSearchLoader(true)
		try {
			const response = await axios.get<ApiResponse>(
				'https://agrotech-api-capstone.online/api/companies',
			)
			const sortedData = response.data.company.sort((a, b) =>
				(a.accountData.name || '').localeCompare(b.accountData.name || ''),
			)
			setSearchResult(sortedData)
		} catch (error) {
			console.error('Error fetching data:', error)
			setSearchError('Failed to fetch data')
		} finally {
			setSearchLoader(false)
		}
	}

	const filteredCompanies = searchResult.filter((company) => {
		const companyName = company.accountData?.name.toLowerCase() || ''
		return companyName.includes(searchTerm.toLowerCase())
	})

	return {
		searchTerm,
		setSearchTerm,
		searchLoader,
		searchError,
		filteredCompanies,
	}
}
