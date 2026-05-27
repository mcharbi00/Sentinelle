import socket
import time

import psutil
import requests

from dotenv import load_dotenv


load_dotenv()


INTERVAL = int(os.getenv("AGENT_INTERVAL", 5))
while True:

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

    try:

        response = requests.post(
            "http://127.0.0.1:8000/metrics",
            json=payload
        )

        print("metrics sent :", response.status_code)

    except requests.ConnectionError:

        print("backend unreachable")

    time.sleep(INTERVAL)