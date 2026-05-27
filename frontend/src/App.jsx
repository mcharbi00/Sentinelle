import { useEffect, useState } from "react"
import "./App.css"

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

    <div className="container">
  
      <h1 className="title">
        Sentinelle Dashboard
      </h1>
  
      <div className="grid">
  
        {
          metrics.map((metric) => (
  
            <div className="card" key={metric.id}>
  
              <h2>{metric.hostname}</h2>
  
              <p className="metric">
                CPU : {metric.cpu}%
              </p>
  
              <p className="metric">
                RAM : {metric.ram}%
              </p>
  
              <p className="metric">
                Connections : {metric.connections}
              </p>
  
              <p className="metric">
                {metric.timestamp}
              </p>
  
            </div>
  
          ))
        }
  
      </div>
  
    </div>
  )
}


export default App