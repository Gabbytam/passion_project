import React from 'react'

function Details({project}) {
    return (
        <div>
            <h1>{project.title}</h1>
            <img src={project.imageLink}></img>
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
