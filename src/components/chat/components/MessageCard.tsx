import { Flex, Image, Stack, Heading, Text, Icon, Button } from "@chakra-ui/react";
import { AiFillStar } from "react-icons/ai"
import React from "react";

export interface MessageCardProps {
    image?: string;
    title: string;
    subtitle: string;
    rating?: number;
    subtitleIcon?: React.ReactNode;
    onClick?: () => void;
}

export const MessageCard: React.FC<MessageCardProps> = ({ image, title, subtitle, subtitleIcon, rating, onClick }) => {
    return (
        <Flex
            width="268px"
            h="384px"
            direction="column"
            borderRadius="24px"
            bg="blue.500"
            color="white"
            align="center"
            justify="center"
            onClick={() => onClick?.()}
        >
            {image && <Image src={image} alt={title} borderRadius="20px" width="240px" height="286px" />}
            <Stack w="100%" px="18px" py="2">
                <Flex justify="space-between" align="center">
                    <Heading size='md'>{title}</Heading>
                    {rating && (
                        <Flex>
                            <Button px="0" leftIcon={<Icon as={AiFillStar} />}
                                variant="ghost"
                            >
                                {rating}
                            </Button>
                        </Flex>
                    )}
                </Flex>
                <Flex align="center" mt={0}>
                    {subtitleIcon}
                    <Text>
                        {subtitle}
                    </Text>
                </Flex>
            </Stack>

        </Flex>
    )
}