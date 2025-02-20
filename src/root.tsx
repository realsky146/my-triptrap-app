import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import App from './App'
import Home from './page/Home/home/home'

const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  )
}

export default Root
