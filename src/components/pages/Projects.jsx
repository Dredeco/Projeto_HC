import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import {collection, getDocs} from 'firebase/firestore'
import {db} from './../../firebase'

import Message from '../layout/Message'
import Container from '../layout/Container'
import Loading from '../layout/Loading'
import LinkButton from '../layout/LinkButton'
import ProjectCard from '../project/ProjectCard'

import styles from './Projects.module.sass'

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [removeLoading, setRemoveLoading] = useState(false)
  const [projectMessage, setProjectMessage] = useState('')

  const projectsCollectionRef = collection(db, 'projects');

  const location = useLocation()
  let message = ''
  if (location.state) {
    message = location.state.message
  }

  useEffect(() => {
    setTimeout(() => {
      const getProjects = async () => {
        const data = await getDocs(projectsCollectionRef);
        setProjects(data.docs.map((doc) =>
        ({ ...doc.data(),
          id: doc.id
        })))
      }
      getProjects();
      setRemoveLoading(true)
    }, 2000);
  }, [])

  function removeProject(id) {
    setProjectMessage('')
    
    fetch(`http://localhost:5000/projects/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(resp => resp.json())
    .then((data) => {
      setProjects(projects.filter((project) => project.id !== id))
      setProjectMessage('Projeto removido com sucesso!')
    })
    .catch(err => console.log(err))
  }

  return (
    <div className={styles.project_container}>
      <div className={styles.title_container}>
        <h1>Meus Projetos</h1>
        <LinkButton to="/Projeto_HC/newproject" text="Criar Projeto" />
      </div>
      {message && <Message msg={message} type="success" />}
      {projectMessage && <Message msg={projectMessage} type="success" />}
      <Container customClass="start">
        {projects.length > 0 &&
          projects.map((project) => <ProjectCard 
          id={project.id}
          name={project.name} 
          budget={project.budget}
          category={project.category.name}
          key={project.id}
          handleRemove={removeProject}
          />)}
          {!removeLoading && <Loading />}
          {removeLoading && projects.length === 0 && (
            <p>Não há projetos cadastrados!</p>
          )}
      </Container>
    </div>
  )
}
