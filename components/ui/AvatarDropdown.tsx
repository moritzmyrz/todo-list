import React from "react";
import { signOut } from "next-auth/client";
import { Menu, MenuButton, Button, Avatar, MenuList, MenuItem, MenuDivider, Box, Text } from "@chakra-ui/react";

export default function AvatarDropdown({ session }) {
    return (
        <>
            { session && (<Menu closeOnSelect={false}>
                <MenuButton
                    as={Button}
                    rounded={"full"}
                    variant={"unstyled"}
                    cursor={"pointer"}>
                    <Avatar
                        size={"sm"}
                        src={session.user.image}
                    />
                </MenuButton>
                <MenuList>
                    <MenuItem isFocusable={true} _hover={{ bgColor: "transparent" }} _focus={{ bgColor: "transparent" }}>
                        <Box>
                            <Text fontSize={"sm"}>Signed in as</Text>
                            <Text fontWeight={"bold"} isTruncated>{session.user.name}</Text>
                        </Box>
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem onClick={(e) => { e.preventDefault(); return signOut(); }}>Sign Out</MenuItem>
                </MenuList>
            </Menu>)
            }
        </>
    )
};