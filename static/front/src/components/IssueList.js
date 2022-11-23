import React, { useEffect, Component } from "react";
import { invoke } from '@forge/bridge';

async function fetchIssueResult(){
    const issueListResult = await invoke('getIssueList');
    console.log("IssueListResult", issueListResult);    
    return issueListResult
};

function reload(theUrl){
    location.replace(theUrl)
}

function IssueList (){
    var allRows = "<tr style='height: 25px;'><th>Issue Key</th><th>Story Points</th><th>Priority</th><th>No.of Assignee</th><th>Resolution Status</th></tr>";
    const trFill = document.getElementById('issueListTable');

    var issueList = "";

    useEffect(() => {
        async function draw(){
            const data = await fetchIssueResult();
            const issueURLDict = await invoke('makeIssueURL');

            var len = Object.keys(data).length;
            for (let i = 0; i < len; i++){
                var theIssue = Object.values(data)[i];
                var priority_level = "";
                if (theIssue['issue_priority'] == 1){
                    priority_level = "High";
                } else if(theIssue['issue_priority'] == 2){
                    priority_level = "Medium";
                } else{
                    priority_level = "Low";
                }
                var theUrl = JSON.stringify(issueURLDict[theIssue['issue_key']])
                
                var resolveState = "Resolved";
                if (theIssue['resolution_date'] == null){
                    resolveState = "Not Resolved";
                }
                allRows += `<tr style='height: 25px;'><td><a href=${theUrl}>`

                + theIssue['issue_key'] + "</button></td><td>" + theIssue['story_points'] 
                + "</td><td>" + priority_level
                + "</td><td>" + theIssue['number_of_assignees'] 
                + "</td><td>" + resolveState 
                + "</td></tr>";
            }
            trFill.innerHTML = allRows;
            console.log("IssueList Generated")        
        return "completed"};
        issueList = draw();
        
    }, []);


    return (
        ""
    );
};

export default IssueList;
