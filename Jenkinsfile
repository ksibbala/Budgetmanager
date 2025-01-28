pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                // Clone your GitHub repository
                 git branch: 'main', url: 'https://github.com/ksibbala/Budgetmanager.git' 
            }
        }
        
        stage('Run Python Script') {
            steps {
                // Execute the Python script
                sh 'python3 budget_manager.py'
            }
        }
    }
}
