function MachineHistory({
    selectedMachine,
    machineHistory,
    setSelectedMachine,
    setMachineHistory
  }) {
  
    if (!selectedMachine) {
      return null
    }
  
  
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