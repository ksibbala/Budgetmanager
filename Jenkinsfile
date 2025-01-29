pipeline {
    agent any
    environment {
            PATH = "/opt/homebrew/bin:$PATH"  // Add Homebrew's Python path
        }
    stages {
        stage('Checkout') {
            steps {
                git branch: python, url: 'https://github.com/ksibbala/Budgetmanager.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'pip3 install docker kubernetes'  // Install docker module
            }
        }

        stage('Run Python Script') {
            steps {
                sh 'python3 budget_manager.py'  // Run the Python script
            }
        }
    }
}
