import { Flex, Icon, IconButton, Input } from "@chakra-ui/react";
import { BsPlusSquare } from "react-icons/bs"
import { HiOutlinePaperAirplane } from "react-icons/hi"
import React, { useState } from "react"

interface ReplyBoxProps {
    enabled?: boolean;
    onReply?: (data: string) => void;
}

export const ReplyBox: React.FC<ReplyBoxProps> = ({ enabled, onReply }) => {
    const [text, setText] = useState<string>("")

    function handleReply() {
        onReply?.(text);
        setText("")
    }

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
                h="49px"
            />

            <Input placeholder='Type a comment' value={text} onChange={e => setText(e.target.value)} size='md' variant="ghost" h="49px" />
            <IconButton
                icon={
                    <Icon as={HiOutlinePaperAirplane} />}
                aria-label='Add attachment'
                variant='ghost'
                colorScheme="blue"
                h="49px"
                onClick={handleReply}
            />

        </Flex>
    )
}