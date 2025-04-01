"use client"

import { useState, useEffect } from "react"
import { Calendar, CheckCircle, Clock, Percent, Calculator, AlertCircle, CheckCheck, XCircle } from "lucide-react"

export default function AttendanceCalculator() {
  const [totalDays, setTotalDays] = useState(0)
  const [attendedDays, setAttendedDays] = useState(0)
  const [minAttendance, setMinAttendance] = useState(75)
  const [remainingDays, setRemainingDays] = useState(0)
  const [requiredDays, setRequiredDays] = useState(null)
  const [currentPercentage, setCurrentPercentage] = useState(0)
  const [resultType, setResultType] = useState("") // "success", "warning", or "error"

  useEffect(() => {
    if (totalDays > 0) {
      const percentage = (attendedDays / totalDays) * 100
      setCurrentPercentage(Math.round(percentage * 10) / 10)
    } else {
      setCurrentPercentage(0)
    }
  }, [totalDays, attendedDays])

  const calculateAttendance = () => {
    if (totalDays <= 0) {
      setRequiredDays("Please enter a valid number of total days")
      setResultType("error")
      return
    }

    const requiredAttendance = (minAttendance / 100) * totalDays
    const daysNeeded = Math.ceil(requiredAttendance - attendedDays)

    if (daysNeeded <= 0) {
      setRequiredDays("You already meet the attendance criteria! You nerd 😏")
      setResultType("success")
    } else if (daysNeeded > remainingDays) {
      setRequiredDays(`Not possible to meet ${minAttendance}% attendance with ${remainingDays} remaining days. I'm sorry dawg 😔`)
      setResultType("error")
    } else {
      setRequiredDays(`You need to attend at least ${daysNeeded} more days. You got this! 💪`)
      setResultType("warning")
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full border border-slate-200">
        <h2 className="text-2xl font-bold text-center mb-6 text-slate-800 flex items-center justify-center gap-2">
          <Calendar className="h-6 w-6 text-primary" />
          Attendance Calculator
        </h2>

        {/* Current attendance display */}
        <div className="mb-6 bg-slate-50 p-4 rounded-xl">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-slate-600">Current Attendance</span>
            <span className="text-lg font-bold text-slate-800">{currentPercentage}%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2.5">
            <div
              className={`h-2.5 rounded-full ${
                currentPercentage >= minAttendance
                  ? "bg-emerald-500"
                  : currentPercentage >= minAttendance * 0.9
                    ? "bg-amber-500"
                    : "bg-rose-500"
              }`}
              style={{ width: `${Math.min(currentPercentage, 100)}%` }}
            ></div>
          </div>
          <div className="flex justify-end mt-1">
            <span className="text-xs text-slate-500">Target: {minAttendance}%</span>
          </div>
        </div>

        <div className="space-y-4">
          {/* Input fields */}
          <div className="relative">
            <label className="text-sm font-medium text-slate-700 mb-1 block">Total Working Days</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Calendar className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="number"
                className="w-full pl-10 p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                placeholder="Enter total days"
                value={totalDays || ""}
                onChange={(e) => setTotalDays(Number(e.target.value))}
              />
            </div>
          </div>

          <div className="relative">
            <label className="text-sm font-medium text-slate-700 mb-1 block">Days Attended</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <CheckCircle className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="number"
                className="w-full pl-10 p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                placeholder="Enter attended days"
                value={attendedDays || ""}
                onChange={(e) => setAttendedDays(Number(e.target.value))}
              />
            </div>
          </div>

          <div className="relative">
            <label className="text-sm font-medium text-slate-700 mb-1 block">Remaining Working Days</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Clock className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="number"
                className="w-full pl-10 p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                placeholder="Enter remaining days"
                value={remainingDays || ""}
                onChange={(e) => setRemainingDays(Number(e.target.value))}
              />
            </div>
          </div>

          <div className="relative">
            <label className="text-sm font-medium text-slate-700 mb-1 block">Minimum Attendance Required (%)</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Percent className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="number"
                className="w-full pl-10 p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                placeholder="Enter minimum percentage"
                value={minAttendance || ""}
                onChange={(e) => setMinAttendance(Number(e.target.value))}
              />
            </div>
          </div>

          <button
            onClick={calculateAttendance}
            className="w-full bg-black hover:scale-105 duration-200 text-white font-semibold py-3 mt-4 rounded-lg flex items-center justify-center gap-2"
          >
            <Calculator className="h-5 w-5" />
            Calculate Attendance
          </button>
        </div>

        {/* Result display */}
        {requiredDays && (
          <div
            className={`mt-6 p-4 rounded-lg flex items-start gap-3 ${
              resultType === "success"
                ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                : resultType === "warning"
                  ? "bg-amber-50 text-amber-800 border border-amber-200"
                  : "bg-rose-50 text-rose-800 border border-rose-200"
            }`}
          >
            {resultType === "success" ? (
              <CheckCheck className="h-5 w-5 mt-0.5 flex-shrink-0" />
            ) : resultType === "warning" ? (
              <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
            ) : (
              <XCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
            )}
            <p className="font-medium">{requiredDays}</p>
          </div>
        )}
      </div>
    </div>
  )
}

