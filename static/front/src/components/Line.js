import React, { useEffect, Component } from "react";
import { invoke } from '@forge/bridge';

async function fetchLineResult(){
    const lineResult = await invoke('getLineChart');
    console.log("lineResult", lineResult);
    return lineResult
};

function Line (){
    const sprintList = [];
    // const committedDaysList = [];
    // const actualDaysList = [];
    const committedSPList = [];
    const actualSPList = [];
    var lineChart = '';

    useEffect(() => {
        async function draw(){
            // const fetchDataBase = await invoke('fetchIssue'); // Trigger MongoDB update
            const data = await fetchLineResult();
            var len = Object.keys(data).length;
            console.log("Data Length", len);
            for (let i = 0; i < len; i++){
                // data[0] is "undefined". Useful sprint information starts from i == 1
                sprintList.push(data[i+1]['name'])
                committedSPList.push(data[i+1]['committed_sp'])
                actualSPList.push(data[i+1]['actual_sp'])
                // committedDaysList.push(data[i+1]['committed_days'])
                // actualDaysList.push(data[i+1]['actual_days'])
            }

            const linectx = document.getElementById('lineChart');
            const lineChart = new Chart(linectx, {
                type: 'line',
                data: {
                    labels: sprintList,
                    datasets: [
                        {
                            label: 'Committed Story Points',
                            data: committedSPList,
                            fill: false,
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            yAxisID: 'y',
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                            ],
                        },
                        {
                            label: 'Delivered Story Points',
                            data: actualSPList,
                            fill: false,
                            backgroundColor: 'rgba(54, 162, 235, 0.2)',
                            yAxisID: 'y',
                            borderColor: [
                              'rgba(54, 162, 235, 1)',
                            ],
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
                            text: 'Historical Performance',
                            padding: {
                                top: 40,
                                bottom: 10
                            },
                        },
                        legend: {
                            display: true,
                            position: 'bottom'
                        }
                    }
                }
            });

            console.log("Draw completed")        
        return lineChart};
        lineChart = draw();
        
    }, []);


    return (
        <div>
            {lineChart}
        </div>
        );
};

export default Line;
