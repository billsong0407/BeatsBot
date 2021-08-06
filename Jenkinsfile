pipeline {
  agent any

  tools {
    nodejs 'NODEJS'
  }

  environment {
    MANAGER = 'npm'
    DEPLOY = 'heroku'
  }

  stages {
    stage('Config') {
      steps {
        sh "${MANAGER} install jest"
      }
    }
    stage('Test') {
      steps {
        sh "${MANAGER} test"
      }
    }
    stage('Build'){
      steps {
        sh "node index.js"
      }
    }
    stage('Deploy'){
      steps {
        sh "${DEPLOY} deploy"
      }
    }
  }
}