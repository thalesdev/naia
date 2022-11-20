import { ChakraProvider } from '@chakra-ui/react'

import { theme } from '../styles/theme'
import { SidebarDrawerProvider } from '../contexts/SidebarDrawerContext'


function App({ Component, pageProps }: any) {
	return (
		<ChakraProvider theme={theme}>
			<SidebarDrawerProvider>
				<Component {...pageProps} />
			</SidebarDrawerProvider>
		</ChakraProvider>
	)
}

export default App