# SprintAnalyser
## Login Guide

This plugin can directly be used by loggin into our JIRA demo project panel with the following credentials:

1.Login Information
Login url: https://id.atlassian.com/login
Project Board: https://velocitypredictor.atlassian.net/jira/software/projects/CG3/boards/1
Username: vpredicttest@gmail.com
Password: velocity123


2.Click the Sprint Analyzer tab on the side menu to view the plugin in production environment, or
Click the Sprint Analyzer Dev tab on the side menu to view the plugin in development environment (where the latest updates will be tested before deploying to production).

3.To make changes of the project:
1) Go to project panel and make relevant to desired issues;
2) Go back to the plugin panel and click "Update" button and wait for the update to be finished;
3) Refresh the webpage after the update alert window is displayed.

## Development Guide

See [Set up Forge](https://developer.atlassian.com/platform/forge/set-up-forge/) for instructions to get set up.

## Quick start

1. Run `forge login` to login to the CLI, or
2. Run `forge register` to register a new copy of this app to your developer account.
3. `cd sprint-analyzer/static/front`.
4. Run `npm install` to install your dependencies.
5. Run `npm run build` to build the assets.
6. Navigate back to the top-level directory of the app (sprint-analyzer folder). 
7. Run `forge deploy` to deploy the app into the default environment.
8. Run `forge install` and follow the prompts to install the app.


## License

Copyright (c) 2020 Atlassian and others.
Apache 2.0 licensed, see [LICENSE](LICENSE) file.
