pipeline {
  agent any
  stages {
    stage('build') {
      steps {
        sh "${MANAGER} install"
      }
    }

    stage('test') {
      steps {
        sh 'npm test'
      }
    }

  }
  tools {
    nodejs 'NODEJS'
  }
  environment {
    MANAGER = 'npm'
    DEPLOY = 'heroku'
  }
}