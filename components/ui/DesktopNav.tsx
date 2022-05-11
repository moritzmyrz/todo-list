import { ChevronRightIcon } from "@chakra-ui/icons";
import React from "react";
import { Box, Flex, Link, Stack, Text, Icon, Popover, PopoverContent, PopoverTrigger, useColorModeValue } from "@chakra-ui/react";
import { INavItem } from "../../interfaces";

export default function DesktopNav({ items }: { items: INavItem[] }) {
    return (
        <Stack direction={"row"} spacing={4}>
            {items.map((item) => (
                <Box key={item.label}>
                    <Popover trigger={"hover"} placement={"bottom-start"}>
                        <PopoverTrigger>
                            <Link
                                p={2}
                                href={item.href ?? "#"}
                                fontSize={"sm"}
                                fontWeight={500}
                                color={useColorModeValue("gray.600", "gray.200")}
                                _hover={{
                                    textDecoration: "none",
                                    color: useColorModeValue("gray.800", "white"),
                                }}>
                                {item.label}
                            </Link>
                        </PopoverTrigger>

                        {item.children && (
                            <PopoverContent
                                border={0}
                                boxShadow={"xl"}
                                bg={useColorModeValue("white", "gray.800")}
                                p={4}
                                rounded={"xl"}
                                minW={"sm"}>
                                <Stack>
                                    {item.children.map((child) => (
                                        <DesktopSubNav key={child.label} {...child} />
                                    ))}
                                </Stack>
                            </PopoverContent>
                        )}
                    </Popover>
                </Box>
            ))}
        </Stack>
    );
};

function DesktopSubNav({ label, href = "#", subLabel }: INavItem) {
    return (
      <Link
        href={href}
        role={"group"}
        display={"block"}
        p={2}
        rounded={"md"}
        _hover={{ bg: useColorModeValue("green.50", "gray.900") }}>
        <Stack direction={"row"} align={"center"}>
          <Box>
            <Text
              transition={"all .3s ease"}
              _groupHover={{ color: "green.400" }}
              fontWeight={500}>
              {label}
            </Text>
            <Text fontSize={"sm"}>{subLabel}</Text>
          </Box>
          <Flex
            transition={"all .3s ease"}
            transform={"translateX(-10px)"}
            opacity={0}
            _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
            justify={"flex-end"}
            align={"center"}
            flex={1}>
            <Icon color={"green.400"} w={5} h={5} as={ChevronRightIcon} />
          </Flex>
        </Stack>
      </Link>
    );
  };