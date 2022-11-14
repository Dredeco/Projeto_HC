import React from 'react'
import styles from './Container.module.sass'

export default function Container(props) {
  return (
    <div className={`${styles.container} ${styles[props.customClass]}`}>
        {props.children}
    </div>
  )
}
