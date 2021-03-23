import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Details from './Details';
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

function Random() {
    const [projectData, setProjectData] = useState([]);
    const [chosenProject, setChosenProject] = useState('');
    const [seeDetails, setSeeDetails] = useState(false);
    const [buttonWords, setButtonWords] = useState(0);
    const showHideWords = ['See', 'Hide'];
    const [run, setRun] = useState(false);

    useEffect(() => {
        getProjects();
    }, [])

    //function that does initial axios call to get projects
    const getProjects = async () => {
        try {
            //initial call for 10 can be used for the slot machine
            let allResult = await axios.get(urlStart + 'all/projects/active?api_key=' + api_key);
            //console.log('grab 10', allResult.data.projects.project)
            setProjectData(allResult.data.projects.project);
            console.log('project data before', projectData)

            //do this call the see how many active projects there are 
            let result = await axios.get(urlStart + 'all/projects/active/ids?api_key=' + api_key);
            let numberOfProjects = result.data.projects.numberFound;
            //call choseRandomProject that will return the id of a random project
            let random = await choseRandomProject(numberOfProjects);
            //do axios call for a specific project 

            //go into result.data.projects.project and grab the id number of the project from the array of all the active projects 
            let projectId = result.data.projects.project[random].id;
            let newUrl = urlStart +'projects/' + projectId + '?api_key=' + api_key;
            let singleResult = await axios.get(newUrl);
            //console.log('chosen project', singleResult);
            setChosenProject(singleResult.data.project);
            let slotProjects = allResult.data.projects.project;
            slotProjects.push(singleResult.data.project);
            setProjectData(slotProjects);


        } 
        catch(err) {
            console.log('axios call for projects error', err)
        }
    }

    console.log('project data AFTER', projectData)

    //function that will pick a project at random and set the chosenProject
    const choseRandomProject = (num) => {
        let randomNum = Math.floor(Math.random() * num);
        return randomNum;
    }

    const handleDetails = () => {
        setSeeDetails(!seeDetails);
        let showHide = buttonWords === 0 ? 1 : 0;
        setButtonWords(showHide);
    }

    //function that will run the set time out for the slot machine 
    const runSlotMachine = () => {
        setRun(true);
        
        //once the slotmachine is done running, display the title and the image, have the see details button appear 

    }

    return (
        <div>
            <Grid background='orange' width='80vw' display='flex' flexDirection='column'>
                <Box as='h1' fontSize='xxx-large'>We will pick a project for you</Box>
                <Box width='50%' height='30vh' background='grey' borderRadius='25px'>
                    {!run ?
                        <Box>
                            <Box as='h1' color='white' fontSize='xxx-large' opacity='.2'>?????</Box>
                            <Box as='h1' color='white' fontSize='xxx-large'>?????</Box>
                            <Box as='h1' color='white' fontSize='xxx-large' opacity='.2'>?????</Box>
                        </Box>
                        :
                        <Box>
                            <Box as='h1' color='white' fontSize='small'>{projectData[0].title}</Box>
                            <Box as='h1' color='white' fontSize='small'>{projectData[1].title}</Box>
                            <Box as='h1' color='white' fontSize='small'>{projectData[2].title}</Box>
                        </Box>
                    }
                    

                </Box>
                <Button onClick={(e) => runSlotMachine()}>Run</Button>
                <Button onClick= {(e) => handleDetails()} w="10vw">{showHideWords[buttonWords]} Details</Button>
                {seeDetails &&
                    <Details project = {chosenProject}/>
                }
            </Grid>
            

        </div>
    )
}

export default Random

//for slot machine:
//first have a function that chooses a random non-profit/project, set that to the chosen project 
//when user clicks the button, have the slot run and land on chosen charity
//allow user to see details 