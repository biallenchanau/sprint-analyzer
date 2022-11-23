import React, { useEffect, useState } from 'react';
import { invoke } from '@forge/bridge';
import Bar from './components/Bar.js'
import Line from './components/Line.js'
import Radar from './components/Radar.js'
import Summary from './components/Summary.js'
import IssueList from './components/IssueList.js'

async function updateDB(){
    const btnFill = document.getElementById('updatebtn');
    btnFill.innerHTML = 'Updating...';
    try{
        const response = await invoke('fetchIssue');
        console.log("Issue update ended");
    }catch{
        console.log("Issue update timed out");
    };
    try{
        const response1 = await invoke('fetchSublists');
        console.log("Sublists update ended");
    }catch{
        console.log("Sublists update timed out");
    };
    alert("Database Updated! Please refresh the page to update the charts.");
    btnFill.innerHTML = 'Update';
};

function App() {
    useEffect(() => {
        async function fetchData(){
            const sprintData = await invoke('fetchSprint'); // Trigger MongoDB update
            console.log("sprintData", sprintData);
        };
        // fetchData();
        
    }, []);

    return (
        <div>
            <button type="button" onClick={updateDB} id='updatebtn'>Update</button>
            <Summary />
            <IssueList />
            <Radar />
            <Line />
            <Bar />
        </div>
    );
}

export default App;
