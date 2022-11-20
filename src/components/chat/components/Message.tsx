import React, { useEffect, useState } from "react";
import { Flex, Text, Button, SimpleGrid } from "@chakra-ui/react";
import { format } from 'date-fns'
import { MessageCard, MessageCardProps } from "./MessageCard";
import ChakraCarousel from "../../carousel";




export interface MessageCardsInfo {
    cards: MessageCardProps[];
    onMore?: () => void;
}

export interface MessageProps {
    message?: string;
    isOwn?: boolean;
    replyOptions?: Record<string, string>;
    onReply?: (option: string) => void;
    cards?: MessageCardsInfo | (() => Promise<MessageCardsInfo>);
    time?: Date;
}

export const Message: React.FC<MessageProps> = ({ message, isOwn, replyOptions, time, onReply, cards }) => {

    const [replied, setReplied] = React.useState<String | null>(null);

    const [cardsFetched, setCardsFetched] = useState<MessageCardsInfo | null>(null)

    const handleReply = (option: string) => {
        setReplied(option);
        onReply?.(option);
    }

    useEffect(() => {
        if (cards instanceof Function) {
            cards().then(setCardsFetched)
        } else {
            setCardsFetched(cards || null)
        }
    }, [])


    const messageScaped = message?.replaceAll(/\*(.*?)\*/g, (_, p1) => {
        return `<strong>${p1}</strong>`
    })

    return (
        <Flex w="100%" direction="column" align={isOwn ? "flex-end" : "flex-start"}>
            <Flex
                w="100%"
                direction="column"
                p="2"
                align={isOwn ? "flex-end" : "flex-start"}
            >
                {(message && messageScaped) && (
                    <Flex
                        direction="column"
                        justify="center"
                        p="4"
                        px={6}
                        borderRadius={!isOwn ? "20px 20px 20px 0" : "20px 20px 0 20px"}
                        bg={!isOwn ? "blue.500" : "gray.200"}
                        color={!isOwn ? "white" : "black"}
                    >
                        <Text dangerouslySetInnerHTML={{ __html: messageScaped }} />
                        <Flex justify="flex-end">
                            {time && (<Text fontSize="sm">{format(time, "hh:mm aaaaa'm'")}</Text>)}
                        </Flex>
                    </Flex>
                )}
                {replyOptions && (
                    <SimpleGrid columns={2} gap={2} w="100%" px={8}>
                        {replyOptions && Object.entries(replyOptions)?.map(([key, label]) => (
                            <Button
                                key={key}
                                w="100%"
                                h="40px"
                                borderRadius="10px 10px 0 10px"
                                bg="pink.400"
                                color="white"
                                _hover={{ bg: "pink.600" }}
                                _active={{ bg: "pink.700" }}
                                _focus={{ boxShadow: "none" }}
                                onClick={(e) => {
                                    if (!replied) handleReply(key)
                                }}
                                isActive={replied === key}
                            >
                                {label}
                            </Button>
                        ))}
                    </SimpleGrid>
                )}
                {cardsFetched && (
                    <ChakraCarousel gap={80}>
                        {cardsFetched.cards.map((card, index) => (
                            <MessageCard key={index} {...card} />
                        ))}
                    </ChakraCarousel>
                )}
            </Flex>
        </Flex>
    )
}

