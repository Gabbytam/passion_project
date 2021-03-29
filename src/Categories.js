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
import { motion } from "framer-motion"

import Details from './Details';

const api_key = 'bc212140-0729-4c60-a886-a9b73c05ea49';

function Categories() {
    const [themes, setThemes] = useState([]);
    const [projectId, setProjectId] = useState(0);
    const [open, setOpen] = useState(false);
    const MotionBox = motion(Box);

    useEffect(() => {
        getThemes();
    }, [])

    const boxColor = {
        light: '#1A4645',
        //light: 'rgba(230, 250, 175)',
        dark: '#266867',
    }

    const boxTextColor = {
        dark: 'white',
        light: '#266867',
    }

    const { colorMode, toggleColorMode } = useColorMode();

    const getThemes = async () => {
        try {
            //initial call for 10 can be used for the slot machine
            let result = await axios.get('https://api.globalgiving.org/api/public/projectservice/themes/projects/active/ids?api_key=' + api_key);
            console.log('theme response data', result.data.themes.theme)
            setThemes(result.data.themes.theme);
        } 
        catch(err) {
            console.log('axios call for categories error', err)
        }
    }

    //function that will create elements for each theme with its title(id)
    const displayThemes = () => {
        //map through the themes and create a box for each 
        if(themes.length != 0) {
            return themes.map(theme => (
                // <GridItem width='20vw' height='15vh' paddingRight='1em' paddingLeft='1em' borderWidth='10px' borderColor={boxColor[colorMode]} textColor={boxTextColor[colorMode]} borderRadius='3xl' display='flex' justifyContent='center' alignItems='center' onClick={(e) => displayProject(theme)}>{theme.name}</GridItem>
                <MotionBox width='20vw' height='15vh' paddingRight='1em' paddingLeft='1em' borderWidth='10px' borderColor={boxColor[colorMode]} textColor={boxTextColor[colorMode]} borderRadius='3xl' display='flex' justifyContent='center' alignItems='center' whileHover={{ scale: 1.1 }} onClick={(e) => displayProject(theme)}>{theme.name}</MotionBox>
                // <Button width='20vw' height='15vh' background='none' paddingRight='1em' paddingLeft='1em' borderWidth='10px' borderColor={boxColor[colorMode]} textColor={boxTextColor[colorMode]} borderRadius='3xl' display='flex' justifyContent='center' alignItems='center' onClick={(e) => displayProject(theme)}>{theme.name}</Button>
            ))
        }
    }

    //function that will display the project when the theme is selected, in a popup box
    const displayProject = (theme) => {
        console.log('chosen theme', theme)
        //takes in the selected theme, can access the projects (array of project ids)
        //send the length of array, get random number depending on length, grab project id and do a specific project api call to send to details page
        console.log('length of array',theme.projects.numberFound)
        let randomIndex = Math.floor(Math.random() * theme.projects.numberFound)
        console.log('random index', randomIndex)
        //go back into the array of projects and grab the id 
        let chosenProjectId = theme.projects.project[randomIndex].id;
        console.log('project id', chosenProjectId)
        setProjectId(chosenProjectId);
        setOpen(true);
    }


    return (
        <div>
            <Box as='h1' fontSize='xx-large' mt='3vh'>
                Check Out Projects By Their Category
            </Box>
            <Box as='p'>
                Click on a category to see an afflilated project.
            </Box>
            {open ? 
            <MotionBox><Details projectId = {projectId} setOpen={setOpen}/></MotionBox>
            
            :
            <Grid templateColumns='repeat(4, 1fr)' templateRows='repeat(4, 1fr)' columnGap = {3} rowGap = {5} mt='5vh' mb='5vh'>
                {displayThemes()}
            </Grid>
            }
            
            {/* have a popup window with the project details page */}
            
        </div>
    )
}

export default Categories
