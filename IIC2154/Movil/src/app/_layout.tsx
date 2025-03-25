import React, { useEffect } from 'react'
import { Stack } from 'expo-router/stack'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'

export default function AppLayout() {
	SplashScreen.preventAutoHideAsync()

	const [fontsLoaded] = useFonts({
		DMBold: require('@/assets/fonts/DMSans-Bold.ttf'),
		DMMedium: require('@/assets/fonts/DMSans-Medium.ttf'),
		DMRegular: require('@/assets/fonts/DMSans-Regular.ttf'),
	})

	useEffect(() => {
		async function prepare() {
			if (fontsLoaded) {
				await SplashScreen.hideAsync()
			}
		}

		prepare()
	}, [fontsLoaded])

	if (!fontsLoaded) return null

	return (
		<Stack>
			<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
		</Stack>
	)
}
