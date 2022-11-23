import React, { useEffect, Component } from "react";
import { invoke } from '@forge/bridge';

async function fetchRadarResult(){
    const radarResult = await invoke('getRadarChart');
    console.log("RadarResult", radarResult);    
    return radarResult
};

function Radar (){
    var artifacts_score = 0;
    var blockers_score = 0;
    var impact_score = 0;
    var problem_score = 0;
    var efficiency_score = 0;
    var radarChart = '';

    useEffect(() => {
        async function draw(){
            const data = await fetchRadarResult();
            const dataList = [];
            artifacts_score = data["artifacts"];
            blockers_score = data["blockers"];
            impact_score = data["issue_impact"];
            problem_score = data["problem_solving"];
            efficiency_score = data["team_efficiency"]
            dataList.push(artifacts_score, blockers_score, impact_score, problem_score, efficiency_score);

            const radarctx = document.getElementById('radarChart');
            const radarChart = new Chart(radarctx, {
                type: 'radar',
                data: {
                    labels: ['Artifacts', 'Blockers', 'Issue Impact', 'Problem Solving', 'Team Efficiency'],
                    datasets: [
                        {
                          label: 'Sentiment Score by Category',
                          data: dataList,
                          backgroundColor: "rgba(255, 99, 132, 0.5)",
                          borderColor: [
                              'rgba(255, 99, 132, 1)',
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
                            text: 'Sentiment Scores',
                            padding: {
                                top: 20,
                                bottom: 10
                            },
                            fontSize: 18
                        },
                        legend: {
                            display: false,
                            position: 'right'
                        }
                    }
                }
            });
            console.log("Draw completed")        
        return radarChart};
        radarChart = draw();
        
    }, []);


    return (
        <div>
            {radarChart}
        </div>
        );
};

export default Radar;
