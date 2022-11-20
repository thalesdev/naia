// import awsExports from '../aws-exports';
// import { Amplify } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';
// import { withAuthenticator } from '@aws-amplify/ui-react';
import { Flex, Box, Text, Stack, Button } from '@chakra-ui/react'
import Head from 'next/head';
import bg from '../../public/img/home_bg.svg'
import { useRouter } from 'next/router';

// Amplify.configure(updatedAwsConfig);

const Home = () => {

  const router = useRouter()


  return (
    <>
      <Head>
        <title>Naia</title>
      </Head>
      <Flex flex={1} h="100vh">
        <Flex w={["100vw", "80vw"]} h="calc(100vh - 220px)" p={0}>
          <img src={bg.src} alt="Background" width="100%" style={{ backgroundPosition: "0 0" }} />
        </Flex>
        <Box
          pos="absolute"
          bottom="0px"
          left="0px"
          bg="white"
          w={["100vw", "80vw"]}
          h="270px"
          borderRadius="32px 32px  0 0"
          p="2rem"
        >
          <Stack
            flex={1}
            alignItems="center"
            justifyContent="center"
            direction="column"
            spacing={4}
          >
            <Text fontSize='26px'>Sua Assistente Virtual</Text>
            <Text fontSize='16px'>Descubra ótimas experiências ao seu redor e torne sua vida interessante!</Text>
            <Button style={{ marginTop: "32px" }} colorScheme="blue" onClick={() => router.push("/chat")} >Iniciar</Button>
          </Stack>
        </Box>
      </Flex>
    </>
  )
}

export default Home;
