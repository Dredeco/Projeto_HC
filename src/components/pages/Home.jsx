import React from 'react'

import styles from './Home.module.sass'
import savings from '../../img/savings.svg'
import LinkButton from '../layout/LinkButton'

export default function Home() {
  return (
    <section className={styles.home_container}>
      <h1>
        Bem-vindo ao <span>Costs</span>
      </h1>
      <p>Começe a gerenciar os seus projetos agora mesmo!</p>
      <LinkButton to="/Projeto_HC/newproject" text="Criar Projeto"/>
      <img src={savings} alt='Costs' />
    </section>
  )
}
