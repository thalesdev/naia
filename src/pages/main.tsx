import React, { useEffect } from "react";
import { Flex, VStack, Box, Image, Text, Icon } from "@chakra-ui/react"
import useLocalStorage from "../hooks/useLocalStorage";
import { TravelItenary } from "../contracts/TravelItinerary";
import { AiOutlineCalendar } from "react-icons/ai"
import { GoChevronRight } from "react-icons/go"
import { MdOutlinePlace } from "react-icons/md"
import { useRouter } from "next/router";
import Menu from "../components/menu";

const Main: React.FC = () => {

    const [travels, _] = useLocalStorage("travels", [])
    const [preferences, __] = useLocalStorage("preferences", null)

    const router = useRouter()

    useEffect(() => {
        if (preferences) {
            if (Object.entries(preferences ?? {}).length === 0) {
                router.push("/chat")
            }
        }
    }, [preferences])

    return (
        <>
            <Flex
                w="100vw"
                h="calc(100vh - 50px)"
                direction="column"
                p={8}
            >
                <VStack>
                    {travels.map((t: TravelItenary) => (
                        <Flex key={t.iataCode} w="100%" gap={2} onClick={() => router.push(!t.booked ? `/flights/${t.iataCode}` : `/book-detail/${t.bookId}`)}>
                            <Image src={t.images?.[0]} width="80px" height="80px" alt={t.name} />
                            <VStack direction="column" align="flex-start" p={2} w="100%" >
                                <Flex>
                                    <Icon as={AiOutlineCalendar} />
                                    {t.date && <Text fontSize="x-small">{t.date}</Text>}
                                </Flex>
                                <Flex justify="space-between" align="center" w="100%">
                                    <Text fontSize="lg" flex={1}>{t.name}</Text>
                                    <Icon as={GoChevronRight} />
                                </Flex>
                                <Flex>
                                    <Icon as={MdOutlinePlace} />
                                    {t.date && <Text fontSize="x-small">{t.location}</Text>}
                                </Flex>
                                {t.booked && <Text fontSize="x-small">Booked</Text>}
                            </VStack>
                        </Flex>
                    ))}
                </VStack>

            </Flex>
            <Menu />
        </>
    )
}

export default Main