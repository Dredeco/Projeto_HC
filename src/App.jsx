import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom"

import Home from "./components/pages/Home"
import Contact from "./components/pages/Contact"
import Company from "./components/pages/Company"
import NewProject from "./components/pages/NewProject"
import Projects from "./components/pages/Projects"
import Container from "./components/layout/Container"
import Navbar from "./components/layout/Navbar"


function App() {

  return (
    <Router>
      <Navbar />

      <Container customClass='min-height'>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/company" element={<Company />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/newproject" element={<NewProject />} />
            <Route path="/contact" element={<Contact />} />
        </Routes>
      </Container>
      
      <div>Footer</div>
    </Router>
  )
}

export default App
