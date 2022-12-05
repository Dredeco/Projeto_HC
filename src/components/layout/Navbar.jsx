import React from 'react'
import { Link } from 'react-router-dom'

import Container from './Container'

import styles from './Navbar.module.sass'
import logo from '../../img/costs_logo.png'

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Container>
        <Link className={styles.item} to="/Projeto_HC">
          <img src={logo} alt="Costs" />
        </Link>
        <ul className={styles.list}>
          <li className={styles.item}>
            <Link to="/Projeto_HC/">Home</Link>
          </li>
          <li className={styles.item}>
            <Link to="/Projeto_HC/company">Empresa</Link>
          </li>
          <li className={styles.item}>
            <Link to="/Projeto_HC/projects">Projetos</Link>
          </li>
          <li className={styles.item}>
            <Link to="/Projeto_HC/contact">Contato</Link>
          </li>
        </ul>
        
      </Container>
    </nav>
  )
}
