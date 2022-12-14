import { db } from "../../firebase";
import {collection, addDoc, Timestamp, query, setDoc, doc, where, documentId, updateDoc, getDocs} from "firebase/firestore";
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

export async function updateProjectAcess(name){
    const response = await updateDoc(projectsDocumentRef, {
        name: name,
        budget: "",
        category: [],
        cost: 0,
        services: [],
    })
    return response;
}

export async function getProjectsAcess(){
    const response = await getDocs(projectsCollectionRef)
    return response;
}