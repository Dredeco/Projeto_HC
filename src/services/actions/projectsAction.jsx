import { addProjectAcess, setProjectAcess, updateProjectAcess, getProjectsAcess } from "../dataAcess/projectsAcess";


export async function addProjectAction(name){
    const response = await addProjectAcess(name);
    return response.id;
}

export async function setProjectAction(name, id){
    const response = await setProjectAcess(name, id);
    return response;
}

export async function updateProjectAction(name, id){
    const response = await updateProjectAcess(name, id);
    console.log(response)
    return response;
}

export async function getProjectsAction(name, id){
    const response = await getProjectsAcess(name, id);
    const projects = (response.docs.map((doc) =>
    ({ ...doc.data(), id: doc.id })))
    return projects;
}