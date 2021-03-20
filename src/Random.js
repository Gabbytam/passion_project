import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Details from './Details';

const urlStart = 'https://api.globalgiving.org/api/public/projectservice/';
const api_key = 'bc212140-0729-4c60-a886-a9b73c05ea49';

function Random() {
    const [projectData, setProjectData] = useState([]);
    const [chosenProject, setChosenProject] = useState('');
    const [seeDetails, setSeeDetails] = useState(false);
    const [buttonWords, setButtonWords] = useState(0);
    const showHideWords = ['See', 'Hide'];

    useEffect(() => {
        getProjects();
    }, [])

    //function that does initial axios call to get projects
    const getProjects = async () => {
        try {
            //initial call for 10 can be used for the slot machine
            // let result = await axios.get(urlStart + 'all/projects/active?api_key=' + api_key);
            // console.log(result.data)
            // setProjectData(result.data);
            // //call choseRandomProject
            // choseRandomProject();

            //do this call the see how many active projects there are 
            let result = await axios.get(urlStart + 'all/projects/active/ids?api_key=' + api_key);
            console.log(result.data.projects)
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
        } 
        catch(err) {
            console.log('axios call for projects error', err)
        }
    }

    //function that will pick a project at random and set the chosenProject
    const choseRandomProject = (num) => {
        let randomNum = Math.floor(Math.random() * num);
        return randomNum;
    }

    console.log('chosen project', chosenProject);

    const handleDetails = () => {
        setSeeDetails(!seeDetails);
        let showHide = buttonWords === 0 ? 1 : 0;
        setButtonWords(showHide);
    }

    return (
        <div>
            <h1>Randomized donation</h1>
            <button onClick= {(e) => handleDetails()}>{showHideWords[buttonWords]} Details</button>
            {seeDetails &&
                <Details project = {chosenProject}/>
            }
            
            
        </div>
    )
}

export default Random

//for slot machine:
//first have a function that chooses a random non-profit/project, set that to the chosen project 
//when user clicks the button, have the slot run and land on chosen charity
//allow user to see details 