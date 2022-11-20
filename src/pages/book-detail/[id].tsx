import { Button, Divider, Flex, Heading, Icon, Image, SimpleGrid, Tag, Text, VStack } from "@chakra-ui/react";
import React, { useMemo } from "react"
import Head from "next/head";
import { useRouter } from "next/router";
import useLocalStorage from "../../hooks/useLocalStorage";
import Menu from "../../components/menu";


interface BookDetailProps {
    params: any;
}
const PlaceDetail: React.FC<BookDetailProps> = () => {
    const router = useRouter();
    const { id } = router.query;

    const [bookings, _] = useLocalStorage("bookings", [])
    const booking = useMemo(() => {
        return bookings.find((b: any) => b.id === encodeURIComponent(id as any))
    }, [bookings])

    console.log(bookings, booking, id)

    return (
        <>
            <Head>
                <title>Booking Details</title>
            </Head>
            <Flex
                direction={"column"}
                w="100vw"
                h="100vh"
            >

                <Flex
                    p={8}
                    direction="column"
                    w="100%"
                    h="calc(100vh - 50px)"
                    m="10px auto"
                    align="flex-center"
                    justify={"center"}
                >
                    <Flex
                        w={"100%"}
                        direction="column"
                    >
                        <Flex justify={"space-between"} w="100%">
                            <Text size="lg">Booking #:{booking?.id}</Text>
                        </Flex>
                        <Flex justify={"space-between"} w="100%">
                            <Text size="lg">QueueId #:{booking?.queuingOfficeId}</Text>
                        </Flex>


                    </Flex>
                </Flex>
                <Menu />
            </Flex>
        </>
    )
}

export default PlaceDetail


