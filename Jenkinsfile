pipeline {
  agent any
    
  tools {nodejs "node"}
    
  stages {
        
    stage('Git') {
      steps {
        git 'https://github.com/Clovisko/ParisX2.git'
      }
    }
     
    stage('Build') {
      steps {
        sh 'npm install'
         sh '<<npm run Build>>'
      }
    }  
    
            
    stage('Test') {
      steps {
        sh 'node test'
      }
    }
  }
}
