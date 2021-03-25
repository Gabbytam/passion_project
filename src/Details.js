import React, {useState, useEffect} from 'react';
import axios from 'axios';
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

const urlStart = 'https://api.globalgiving.org/api/public/projectservice/';
const api_key = 'bc212140-0729-4c60-a886-a9b73c05ea49';

function Details({project, projectId}) {
    useEffect(() => {
        grabProjectInfo();

    }, [])

    const [chosenProject, setChosenProject] = useState('');

    const grabProjectInfo = async () => {
        try {
            let newUrl = urlStart +'projects/' + projectId + '?api_key=' + api_key;
            let result = await axios.get(newUrl);
            console.log('chosen project', result.data.project);
            setChosenProject(result.data.project);
        } catch (err) {
            console.log('axios single project call error', err);
        }
       
    }

    return (
        <div>
            {chosenProject &&
            <Box>
                <Box as='h1'>{chosenProject.title}</Box>
                <GridItem justifySelf='center' alignSelf='center' background='pink' width='40%'>

                    <Image src={chosenProject.imageLink}/>

                </GridItem>
            </Box>
            
            }
            
            
            
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
