import React from 'react'
import * as styles from './CardList.module.css'

const CardList = ({ children }) => (
  <ul className={styles.card_list}>
    {children}
  </ul>
)

export default CardList