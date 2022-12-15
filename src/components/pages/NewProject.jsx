import { useNavigate } from 'react-router-dom'
import {collection, addDoc, Timestamp} from 'firebase/firestore'
import {db} from '../../firebase'

import React from 'react'
import ProjectForm from '../project/ProjectForm'

import styles from './NewProject.module.sass'

export default function NewProject() {

  const history = useNavigate()

  function createPost(project) {
    // initialize cost and services
    project.cost = 0
    project.services= []

    try {
     addDoc(collection(db, 'projects'), {
        name: project.name,
        budget: project.budget,
        category: project.category,
        cost: 0,
        services: [],
        created: Timestamp.now()
      })
      history('/Projeto_HC/projects',{state: { message: 'Projeto criado com sucesso!'}})
    } catch (err) {
      alert(err)
    }
  }

  return (
    <div className={styles.newproject_container}>
      <h1>Criar Projeto</h1>
      <p>Crie seu projeto para depois adicionar os serviços</p>
      <ProjectForm handleSubmit={createPost} btnText="Criar Projeto"/>
    </div>
  )
}