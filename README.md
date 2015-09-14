# Launch & Learn
### [![Build Status](https://snap-ci.com/asifrc/launchandlearn/branch/master/build_image)](https://snap-ci.com/asifrc/launchandlearn/branch/master)

Launch & Learn abstracts away the launch of AWS CloudFormation templates. Easily provide fresh environments to your workshop participants with a click of a button.

## Development
### Resources
 - [Trello Board](https://trello.com/b/d2tCoZGp/launch-learn)
 - [Snap CI Build](https://snap-ci.com/asifrc/launchandlearn/branch/master)
 - [Production Environment](http://launchandlearn.herokuapp.com/)

### Requirements
_(Vagrantfile is [on its way](https://trello.com/c/t2z971Mg))_
 - Node.js
 - MongoDB
 - AWS Secret & Access Key
    - You should use an AIM user instead of root
    - Needs full permission to EC2 and CloudFront

### Getting Started


  1. Load AWS Credentials into environment variables: `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`
  2. Start MongoDB
  3. `npm install` to install dependencies
  4. `npm start` to run application (I prefer nodemon for development with `nodemon bin/www`)
  
### Running Tests
... tests? Will be setting up mocha and istanbul [one day](https://trello.com/c/Xp5IPEaU)