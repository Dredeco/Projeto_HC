import { useEffect, useState } from 'react'
import {collection, addDoc, Timestamp, getDocs} from 'firebase/firestore'
import {db} from '../../firebase'

import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'

import styles from './ProjectForm.module.sass'
import { getProjectAction, getProjectsAction } from '../../services/actions/projectsAction'
import { useParams } from 'react-router-dom'


export default function ProjectForm({ handleSubmit, btnText, projectData }) {

  const [project, setProject] = useState([])
  const [categories, setCategories] = useState([])
  const [name, setName] = useState('')
  const [budget, setBudget] = useState('')
  const {id} = useParams()

  const categoriesCollectionRef = collection(db, 'categories');
  const projectsCollectionRef = collection(db, 'projects');

  useEffect(() => {
    const getCategories = async () => {
      const data = await getDocs(categoriesCollectionRef);
      setCategories(data.docs.map((doc) => 
      ({...doc.data(),
        id: doc.id
      })))
    }
    const getProjects = async () => {
      const data = await getProjectAction({id: id || ''});
      setProject(data[0])
    }
    getProjects();
    getCategories();
    console.log(project)
  }, []);

  function handleCategory(e) {
    setProject ({
      ...project,
      category: {
        id: e.target.value,
        name: e.target.options[e.target.selectedIndex].text,
      }
    })
  }

  function handleChange(e) {
    setProject ({ ...project, [e.target.name]: e.target.value })
  }
    
  const submit = async (e) => {
      e.preventDefault()
      handleSubmit(project)
    }

  return (
    <form onSubmit={submit} className={styles.form}>
        <Input
                type="text"
                text="Nome do Projeto"
                name="name"
                placeholder="Insira o nome do projeto"
                handleOnChange={handleChange}
                value={project ? project.name : ''}     
            />

        <Input
                type="number"
                text="Orçamento do projeto"
                name="budget"
                placeholder="Insira o orçamento do projeto"
                handleOnChange={handleChange}
                value={project ? project.budget : ''}
            />

        <Select 
          name="category_id" 
          text="Selecione a categoria"
          options={categories}
          handleOnChange={handleCategory}
          value={project.category ? project.category.id : ''}
        />

        <SubmitButton text={btnText}/>
    </form>
  )
}
