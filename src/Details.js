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


function Details({project}) {
    return (
        <div>
            <Box as='h1'>{project.title}</Box>
            <GridItem justifySelf='center' alignSelf='center' background='pink' width='40%'>

                <Image src={project.imageLink}/>

            </GridItem>
            
            
            {/* <img src={project.imageLink}></img> */}
            <p>Description: {project.summary}</p>
            <p>Location: {project.contactAddress} City: {project.contactCity} Country: {project.contactCountry}</p>
            <p>Website: <a href={project.contactUrl}>{project.contactUrl}</a></p>
            <p>Project Link: <a href={project.projectLink}>{project.projectLink}</a></p>
            <p>Long Term Impact: {project.longTermImpact}</p>
            <p>Donation Goal: {project.goal}</p>
        </div>
    )
}

export default Details
