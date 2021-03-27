import React from 'react';
import { Link } from 'react-router-dom';

import { extendTheme, useColorMode, colorMode, Box, Flex, Heading, Image, IconButton } from "@chakra-ui/react"
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

function Layout(props) {

    const bgColor = {
        // light: 'rgba(212, 221, 224)',
        light: 'rgba(174, 198, 196)',
        dark: '#013328',
    };

    const navColor = {
        // light: 'rgba(174, 198, 196)',
        light: 'rgba(212, 221, 224)',
        dark: 'rgba(207, 233, 175)',
    }
    //const textColor = { light: "blue.400", dark: "gray.100" };
    const textColor = { light: "rgb(0, 0, 0)", dark: "gray.100" };
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <Box
        bgColor={bgColor[colorMode]}
        h='100%'>
            <Flex
            as="nav"
            align="center"
            justify="space-between"
            wrap="wrap"
            padding=".5rem"
            zIndex="1"
            bgColor={navColor[colorMode]}
            bgSize="140vh"
            position="sticky"
            >
                <Flex align="center" mr={5}>
                    <Heading as="h1" size="lg" letterSpacing={"-.1rem"}>
                    <Link href="/">
                        <Image
                        h='10vh'
                        mt="0"
                        src="../images/donation.png"
                        />
                    </Link>
                    </Heading>
                </Flex>
                {/* <Box>
                    <Link to={'/'} >
                        Home
                    </Link>
                </Box> */}
                <Box>
                <Link to={'/pickforme'} >
                    Random!
                </Link>
                </Box>
                <Box>
                <Link to={'/categories'} >
                    Categories
                </Link>
                </Box>

                <Box display="flex" alignItems="center">
                    <IconButton
                    mr="1vw"
                    rounded="full"
                    onClick={toggleColorMode}
                    icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                    >
                    Change Color Mode
                    </IconButton>
                </Box>
            </Flex>

            <Box display='flex' justifyContent='center'> {props.children}</Box>
        </Box>
    )
}

export default Layout
