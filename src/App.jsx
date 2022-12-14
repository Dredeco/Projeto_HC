import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import Home from "./components/pages/Home"
import Contact from "./components/pages/Contact"
import Company from "./components/pages/Company"
import NewProject from "./components/pages/NewProject"
import Projects from "./components/pages/Projects"
import Container from "./components/layout/Container"
import Navbar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer"
import Project from "./components/pages/Project"
import { useEffect } from "react"
import { addProjectAcess } from "./services/dataAcess/projectsAcess"
import { getProjectsAction, setProjectAction, updateProjectAction } from "./services/actions/projectsAction"


function App() {

  useEffect(() =>{
    getProjectsAction().then((res) =>{
      console.log(res)
    });
  }, [])

  return (
    <Router>
      <Navbar />

      <Container customClass='min-height'>
        <Routes>
            <Route path="/Projeto_HC/" element={<Home />} />
            <Route path="/Projeto_HC/company" element={<Company />} />
            <Route path="/Projeto_HC/projects" element={<Projects />} />
            <Route path="/Projeto_HC/newproject" element={<NewProject />} />
            <Route path="/Projeto_HC/contact" element={<Contact />} />
            <Route path="/Projeto_HC/project/:id" element={<Project />} />
        </Routes>
      </Container>
      
      <Footer />
    </Router>
  )
}

export default App
