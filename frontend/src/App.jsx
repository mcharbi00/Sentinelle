import { useEffect, useState } from "react"
import "./index.css"

import MachineCard from "./components/MachineCard"
import MachineHistory from "./components/MachineHistory"

function App() {

  const [metrics, setMetrics] = useState([])

  const [selectedMachine, setSelectedMachine] = useState(null)

  const [machineHistory, setMachineHistory] = useState([])


  useEffect(() => {

    const fetchMetrics = () => {

      fetch("http://127.0.0.1:8000/latest-metrics")

        .then((response) => response.json())

        .then((data) => {

          setMetrics(data)

        })
    }


    fetchMetrics()


    const interval = setInterval(fetchMetrics, 5000)


    return () => clearInterval(interval)

  }, [])
  useEffect(() => {

    if (!selectedMachine) {
      return
    }
  
  
    const fetchHistory = () => {
  
      fetch(`http://127.0.0.1:8000/metrics/${selectedMachine}`)
  
        .then((response) => response.json())
  
        .then((data) => {
  
          setMachineHistory(data)
  
        })
    }
  
  
    fetchHistory()
  
  
    const interval = setInterval(fetchHistory, 5000)
  
  
    return () => clearInterval(interval)
  
  }, [selectedMachine])

  const fetchMachineHistory = (hostname) => {

    fetch(`http://127.0.0.1:8000/metrics/${hostname}`)

      .then((response) => response.json())

      .then((data) => {

        setMachineHistory(data)

        setSelectedMachine(hostname)

      })
  }


  const getUsageColor = (value) => {

    if (value >= 80) {
      return "text-red-500"
    }

    if (value >= 50) {
      return "text-orange-400"
    }

    return "text-green-400"
  }


  const getBarColor = (value) => {

    if (value >= 80) {
      return "bg-red-500"
    }

    if (value >= 50) {
      return "bg-orange-400"
    }

    return "bg-green-500"
  }


  const getStatus = (cpu, ram) => {

    if (cpu >= 80 || ram >= 80) {

      return {
        label: "Critical",
        color: "bg-red-500"
      }
    }


    if (cpu >= 50 || ram >= 50) {

      return {
        label: "Warning",
        color: "bg-orange-400"
      }
    }


    return {
      label: "Healthy",
      color: "bg-green-500"
    }
  }


  const getMachineStatus = (status) => {

    if (status === "offline") {

      return {
        badge: "bg-red-500",
        card: "opacity-60 border-red-500/40",
        label: "OFFLINE"
      }
    }


    return {
      badge: "bg-green-500",
      card: "border-slate-800",
      label: "ONLINE"
    }
  }


  return (

    <div className="min-h-screen bg-slate-950 text-white p-8">

      <h1 className="text-4xl font-bold mb-4">
        Sentinelle Dashboard
      </h1>


      <div className="flex gap-6 mb-8">

        <div className="bg-slate-900 px-4 py-3 rounded-xl border border-slate-800">

          <p className="text-slate-400 text-sm">
            Machines actives
          </p>

          <p className="text-2xl font-bold">
            {metrics.length}
          </p>

        </div>


        <div className="bg-slate-900 px-4 py-3 rounded-xl border border-slate-800">

          <p className="text-slate-400 text-sm">
            Refresh
          </p>

          <p className="text-2xl font-bold">
            5s
          </p>

        </div>

      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {
          metrics.map((metric) => (

            <MachineCard
              key={metric.id}
              metric={metric}
              getUsageColor={getUsageColor}
              getBarColor={getBarColor}
              getStatus={getStatus}
              getMachineStatus={getMachineStatus}
              fetchMachineHistory={fetchMachineHistory}
            />

          ))
        }

      </div>


      <MachineHistory
        selectedMachine={selectedMachine}
        machineHistory={machineHistory}
        setSelectedMachine={setSelectedMachine}
        setMachineHistory={setMachineHistory}
      />

    </div>
  )
}

export default App