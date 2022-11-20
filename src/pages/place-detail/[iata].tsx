import { Button, Divider, Flex, Heading, Icon, Image, SimpleGrid, Tag, Text, VStack } from "@chakra-ui/react";
import { AiFillStar } from "react-icons/ai"
import { HiOutlineLocationMarker } from "react-icons/hi"
import React from "react"
import Head from "next/head";
import { useRouter } from "next/router";
import useLocalStorage from "../../hooks/useLocalStorage";
import cities from "../../data/cities.json"
import Menu from "../../components/menu";


interface PlaceDetailProps {
    params: any;
}
const PlaceDetail: React.FC<PlaceDetailProps> = () => {
    const router = useRouter();
    const { iata } = router.query;


    const place = cities["place-details"].find(c => c.iataCode === iata)

    const [travels, setTravels] = useLocalStorage("travels", [])

    const handleAddTravel = () => {
        if (place) {
            setTravels([...travels.filter((t: any) => t.iataCode !== iata), {
                ...place,
                date: new Date().toISOString(),
                booked: false
            }
            ])
            router.push("/main")
        }
    }


    return (
        <>
            <Head>
                <title>{place?.name}</title>
            </Head>
            <Flex
                direction={"column"}
                w="100vw"
                h="100vh"
            >
                <Flex
                    h="50vh"
                    w={"100%"}
                    borderRadius="0 0 32px 32px"
                    boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
                >
                    <Image borderRadius="0 0 32px 32px" src={place?.images[0]} width="100%" height="100%" alt={place?.name} />
                </Flex>
                <Flex
                    p={8}
                    direction="column"
                    w="100%"
                    h="calc(50vh - 50px)"
                >
                    <Flex
                        w={"100%"}
                        direction="column"
                        align="flex-start"
                    >
                        <Flex justify={"space-between"} w="100%">
                            <Heading>{place?.name}</Heading>
                            <Button px="0" leftIcon={<Icon as={AiFillStar} />}
                                variant="ghost"
                            >
                                {4}
                            </Button>
                        </Flex>
                        <Button px="0" leftIcon={<Icon as={HiOutlineLocationMarker} />}
                            variant="ghost"
                        >
                            {place?.location}
                        </Button>

                        <VStack gap={2} align="flex-start">
                            <Text fontSize="lg">Description</Text>
                            <Text fontSize="sm">
                                {place?.description}
                            </Text>
                            <Flex direction="column">
                                <Text fontSize="lg">Activities</Text>
                                <SimpleGrid columns={4} gap={2}>
                                    {place?.tags.map(tag => (<Tag key={tag}>{tag}</Tag>))}
                                </SimpleGrid>
                            </Flex>
                            <Divider />
                            <Flex justify="end" width="100%">
                                <Button colorScheme="blue" onClick={handleAddTravel}>
                                    + Roteiro
                                </Button>
                            </Flex>
                        </VStack>

                    </Flex>
                </Flex>
                <Menu />
            </Flex>
        </>
    )
}

export default PlaceDetail


