import React, { useEffect, Component } from "react";
import { invoke } from '@forge/bridge';

async function fetchBarResult(){
    const barResult = await invoke('getBarChart');
    console.log("BarResult", barResult);
    return barResult
};

// function Bar (props){
function Bar (){
    var v1 = 0
    var v2 = 0
    var barChart = '';
    useEffect(() => {
        async function draw(){
            const data = await fetchBarResult();
            v1 = data["committed_story_points"]
            v2 = data["delivered_story_points"]
            const barctx = document.getElementById('barChart');
            const barChart = new Chart(barctx, {
                type: 'bar',
                data: {
                    labels: ['Story Points'],
                    datasets: [
                        {
                        label: 'Committed Story Points',
                        // data: [props.value1,props.value2],
                        data: [v1],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 0.2)',
                        ],
                        borderWidth: 1
                        },
                        {
                            label: 'Delivered Story Points',
                            // data: [props.value1,props.value2],
                            data: [v2],
                            backgroundColor: [
                                'rgba(54, 162, 235, 0.2)',
                            ],
                            borderColor: [
                                'rgba(54, 162, 235, 0.2)',
                            ],
                            borderWidth: 1
                            },
                    ],
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    },
                    plugins: {
                        title: {
                            display: true,
                            text: 'Current Team Performance',
                            padding: {
                                top: 40,
                                bottom: 10
                            },
                            fontSize: 18
                        },
                        legend: {
                            display: true,
                            position: 'bottom'
                        }
                    }
                }
            });
            console.log("Draw completed")        
        return barChart};
        barChart = draw();
        
    }, []);


    return (
        <div>
            {barChart}
        </div>
        );
};

export default Bar;
