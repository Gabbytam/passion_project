import React from 'react';
import {
    Grid,
    GridItem,
    Image,
    Box,
    Button,
    ButtonGroup,
    extendTheme,
    ChakraProvider,
    useColorMode,
    colorMode,
  } from "@chakra-ui/react";

function Home() {
    return (
        <div>
            <Box>Being a good person, made a little easier</Box>
            <Box>Don't know where to donate but feel in the giving mood? Here you will have access to thousands of global projects all in need of support.</Box>
            <Box>You'll have the option of having a project selected at random for you, or you can select a theme that you feel passionate about and see all the related projects.</Box>
        </div>
    )
}

export default Home
