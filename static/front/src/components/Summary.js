import React, { useEffect, Component } from "react";
import { invoke } from '@forge/bridge';

async function fetchSummaryResult(){
    const summaryResult = await invoke('getSummaryBoard');
    console.log("SummaryBoard", summaryResult);    
    return summaryResult
};

function Summary (){
    var complexity_level = "";
    var overall_sentiment = "";
    var prediction = 0 // velocity difference
    var total_sp = 0 // committed story points
    var summaryBoard = "";
    
    useEffect(() => {
        async function draw(){
            const data = await fetchSummaryResult();
            complexity_level = data["complexity_level"];
            overall_sentiment = data["overall_sentiment"];
            prediction = data["prediction"];
            total_sp = data["total_story_points"];

            
            document.getElementById('prediction').value = prediction;
            let outputColor = document.querySelector('#prediction');
            if (prediction > 0){
                document.getElementById('prediction').value += '  [Above Target]' ;
                outputColor.style.color = "blue" ;
            }else if (prediction < 0){
                document.getElementById('prediction').value += '  [Below Target]';
                outputColor.style.color = "red" ;
            }else{
                document.getElementById('prediction').value += '  [On Target]';
                outputColor.style.color = "blue" ;
            }
            
            document.getElementById('totalSP').value = total_sp;
            document.getElementById('complexityLevel').value = complexity_level;
            document.getElementById('overallSentiment').value = overall_sentiment;
            
            console.log("SummaryBoard generated")        
        return "completed"};
        summaryBoard = draw();
        
    }, []);


    return (
        ""
    );
};

export default Summary;
