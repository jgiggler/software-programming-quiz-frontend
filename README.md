# software-programming-quiz-frontend
CS 467 Capstone Project

To run the frontend, you will need to do a few things 

1. Git clone on this repository and make sure you `cd quiz-frontend` in your terminal so that the main quiz-frontend folder is your working directory.

2. If on Windows, then you need to make sure you have Node and NPM installed. You can do this with the following commands directly from the nodejs.org website: 

    `winget install Schniz.fnm` # installs fnm (Fast Node Manager)
   
    `fnm env --use-on-cd | Out-String | Invoke-Expression` # configure fnm environment
   
   `fnm use --install-if-missing 20` # download and install Node.js
   
   `node -v` # should print `v20.16.0` # verifies the right Node.js version is in the environment
   
    `npm -v` # should print `10.8.1` # verifies the right npm version is in the environment

2. Run `npm install` to install all of the dependencies. 

3. Run `npm run dev`

4. The terminal will show Vite running and will have a link to "http://localhost:5173/" which is the default port that we've set. 

5. Deploy the backend (see https://github.com/jgiggler/software-programming-quiz-backend)

6. You should now be able to access and interact with the website on http://localhost:5173/