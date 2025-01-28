import docker
import subprocess
from kubernetes import client, config

def build_and_push_images():
    client = docker.from_env()
    images = {
        "frontend": "ksibbala04/frontend:v1",
        "backend": "ksibbala/backend:v1",
    }
    for name, image in images.items():
        print(f"Building {name}...")
        client.images.build(path=f"./{name}", tag=image)
        print(f"Pushing {image}...")
        client.images.push(image)
        print(f"{image} pushed successfully!")

def apply_k8s_manifests():
    manifests = [
        "k8s/frontend-deploy.yaml",
        "k8s/backend-deploy.yaml",
        "k8s/db-deploy.yaml",
        "k8s/frontend-service.yaml",
        "k8s/backend-service.yaml",
        "k8s/db-service.yaml",
    ]
    for manifest in manifests:
        print(f"Applying {manifest}...")
        result = subprocess.run(["kubectl", "apply", "-f", manifest], capture_output=True, text=True)
        if result.returncode == 0:
            print(f"Successfully applied {manifest}")
        else:
            print(f"Error applying {manifest}:\n{result.stderr}")

def check_pod_status(namespace="default"):
    config.load_kube_config()
    v1 = client.CoreV1Api()
    pods = v1.list_namespaced_pod(namespace=namespace)
    for pod in pods.items:
        print(f"Pod {pod.metadata.name} is in {pod.status.phase} phase.")

if __name__ == "__main__":
    print("Starting automation...")
    build_and_push_images()
    apply_k8s_manifests()
    print("Checking pod status...")
    check_pod_status()
    print("Automation complete.")
