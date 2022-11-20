import { Flex, Icon, IconButton, Input } from "@chakra-ui/react";
import { BsPlusSquare } from "react-icons/bs"
import React from "react"

interface ReplyBoxProps {
    enabled?: boolean;
    onReply?: (option: string) => void;
}

export const ReplyBox: React.FC<ReplyBoxProps> = ({ enabled, onReply }) => {
    return (
        <Flex
            w="100%"
            h="49px"
            borderRadius="10px 0 0 10px"
            borderTop="1px solid rgba(0,0,0, .25)"
            justify="space-between"
        >
            <IconButton icon={
                <Icon as={BsPlusSquare} />}
                aria-label='Add attachment'
                variant='ghost'
                colorScheme="pink"
            />

            <Input placeholder='Type a comment' size='md' variant="ghost" />

        </Flex>
    )
}