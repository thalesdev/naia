import { Flex, IconButton, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { IoIosArrowBack } from "react-icons/io"

interface HeaderProps {
    title: string;
    status: string;
}

export const Header: React.FC<HeaderProps> = ({ title, status }) => {

    const router = useRouter()
    return (
        <Flex
            h="87px"
            w="100%"
        >
            <Flex align="center" justify="center"
                h="87px">
                <IconButton aria-label="back" variant="ghost" size='sm' as={IoIosArrowBack} onClick={() => router.back()} />
            </Flex>
            <Flex

                h="87px"
                flex={1}
                direction="column"
                align="center"
                justify="center"
                borderBottom="1px solid rgba(0, 0, 0, .15)"
            >
                <Text fontSize="lg">{title}</Text>
                <Text fontSize="sm">{status}</Text>
            </Flex>
        </Flex>
    )
}