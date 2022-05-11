import React from "react";
import MobileNav from "../ui/MobileNav";
import DesktopNav from "../ui/DesktopNav";
import AvatarDropdown from "../ui/AvatarDropdown";
import { Box, Flex, Text, IconButton, Button, Stack, Collapse, useColorModeValue, useBreakpointValue, useDisclosure, useColorMode } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useSession } from "next-auth/client";
import { INavItem } from "../../interfaces";

const NavItems: Array<INavItem> = [
  {
    label: "Home",
    href: "/"
  }
];

export default function Header() {
  const [session] = useSession();
  const { isOpen, onToggle } = useDisclosure();
  const { toggleColorMode } = useColorMode();

  return (
    <Box>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}>
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}>
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Text
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"heading"}
            color={useColorModeValue("gray.800", "white")}>
            Logo
            </Text>

          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav items={NavItems} />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={2}>
          <IconButton
            onClick={toggleColorMode}
            aria-label={"Toggle Theme"}
            variant={"unstyled"}>
            {useColorModeValue(<MoonIcon />, <SunIcon />)}
          </IconButton>
          {!session && (<Button
            as={"a"}
            fontSize={"sm"}
            fontWeight={400}
            variant={"link"}
            href={"/api/auth/signin"}>
            Sign In
          </Button>)}
          {session && <AvatarDropdown session={session} />}
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav items={NavItems} />
      </Collapse>
    </Box>
  );
}
