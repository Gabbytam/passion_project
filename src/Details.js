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

import { Icon } from '@iconify/react';
import {FaMapMarkerAlt, FaMapMarkedAlt, FaMoneyBillAlt} from 'react-icons/fa';

const urlStart = 'https://api.globalgiving.org/api/public/projectservice/';
const api_key = 'bc212140-0729-4c60-a886-a9b73c05ea49';

function Details({project, projectId, setOpen}) {
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

    console.log('project id from details page', projectId)

    return (
        <div>
            {chosenProject &&
            <Box background='pink' display='flex' flexDirection='column'>
                <Box as='h1' fontSize='x-large'>{chosenProject.title}</Box>
                
                <Box><FaMapMarkedAlt/>{chosenProject.contactCity}, {chosenProject.contactCountry}</Box>
                <Box display='flex'>
                    <Image src={chosenProject.imageLink}/>
                    <Box as='p'>{chosenProject.summary}</Box>
                </Box>

                <Box display='flex' justifyContent='space-evenly'>
                    <Button><a href={chosenProject.projectLink} target='_blank'>Get the Details</a></Button>
                    <Button><a href={chosenProject.contactUrl} target='_blank'>Check out their site</a></Button>
                </Box>
                <FaMoneyBillAlt/> {chosenProject.goal}
                <Button onClick={() => setOpen(false)}>X</Button>

                
            </Box>
            
            }

        </div>
    )
}

export default Details
