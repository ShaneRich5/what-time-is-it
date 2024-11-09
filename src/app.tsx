import { useEffect, useState } from "react"

const TIMER_INTERVAL = 1000

const App = () => {
  const [date, setDate] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date())
    }, TIMER_INTERVAL)

    return () => {
      clearInterval(timer)
    }
  })

  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-5xl font-bold">
        {date.toLocaleTimeString()}
      </h1>
    </div>
  )
}

export default App
