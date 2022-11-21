import { GetStaticPaths, GetStaticProps } from "next/types";
import { Flex, VStack, Button, Text, Icon, HStack, Stat, StatLabel, StatNumber, StatHelpText, ModalOverlay, ModalFooter, Modal, ModalBody, ModalContent, ModalHeader, ModalCloseButton, useDisclosure, Heading, Divider, Input } from "@chakra-ui/react"
import { BsInfoCircle } from "react-icons/bs"
import cities from "../../data/cities.json";
import React, { useEffect, useState } from "react"
import { FlightOffer, FlightSearch } from "../../contracts/FlightSearch";
import { useRouter } from "next/router";
import Head from "next/head";
import { useToast } from '@chakra-ui/react'
import useLocalStorage from "../../hooks/useLocalStorage";
import Menu from "../../components/menu";
import { TravelItenary } from "../../contracts/TravelItinerary";
import axios from "axios"

interface FlightsProps {
}
const Flights: React.FC<FlightsProps> = () => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [flightOffer, setFlightOffer] = useState<FlightOffer | null>(null)
    const [booking, setBooking] = useState<boolean>(false)
    const [bookings, setBookings] = useLocalStorage("bookings", [])
    const [travels, setTravels] = useLocalStorage("travels", [])
    const toast = useToast()

    const [flights, setFlights] = useState<FlightSearch["data"]>([])
    const [loading, setLoading] = useState<boolean>(false)


    const router = useRouter()
    const { iata } = router.query
    const place = cities["place-details"].find(c => c.iataCode === iata)

    async function onBook(flightOffer: FlightOffer) {
        if (!booking) {
            const travelTarget = travels.find((t: any) => t.iataCode === iata)
            setBooking(true)
            try {
                const { data: bookingData } = await axios.post("/api/booking", {
                    offers: [flightOffer]
                })
                if (bookingData?.data?.error) { throw new Error() }
                setBookings([...bookings, bookingData?.data])
                if (travelTarget) {
                    setTravels(travels.map((t: TravelItenary) => t.iataCode === iata ? { ...t, booked: true, bookId: bookingData?.data?.id } : t))
                }
                onClose()
                router.push("/main")
                toast({
                    title: 'Success booking',
                    description: "Your booking was successful",
                    status: 'success',
                    duration: 3500,
                    isClosable: true,
                })
            } catch {
                toast({
                    title: 'Error on booking.',
                    description: "An error ocurred while booking your flight.",
                    status: 'error',
                    duration: 3500,
                    isClosable: true,
                })
            }
            setBooking(false)
        }
    }


    useEffect(() => {
        if (!flights?.length && !loading && iata) {
            setLoading(true)
            const load = async () => {
                const { data: flightsData } = await axios.get(`/api/flights?iataCode=${iata}&date=2023-01-01`)
                setFlights(flightsData?.data)
                setLoading(false)
            }
            load()
        }
    }, [iata, flights, loading])



    return (<>
        <Head>
            <title>Voos para {place?.name}</title>
        </Head>
        <Flex
            w="100vw"
            h="calc(100vh - 50px)"
            direction="column"
            p={8}
            overflowY="auto"
        >
            <VStack gap={4}>
                {loading && <Button isLoading colorScheme='teal' variant='solid' />}
                {flights?.map(f => (
                    <Flex
                        key={f.id}
                        w="100%"
                        minH="120px"
                        py={4}
                        gap={2}
                        direction="column"
                        onClick={() => {
                            setFlightOffer(f)
                            onOpen()
                        }}>
                        <Flex w="100%" align="end">
                            Company
                        </Flex>
                        <Flex flex={1}>
                            <Flex>
                                {f.itineraries?.[0].segments?.[0].departure.iataCode}
                            </Flex>
                            <Flex flex={1} align="center" justify="center">
                                {f.itineraries?.[0].segments.length} Stops
                            </Flex>
                            <Flex>
                                {f.itineraries?.[0].segments?.[f.itineraries[0].segments.length - 1].arrival.iataCode}
                            </Flex>
                        </Flex>
                        <Flex w="100%" justify="space-between">
                            <Button leftIcon={<Icon as={BsInfoCircle} />}>Flight Info</Button>
                            <HStack>
                                <Text>Price</Text>
                                <Text color="blue.500">{
                                    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: f.price.currency }).format(f.price.total)
                                }</Text>
                            </HStack>
                        </Flex>
                    </Flex>
                ))}
            </VStack>

        </Flex>
        <Menu />

        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Confirm Flight</ModalHeader>
                <ModalCloseButton />
                <ModalBody >
                    <VStack gap={4} w="100%" align="start">
                        <VStack flex={1} align="center" direction="column" w="100%">
                            <Flex direction="column" w="100%">
                                <Text fontSize="md">Departure From</Text>
                                <Heading>
                                    {flightOffer?.itineraries?.[0].segments?.[0].departure.iataCode}
                                </Heading>
                            </Flex>
                            <Divider />
                            <Flex direction="column" w="100%">
                                <Text fontSize="md">Arrival At</Text>
                                <Heading>
                                    {flightOffer?.itineraries?.[0].segments?.[flightOffer?.itineraries[0].segments.length - 1].arrival.iataCode}
                                </Heading>
                            </Flex>
                        </VStack>
                        <Stat>
                            <StatLabel>Price</StatLabel>
                            <StatNumber>{
                                new Intl.NumberFormat('pt-BR', { style: 'currency', currency: flightOffer?.price.currency ?? "BRL" }).format(flightOffer?.price.total ?? 0)
                            }</StatNumber>
                        </Stat>
                    </VStack>


                </ModalBody>


                <ModalFooter>
                    <Button variant='ghost' mr={3} onClick={onClose}>
                        Close
                    </Button>
                    {flightOffer && <Button colorScheme="blue" isLoading={booking} onClick={() => onBook(flightOffer)}>Confirm Book</Button>}
                </ModalFooter>
            </ModalContent>
        </Modal>
    </>)
}



export default Flights