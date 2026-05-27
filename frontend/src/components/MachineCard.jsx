function MachineCard({
    metric,
    getUsageColor,
    getBarColor,
    getStatus,
    getMachineStatus,
    fetchMachineHistory
  }) {
  
    return (
  
      <div
        onClick={() => fetchMachineHistory(metric.hostname)}
        className={`bg-slate-900 border rounded-2xl p-6 shadow-lg transition-all duration-300 cursor-pointer hover:scale-[1.02] ${getMachineStatus(metric.status).card}`}
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
    )
  }
  
  export default MachineCard