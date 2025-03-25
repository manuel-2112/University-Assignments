// Tabs.tsx
import React from 'react'
import { TouchableOpacity, FlatList, Text, View } from 'react-native'
import styles, { getButtonStyle, getButtonTextStyle } from './tabs.style'
import { SIZES } from '@/constants'
import { TabButtonProps, TabsProps } from '@/app/interfaces'

const TabButton = ({ name, activeTab, onHandleSearchType }: TabButtonProps) => {
	return (
		<TouchableOpacity style={getButtonStyle(name, activeTab)} onPress={onHandleSearchType}>
			<Text style={getButtonTextStyle(name, activeTab)}>{name}</Text>
		</TouchableOpacity>
	)
}

const Tabs = ({ tabs, activeTab, setActiveTab }: TabsProps) => {
	return (
		<View style={[styles.container, { flex: 1 }]}>
			<FlatList
				data={tabs}
				horizontal
				showsHorizontalScrollIndicator={false}
				renderItem={({ item }) => (
					<TabButton
						name={item}
						activeTab={activeTab}
						onHandleSearchType={() => setActiveTab(item)}
					/>
				)}
				contentContainerStyle={{
					flexGrow: 1,
					justifyContent: 'space-evenly',
					paddingLeft: SIZES.small,
					paddingRight: SIZES.small,
				}}
				keyExtractor={(item) => item}
			/>
		</View>
	)
}

export default Tabs
