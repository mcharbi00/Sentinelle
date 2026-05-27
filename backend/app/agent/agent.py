import socket
import psutil
import requests


hostname = socket.gethostname()

cpu = psutil.cpu_percent(interval=1)

ram = psutil.virtual_memory().percent


try:
    connections = len(psutil.net_connections())

except psutil.AccessDenied:
    connections = 0


payload = {
    "hostname": hostname,
    "cpu": cpu,
    "ram": ram,
    "connections": connections
}


response = requests.post(
    "http://127.0.0.1:8000/metrics",
    json=payload
)


print(response.json())