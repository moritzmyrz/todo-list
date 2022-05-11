import { ColorMode, extendTheme } from "@chakra-ui/react"

const config: { initialColorMode: ColorMode; useSystemColorMode: boolean } = {
    initialColorMode: "light",
    useSystemColorMode: false
};

export default extendTheme({ config });
