import React from 'react'
import * as styles from './Container.module.css'

const Container = ({ children, as = 'div' }) => {
  const Tag = as

  return (
    <Tag
      className={styles.container}
    >
      {children}
    </Tag>
  )
}

export default Container
