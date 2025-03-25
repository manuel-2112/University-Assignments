import { useState, useEffect } from 'react'
import axios from 'axios'
import { ApiResponse, CompanyResponse } from '../interfaces'

const useFetch = (endpoint: string) => {
	const [data, setData] = useState<CompanyResponse[]>([])
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<any>(null)

	const options = {
		method: 'GET',
		url: `https://agrotech-api-capstone.online/api/${endpoint}`,
	}

	const fetchData = async () => {
		setIsLoading(true)
		try {
			const response = await axios.get<ApiResponse>(options.url)
			if (response.data && response.data.company) {
				setData(response.data.company)
			}
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
		fetchData()
	}

	return { data, isLoading, error, refetch }
}

export default useFetch
