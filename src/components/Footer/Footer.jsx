import React from 'react'
import Container from '../Container/Container'
import * as styles from './Footer.module.css'

const Footer = () => (
  <Container as="footer">
    <div className={styles.container}>
      Copyright Demo Company 2021
    </div>
  </Container>
)

export default Footer
