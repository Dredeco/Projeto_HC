import { db } from "../../firebase";
import {collection, addDoc, Timestamp, query, getDoc, setDoc, doc, where, documentId, updateDoc, getDocs, deleteDoc} from "firebase/firestore";
import { async } from "@firebase/util";

const projectsCollectionRef = collection(db, 'projects')
const projectsDocumentRef = doc(db, 'projects', 'LET')


export async function addProjectAcess(name, budget, category){
    const response = await addDoc(projectsCollectionRef, {
            name: name,
            budget: budget,
            category: category
    });
    return response;
}

export async function setProjectAcess(name, budget, category, cost, services){
    const response = await setDoc(projectsDocumentRef, {
            name: name,
            budget: "",
            category: [],
            cost: 0,
            services: [],
            created: Timestamp.now()
    });
    return response;
}

export async function updateProjectAcess(project){
    const response = await updateDoc(doc(db, 'projects', `${project.id}`), {
        name: project.name,
        budget: project.budget,
        category: project.category,
    });
    return response;
}

export async function getProjectsAcess(){
    const response = await getDocs(projectsCollectionRef)
    return response;
}

export async function getProjectAcess(id){
    const response = await getDocs(query(collection(db, 'projects'), where(documentId(), '==', `${id.id}`)))
    return response;
}

export async function deleteProjectAccess(id){
    const response = (doc(db, 'projects', `${id}`));
    return response;
}