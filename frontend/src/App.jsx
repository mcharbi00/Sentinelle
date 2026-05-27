import { useEffect, useState } from "react"
import "./index.css"

function App() {

  const [metrics, setMetrics] = useState([])


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
  
            <div
              key={metric.id}
              className={`bg-slate-900 border rounded-2xl p-6 shadow-lg transition-all duration-300 ${getMachineStatus(metric.status).card}`}
  >
  
              <div className="flex items-center justify-between mb-6">
  
                <h2 className="text-xl font-semibold">
                  {metric.hostname}
                </h2>
  
                <div className={`px-3 py-1 rounded-full text-sm font-medium text-white ${getStatus(metric.cpu, metric.ram).color}`}>
                  {getStatus(metric.cpu, metric.ram).label}
                </div>
  
              </div>
  
  
              <div className="space-y-5">
  
                <div>
  
                  <div className="flex justify-between mb-1">
  
                    <p className="text-sm text-slate-400">
                      CPU
                    </p>
  
                    <p className={`font-semibold ${getUsageColor(metric.cpu)}`}>
                      {metric.cpu}%
                    </p>
  
                  </div>
  
  
                  <div className="w-full bg-slate-700 rounded-full h-2">
  
                    <div
                      className={`h-2 rounded-full ${getBarColor(metric.cpu)}`}
                      style={{ width: `${metric.cpu}%` }}
                    ></div>
  
                  </div>
  
                </div>
  
  
                <div>
  
                  <div className="flex justify-between mb-1">
  
                    <p className="text-sm text-slate-400">
                      RAM
                    </p>
  
                    <p className={`font-semibold ${getUsageColor(metric.ram)}`}>
                      {metric.ram}%
                    </p>
  
                  </div>
  
  
                  <div className="w-full bg-slate-700 rounded-full h-2">
  
                    <div
                      className={`h-2 rounded-full ${getBarColor(metric.ram)}`}
                      style={{ width: `${metric.ram}%` }}
                    ></div>
  
                  </div>
  
                </div>
  
  
                <div>
  
                  <p className="text-sm text-slate-400">
                    Connections
                  </p>
  
                  <p className="text-lg font-medium">
                    {metric.connections}
                  </p>
  
                </div>
  
  
                <div className="pt-3 text-sm text-slate-500">
  
                  {new Date(metric.timestamp).toLocaleTimeString()}
  
                </div>
  
              </div>
  
            </div>
  
          ))
        }
  
      </div>
  
    </div>
  )
}


export default App