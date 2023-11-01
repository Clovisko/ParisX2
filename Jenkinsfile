pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Checkout your code from your Git repository.
                git(url: 'https://github.com/Clovisko/ParisX2.git', branch: 'main')
            }
        }

        stage('Build and Test Node.js App') {
            steps {
                // Install Node.js and NPM
                sh 'curl -sL https://deb.nodesource.com/setup_14.x | bash -'
                sh 'apt-get install -y nodejs'

                // Navigate to your Node.js application directory
                dir('path/to/your/nodejs/app') {
                    // Install Node.js dependencies
                    sh 'npm install'

                    // Run tests (replace with your specific test command)
                    sh 'npm test'
                }
            }
        }
    }
