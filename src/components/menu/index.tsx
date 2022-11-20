import { Flex, IconButton, Icon } from "@chakra-ui/react";
import { BsFillChatDotsFill } from "react-icons/bs"
import { AiOutlineBook } from "react-icons/ai"
import { RiTodoFill } from "react-icons/ri"
import React from "react";
import { useRouter } from "next/router";

const Menu: React.FC = () => {

    const router = useRouter()
    const go = (path: string) => router.push(path)

    return (
        <Flex w="100vw" height="50px" gap={2} p={2} align="flex-start" justify="center">
            <IconButton icon={<Icon as={BsFillChatDotsFill} />} variant="ghost" aria-label="Chat"
                onClick={() => go("/chat")}
            />
            <IconButton icon={<Icon as={RiTodoFill} />} variant="ghost" aria-label="Travels"
                onClick={() => go("/main")}
            />
        </Flex>
    )
}

export default Menu