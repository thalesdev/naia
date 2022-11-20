import { Flex, Text } from "@chakra-ui/react";

interface HeaderProps {
    title: string;
    status: string;
}

export const Header: React.FC<HeaderProps> = ({ title, status }) => {
    return (
        <Flex
            h="87px"
            w="100%"
            direction="column"
            align="center"
            justify="center"
            borderBottom="1px solid rgba(0, 0, 0, .15)"
        >
            <Text fontSize="lg">{title}</Text>
            <Text fontSize="sm">{status}</Text>
        </Flex>
    )
}