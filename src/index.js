import Resolver from '@forge/resolver';
import api, { fetch, route } from "@forge/api";

/*
https://jira-velocity-data-processing.herokuapp.com/get-graph/issue_list/1
https://jira-velocity-data-processing.herokuapp.com/get-graph/historical_perf/1
https://jira-velocity-data-processing.herokuapp.com/get-graph/current_perf/1
https://velocitysummary.herokuapp.com/1
https://velocityrad.herokuapp.com/1
*/

const resolver = new Resolver();

/*
========================================================================================================================
1.1 Fetch Main Issue Data from Forge Session and Post to Heroku Backend
========================================================================================================================
*/

resolver.define('fetchIssue', async () => {
  try{
      const url = 'https://jira-velocity-data-processing.herokuapp.com/issue'; // Live version
      const result = await api
      .asUser()
      .requestJira(route `/rest/agile/1.0/board/1/issue`)
      const data = await result.json();

      const response = await fetch(url, {
          // const response = await api.fetch(url, {
          method: 'POST',
          headers: {"Content-Type": "application/json", "Accept": "application/json"},
          body: JSON.stringify(data)});
      return response
    }catch(error){
      console.log(error);
    }
  });

/*
========================================================================================================================
1.2 Fetch Comment, Assignee, Issue Link data from Forge Session and Post to Heroku Backend
========================================================================================================================
*/

resolver.define('fetchSublists', async () => {
  try{
      const url = 'https://jira-velocity-data-processing.herokuapp.com/sublists'; // Live version
      const result = await api
      .asUser()
      .requestJira(route `/rest/agile/1.0/board/1/issue`)
      const data = await result.json();

      const response = await fetch(url, {
          // const response = await api.fetch(url, {
          method: 'POST',
          headers: {"Content-Type": "application/json", "Accept": "application/json"},
          body: JSON.stringify(data)});
      return response
    }catch(error){
      console.log(error);
    }
  });  

/*
========================================================================================================================
2.Fetch Current Performance (BarChart) API
========================================================================================================================
*/  
resolver.define('getBarChart', async () => {
  const url = 'https://jira-velocity-data-processing.herokuapp.com/get-graph/current_perf/1';
  const response = await fetch(url, {
          method: 'GET',
          headers: {"Content-Type": "application/json", "Accept": "*/*"}
        });

  const result = await response.json()
  return result
}
);

/*
========================================================================================================================
3.Fetch Historical Performance (LineChart) API
========================================================================================================================
*/

resolver.define('getLineChart', async () => {
  const url = 'https://jira-velocity-data-processing.herokuapp.com/get-graph/historical_perf/1';
  const response = await fetch(url, {
          method: 'GET',
          headers: {"Content-Type": "application/json", "Accept": "*/*"}
        });

  const result = await response.json()
  return result
}
);


/*
========================================================================================================================
4.Fetch Issue List API
========================================================================================================================
*/
resolver.define('getIssueList', async () => {
  const url = 'https://jira-velocity-data-processing.herokuapp.com/get-graph/issue_list/1';
  const response = await fetch(url, {
          method: 'GET',
          headers: {"Content-Type": "application/json", "Accept": "*/*"}
        });

  const result = await response.json()
  return result
}
);

/*
========================================================================================================================
5.Fetch Summary Board API
========================================================================================================================
*/
resolver.define('getSummaryBoard', async () => {
  const url = 'https://velocitysummary.herokuapp.com/1';
  const response = await fetch(url, {
          method: 'GET',
          headers: {"Content-Type": "application/json", "Accept": "*/*"}
        });

  const result = await response.json()
  return result
}
);

/*
========================================================================================================================
6.Fetch Radar Chart API
========================================================================================================================
*/
resolver.define('getRadarChart', async () => {
  const url = 'https://velocityrad.herokuapp.com/1';
  const response = await fetch(url, {
          method: 'GET',
          headers: {"Content-Type": "application/json", "Accept": "*/*"}
        });

  const result = await response.json()
  return result
}
);

/*
========================================================================================================================
7.API to Generate Individual Issue URL for the IssueList Component
========================================================================================================================
*/

resolver.define('makeIssueURL', async () => {
  try{
    const url = 'https://jira-velocity-data-processing.herokuapp.com/make-issue-url'; // Live version
    const result = await api
    .asUser()
    .requestJira(route `/rest/agile/1.0/board/1/issue`)
    const data = await result.json();

    const response = await fetch(url, {
        method: 'POST',
        headers: {"Content-Type": "application/json", "Accept": "application/json"},
        body: JSON.stringify(data)});
    return response.json();
  }catch(error){
    console.log(error);
  }
}
);

/*
========================================================================================================================
8.Fetch Closed Sprint Data
========================================================================================================================
*/

resolver.define('fetchSprint', async () => {
  try{
      const result = await api
      .asUser()
      .requestJira(route `/rest/agile/1.0/board/1/sprint`)
      const data = await result.json();

      return data;

    }catch(error){
      console.log(error);
    }
  });


export const handler = resolver.getDefinitions();

