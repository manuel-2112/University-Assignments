import { useState, useEffect } from 'react'
import axios from 'axios'
import { CompanyResponse } from '../interfaces'

const useFetchCompany = (endpoint: string) => {
	const [data, setData] = useState<CompanyResponse | null>(null)
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<any>(null)

	const options = {
		method: 'GET',
		url: `https://agrotech-api-capstone.online/api/${endpoint}`,
	}

	const fetchData = async () => {
		setIsLoading(true)
		try {
			const response = await axios.get<{ company: CompanyResponse }>(options.url)
			setData(response.data.company)
			setIsLoading(false)
		} catch (error) {
			setError(error)
			setIsLoading(false)
		}
	}

	useEffect(() => {
		fetchData()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const refetch = () => {
		setIsLoading(true)
		fetchData()
	}

	return { data, isLoading, error, refetch }
}

export default useFetchCompany
