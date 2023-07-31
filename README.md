# Playwright-mottu-test

## About
Project in Playwright framework for Mottu test

## Pre-requisites
* [Node.js](https://nodejs.org/en/download/)
* Any Code Editor like [VSCode](https://code.visualstudio.com/)
* Create .env archive or rename .env.example and set the URL environment correctly and use: "https://todomvc.com/"

## Installation
* Clone this repository  
`$ git clone https://github.com/hnrqbjf/project-test-mottu.git`

*  Access the project folder cmd/terminal  
`$ cd project-test-mottu`  

* Install the dependencies  
`$ npm install` 

* And install playwright  
`$ npx playwright install` 

## Running Tests
#### Running all tests
`$ npm test` 


#### Running test with tag
Before do it, you need to set your tag in test name
```javascript
    test(`FOO TEST @foo`, async({ page }) => {       
        // IMPLEMENTATION
    })
```
then use test-tag script and pass you tag in cmd run   
`$ npm run test-tag @foo`


## Generate Reports
To acess the reports follow the path ./playwright-report and open index.html file.