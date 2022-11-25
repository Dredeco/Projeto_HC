import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import Container from '../layout/Container'
import Loading from '../layout/Loading'
import ProjectForm from '../project/ProjectForm'

import styles from './Project.module.sass'

export default function Project() {
    const { id } = useParams()

    const [project, setProject] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:5000/projects/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type' : 'application/json',
                },
            })
            .then((resp) => resp.json())
            .then((data) => {
                setProject(data)
            })
            .catch((err) => console.log)
        }, 300);
    }, [id])

    function editPost(project) {
        //budget validation
        if (project.budget < project.cost) {
            //message
        }

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(project),
        })
    }

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm)
    }

  return (
    <>
        {project.name ? (
            <div className={styles.project_details}>
                <Container customClass="column">
                    <div className={styles.details_container}>
                        <h1>Projeto: {project.name}</h1>
                        <button className={styles.btn} onClick={toggleProjectForm}>
                            {!showProjectForm ? 'Editar Projeto' : 'Fechar'}
                        </button>
                        {!showProjectForm ? (
                            <div className={styles.project_info}>
                                <p>
                                    <span>Categoria:</span> {project.category.name}
                                </p>
                                <p>
                                    <span>Total de Orçamento:</span> {project.budget}
                                </p>
                                <p>
                                    <span>Total Utilizado:</span> {project.cost}
                                </p>
                            </div>
                        ): (
                            <div className={styles.project_info}>
                                <ProjectForm 
                                    handleSubmit={editPost} 
                                    btnText="Concluir edição" 
                                    projectData={project} 
                                />
                            </div>
                        )}
                    </div>
                </Container>
            </div>
        ) : (
            <Loading />
        )}
    </>
  )
}
