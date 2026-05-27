import { useEffect, useState } from "react"


function App() {

  const [metrics, setMetrics] = useState([])


  useEffect(() => {

    const fetchMetrics = () => {

      fetch("http://127.0.0.1:8000/metrics")

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

    <div>

      <h1>Sentinelle Dashboard</h1>

      {
        metrics.map((metric) => (

          <div key={metric.id}>

            <h3>{metric.hostname}</h3>

            <p>CPU : {metric.cpu}%</p>

            <p>RAM : {metric.ram}%</p>

            <p>Connections : {metric.connections}</p>

            <p>{metric.timestamp}</p>

            <hr />

          </div>

        ))
      }

    </div>
  )
}


export default App