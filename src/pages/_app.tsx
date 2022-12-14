import { ChakraProvider } from '@chakra-ui/react'

import { theme } from '../styles/theme'


function App({ Component, pageProps }: any) {
	return (
		<ChakraProvider theme={theme}>
			<Component {...pageProps} />
		</ChakraProvider>
	)
}

export default App