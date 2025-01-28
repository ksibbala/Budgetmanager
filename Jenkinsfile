pipeline {
    agent any
    
    environment {
        FRONTEND_IMAGE = 'ksibbala04/frontend:v1'
        BACKEND_IMAGE = 'ksibbala04/backend:v1'
        PATH = "/usr/local/bin:$PATH" 
    }
    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/ksibbala/Budgetmanager.git'  // Replace with your repo URL
            }
        }
        stage('Build Frontend Docker Image') {
            steps {
                script {
                    sh 'docker --version'
                    // Build Docker image for Frontend
                    sh 'docker build -t $FRONTEND_IMAGE ./frontend'  // Assuming frontend Dockerfile is in the "frontend" directory
                }
            }
        }
        stage('Build Backend Docker Image') {
            steps {
                script {
                    // Build Docker image for Backend
                    sh 'docker build -t $BACKEND_IMAGE ./backend'  // Assuming backend Dockerfile is in the "backend" directory
                }
            }
        }
        stage('Push Docker Images') {
            steps {
                script {
                    // Push Docker images to Docker registry
                    sh 'docker push $FRONTEND_IMAGE'
                    sh 'docker push $BACKEND_IMAGE'
                }
            }
        }
        stage('Deploy to Kubernetes') {
            steps {
                script {
                    // Apply Kubernetes deployments for frontend, backend, and DB
                    sh 'kubectl apply -f K8s/frontend-deploy.yaml'
                    sh 'kubectl apply -f K8s/backend-deploy.yaml'
                    
                    // Apply the services for frontend, backend, and DB
                    sh 'kubectl apply -f kubernetes/frontend-service.yaml'
                    sh 'kubectl apply -f kubernetes/backend-service.yaml'
                    sh 'kubectl apply -f kubernetes/db-deploy.yaml'  // Using the MongoDB Docker image from Docker Hub
                    sh 'kubectl apply -f kubernetes/db-service.yaml'
                }
            }
        }
        stage('Verify Deployment') {
            steps {
                script {
                    // Verify that all deployments are running in Kubernetes
                    sh "kubectl get pods"
                }
            }
        }
    }
    post {
        always {
            cleanWs()  // Clean workspace after build
        }
        success {
            echo 'Deployment to Kubernetes succeeded!'
        }
        failure {
            echo 'Deployment to Kubernetes failed.'
        }
    }
}
