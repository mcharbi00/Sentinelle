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


  return (

    <div className="min-h-screen bg-slate-950 text-white p-8">
  
      <h1 className="text-4xl font-bold mb-8">
        Sentinelle Dashboard
      </h1>
  
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  
        {
          metrics.map((metric) => (
  
            <div
              key={metric.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg"
            >
  
              <div className="flex items-center justify-between mb-4">
  
                <h2 className="text-xl font-semibold">
                  {metric.hostname}
                </h2>
  
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
  
              </div>
  
  
              <div className="space-y-3">
  
                <div>
  
                  <p className="text-sm text-slate-400">
                    CPU
                  </p>
  
                  <p className="text-lg font-medium">
                    {metric.cpu}%
                  </p>
  
                </div>
  
  
                <div>
  
                  <p className="text-sm text-slate-400">
                    RAM
                  </p>
  
                  <p className="text-lg font-medium">
                    {metric.ram}%
                  </p>
  
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
  
                  {metric.timestamp}
  
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