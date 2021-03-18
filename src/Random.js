import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Details from './Details';

const api_key = 'bc212140-0729-4c60-a886-a9b73c05ea49';

function Random() {
    const [projectData, setProjectData] = useState([]);
    const [chosenProject, setChosenProject] = useState('');

    useEffect(() => {
        getProjects();
    }, [])

    //function that does initial axios call to get projects
    const getProjects = async () => {
        try {
            let result = await axios.get('https://api.globalgiving.org/api/public/projectservice/all/projects/active?api_key=' + api_key);
            console.log(result.data)
            setProjectData(result.data);
            //call choseRandomProject
            choseRandomProject();
        } 
        catch(err) {
            console.log('axios call for projects error', err)
        }
    }

    //function that will pick a project at random and set the chosenProject
    const choseRandomProject = () => {
        let randomNum = Math.floor(Math.random() * 10);

    }

    return (
        <div>
            <h1>Randomized donation</h1>
            <button>See Details</button>
            <Details project = {chosenProject}/>
            
        </div>
    )
}

export default Random

//for slot machine:
//first have a function that chooses a random non-profit/project, set that to the chosen project 
//when user clicks the button, have the slot run and land on chosen charity
//allow user to see details 