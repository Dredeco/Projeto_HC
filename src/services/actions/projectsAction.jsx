import { deleteDoc, updateDoc } from "firebase/firestore";
import { addProjectAcess, 
    setProjectAcess, 
    updateProjectAcess, 
    getProjectsAcess, 
    getProjectAcess,
    deleteProjectAccess } from "../dataAcess/projectsAcess";

export async function addProjectAction(name){
    const response = await addProjectAcess(name);
    return response.id;
}

export async function setProjectAction(name, id){
    const response = await setProjectAcess(name, id);
    return response;
}

export async function updateProjectAction(project){
    const response = await updateProjectAcess(project)
    return response;
}

export async function getProjectsAction(name, id){
    const response = await getProjectsAcess(name, id);
    const projects = (response.docs.map((doc) =>
    ({ ...doc.data(), id: doc.id })))
    return projects;
}

export async function getProjectAction(id){
    const response = await getProjectAcess(id);
    const projects = (response.docs.map((doc) =>
    ({ ...doc.data(), id: doc.id })))
    return projects;
}

export async function deleteProjectAction(id){
    const response = await deleteProjectAccess(id.id);
    console.log(response)
    const projects = deleteDoc(response)
    return projects;
}