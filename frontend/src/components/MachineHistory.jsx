import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Legend
  } from "recharts"

function MachineHistory({
    selectedMachine,
    machineHistory,
    setSelectedMachine,
    setMachineHistory
  }) {
  
    if (!selectedMachine) {
      return null
    }
    
    const chartData = machineHistory
    .slice(-20)
    .map((metric) => {
  return {

    time: new Date(metric.timestamp).toLocaleTimeString(),

    cpu: metric.cpu,

    ram: metric.ram

  }
})
  
    return (
  
      <div className="mt-10 bg-slate-900 border border-slate-800 rounded-2xl p-6">
  
        <div className="flex items-center justify-between mb-6">
  
          <h2 className="text-2xl font-bold">
            Historique — {selectedMachine}
          </h2>
  
  
          <button
            onClick={() => {
              setSelectedMachine(null)
              setMachineHistory([])
            }}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
          >
            Fermer
          </button>
  
        </div>
  
        <div className="h-80 mb-8">

  <ResponsiveContainer width="100%" height="100%">

    <LineChart data={chartData}>

    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />

    <Legend />

      <XAxis dataKey="time"  stroke="#94a3b8"  />

      <YAxis stroke="#94a3b8"  />

      <Tooltip />


      <Line
        type="monotone"
        dataKey="cpu"
        stroke="#22c55e"
        strokeWidth={2}
      />


      <Line
        type="monotone"
        dataKey="ram"
        stroke="#3b82f6"
        strokeWidth={2}
      />

    </LineChart>

  </ResponsiveContainer>

</div>
        <div className="space-y-4">
  
          {
            machineHistory.map((metric) => (
  
              <div
                key={metric.id}
                className="bg-slate-800 rounded-xl p-4 border border-slate-700"
              >
  
                <div className="flex justify-between">
  
                  <div>
  
                    <p>CPU : {metric.cpu}%</p>
  
                    <p>RAM : {metric.ram}%</p>
  
                    <p>Connections : {metric.connections}</p>
  
                  </div>
  
  
                  <div className="text-slate-400 text-sm">
  
                    {new Date(metric.timestamp).toLocaleString()}
  
                  </div>
  
                </div>
  
              </div>
  
            ))
          }
  
        </div>
  
      </div>
    )
  }
  
  export default MachineHistory