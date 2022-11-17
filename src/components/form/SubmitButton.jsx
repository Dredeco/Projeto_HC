import React from 'react'

import styles from './SubmitButton.module.sass'

export default function SubmitButton({ text }) {
  return (
    <div>
        <button className={styles.btn}>{text}</button>
    </div>
  )
}
