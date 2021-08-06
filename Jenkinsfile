pipeline {
  agent any 
  environment {
      MANAGER = 'npm' 
      DEPLOY = 'heroku'
  }
  tools {
    nodejs "NODEJS"
  }
  stages {
    stage('build'){
        steps{
            sh "${MANAGER} install"
        }
    }
  }
}