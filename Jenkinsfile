pipeline {
    agent any
    tools {
        python 'Python3'  // Replace 'Python3' with the name of your Python installation
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
