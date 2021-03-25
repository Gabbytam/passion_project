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

const api_key = 'bc212140-0729-4c60-a886-a9b73c05ea49';

function Categories() {
    const [themes, setThemes] = useState([]);

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
        console.log('running display function')
        //map through the themes and create a box for each 
        if(themes.length != 0) {
            return themes.map(theme => (
                <GridItem width='20vw' height='15vh' background='yellow'>{theme.name}</GridItem>
            ))
        }
    }

    return (
        <div>
            <Box as='h1' color='pink'>
                Check out projects by category
            </Box>
            <Grid templateColumns='repeat(4, 1fr)' templateRows='repeat(4, 1fr)' columnGap = {1} rowGap = {5} background='orange'>
              {displayThemes()}
            </Grid>
        </div>
    )
}

export default Categories
