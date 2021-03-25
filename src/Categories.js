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

import Details from './Details';

const api_key = 'bc212140-0729-4c60-a886-a9b73c05ea49';

function Categories() {
    const [themes, setThemes] = useState([]);
    const [projectId, setProjectId] = useState(0);

    useEffect(() => {
        getThemes();
    }, [])

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
                <GridItem width='20vw' height='15vh' padding='1em' background='yellow' onClick={(e) => displayProject(theme)}>{theme.name}</GridItem>
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
    }


    return (
        <div>
            <Box as='h1'>
                Check out projects by category
            </Box>
            <Box as='p'>
                Click on a category to select a project affiliated with that theme.
            </Box>
            <Grid templateColumns='repeat(4, 1fr)' templateRows='repeat(4, 1fr)' columnGap = {1} rowGap = {5} background='orange'>
              {displayThemes()}
            </Grid>
            {/* have a popup window with the project details page */}
            <Details projectId = {projectId}/>
        </div>
    )
}

export default Categories
