import React from "react";
import TodoItem from "./TodoItem";
import { v4 as uuidv4 } from "uuid";
import { Stack, Text } from "@chakra-ui/react";

export default function ItemList({ data, text }) {
    return (
        <Stack spacing={3.5}>
            {data.length ? data.map(item =>
                (<TodoItem key={uuidv4()} item={item} />)
            ) : (
                <Stack mt={20} textAlign={"center"}>
                    <Text>{text}</Text>
                </Stack>
            )}
        </Stack>
    )
}