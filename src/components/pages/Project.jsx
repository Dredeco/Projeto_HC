import React, { useEffect, useState } from 'react'
import { json, useParams } from 'react-router-dom'
import { parse, v4 as uuidv4 } from 'uuid'
import {collection, getDocs, getDoc, doc, query, where, documentId} from 'firebase/firestore'
import {db} from '../../firebase'

import Container from '../layout/Container'
import Loading from '../layout/Loading'
import ProjectForm from '../project/ProjectForm'
import Message from '../layout/Message'
import ServiceCard from '../services/ServiceCard'

import styles from './Project.module.sass'
import ServiceForm from '../services/ServiceForm'

export default function Project() {
    const { id } = useParams()
    const projectDocRef = query(collection(db, 'projects'), where(documentId(), '==', id));

    const [project, setProject] = useState([])
    var [currentProject, setCurrentProject] = useState([])
    const [services, setServices] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [message, setMessage] = useState()
    const [type, setType] = useState()
 
    useEffect(() => {
        setTimeout(() => {
            const getProjects = async () => {
            const data = await getDocs(projectDocRef);
                setProject(data.docs.map((doc) =>
                ({ ...doc.data(),
                    id: doc.id,
                })))
              }
              getProjects();
        }, 0);
    }, [id])
    currentProject = project[0];
    console.log(project[0], currentProject)

    function editPost(project) {
        setMessage('')
        //budget validation
        if (project.budget < project.cost) {
            //message
            setMessage('O orçamento não pode ser menor que o custo do projeto!')
            setType('error')
            return false
        }

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(project),
        })
        .then((resp) => resp.json())
        .then((data) => {
            setProject(data)
            setShowProjectForm(false)
            // mensagem
            setMessage('Projeto atualizado!')
            setType('success')
        })
        .catch((err) => console.log)
    }

    function createService(project) {
        setMessage('')

        //last service
        const lastService = project.services[project.services.length -1]

        lastService.id = uuidv4()

        const lastServiceCost = lastService.cost

        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

        //maximum value validation
        if (newCost > parseFloat(project.budget)) {
            setMessage('Orçamento ultrapassado, verifique o valor do serviço')
            setType('error')
            project.services.pop()
            return false
        }

        // add service cost to project total cost
        project.cost = newCost

        // update project
        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        })
        .then((resp) => resp.json())
        .then((data) => {
            //exibir os serviços
            setServices(data.services)
            setShowServiceForm(!showServiceForm)
            setMessage('Serviço adicionado!')
            setType('success')
        })
        .catch(err => console.log(err))
    }

    function removeService(id, cost) {
        const servicesUpdated = project.services.filter(
            (service) => service.id !== id,
        )

        const projectUpdated = project

        projectUpdated.services = servicesUpdated
        projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)

        fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(projectUpdated),
        })
        .then((resp) => resp.json())
        .then((data) => {
            setProject(projectUpdated)
            setServices(servicesUpdated)
            setMessage('Serviço removido com sucesso!')
            setType('success')
        })
        .catch(err => console.log(err))
    }

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm)
    }

    function toggleServiceForm() {
        setShowServiceForm(!showServiceForm)
    }

  return (
    <>
        {currentProject ? (
            <div className={styles.project_details}>
                <Container customClass="column">
                    {message && <Message type={type} msg={message} />}
                    <div className={styles.details_container}>
                        <h1>Projeto: {currentProject.name}</h1>
                        <button className={styles.btn} onClick={toggleProjectForm}>
                            {!showProjectForm ? 'Editar Projeto' : 'Fechar'}
                        </button>
                        {!showProjectForm ? (
                            <div className={styles.project_info}>
                                <p>
                                    <span>Categoria:</span> {currentProject.category.name}
                                </p>
                                <p>
                                    <span>Total de Orçamento:</span> {currentProject.budget}
                                </p>
                                <p>
                                    <span>Total Utilizado:</span> {currentProject.cost}
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
                    <div className={styles.service_form_container}>
                        <h2>Adicione um serviço:</h2>
                        <button className={styles.btn} onClick={toggleServiceForm}>
                            {!showServiceForm ? 'Adicionar Serviço' : 'Fechar'}
                        </button>
                        <div className={styles.project_info}>
                            {showServiceForm && <ServiceForm 
                                handleSubmit={createService}
                                btnText="Adicionar Serviço"
                                projectData={project}
                            />}
                        </div>
                    </div>
                    <h2>Serviços</h2>
                        <Container customClass="start">
                            {services.length > 0 &&
                                services.map((service) => (
                                    <ServiceCard 
                                        id={service.id}
                                        name={service.name}
                                        cost={service.cost}
                                        description={service.description}
                                        key={service.id}
                                        handleRemove={removeService}
                                    />
                                ))
                            }
                            {services.length === 0 && <p>Não há serviços cadastrados.</p>}
                        </Container>
                </Container>
            </div>
        ) : (
            <Loading />
        )}
    </>
  )
}
