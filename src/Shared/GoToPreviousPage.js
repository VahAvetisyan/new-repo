import React from "react"
import {Route, Link, Routes, useNavigate} from "react-router-dom"

export default function GoToPreviousPage() {
  return window.history.back()
}

// function About() {
//   return (
//     <>
//       <button onClick={goBack}>Back</button>
//       <p>About Page</p>
//     </>
//   )
// }
