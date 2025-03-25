export interface CompanyData {
	name: string
	logo: string
	region: string
}

export interface Company {
	_id: string
	accountData: CompanyData
}

export interface NearbyCompanyCardProps {
	company: CompanyData
	companyId: string
	handleNavigate: (companyId: string) => void
}

export interface CompanyCardInfo {
	_id: string
	name: string
	city: string
	logo: string
}

export interface PopularCompanyCardProps {
	company: CompanyCardInfo
	companyId: string
	handleNavigate: (companyId: string) => void
}

export interface CompanyProps {
	companyLogo: string
	companyTitle: string
	companyCity: string
	companyAddress: string
}

export interface SpecificsProps {
	title: string
	points: string[]
}

export interface TabsProps {
	tabs: string[]
	activeTab: string
	setActiveTab: (tab: string) => void
}

export interface TabButtonProps {
	name: string
	activeTab: string
	onHandleSearchType: () => void
}

export interface CompanyGridProps {
	companies: Company[]
}

export interface FinderPropsAutomatic {
	searchTerm: string
	setSearchTerm: (searchTerm: string) => void
	onChangeText?: (text: string) => void
}
export interface ScreenHeaderBtnProps {
	handlePress: () => void
}

export interface FinderProps {
	searchTerm: string
	setSearchTerm: (searchTerm: string) => void
	handleClick: () => void
}

export interface AccountData {
	branchRegions: string[]
	email: string
	name: string
	address: string
	city: string
	contactEmail: string
	contactPhone: string
	description: string
	linkedinUrl: string
	instagramUrl: string
	region: string
	rut: string
	webpageUrl: string
	logo: string
}

export interface Permissions {
	isVerified: boolean
	isSuperuser: boolean
}

export interface ApiResponse {
	company: CompanyResponse[]
}

export interface CompanyResponse {
	_id: string
	permissions: Permissions
	accountData: AccountData
}
