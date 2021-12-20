import React from 'react'
import { Link } from 'gatsby'
import * as styles from './Navigation.module.css'

const Navigation = () => (
  <nav role="navigation" className={styles.container} aria-label="Main">
    <Link to="/" className={styles.logoLink}>
      <img className={styles.logo} src="/logo.png" alt="" />
      <span className={styles.navigationItem}>Demo Company</span>
    </Link>
    <ul className={styles.navigation}>
      <li className={styles.navigationItem}>
        <Link to="/" activeClassName="active">
          Home
        </Link>
      </li>
      <li className={styles.navigationItem}>
        <Link to="/news/" activeClassName="active">
          News
        </Link>
      </li>
      <li className={styles.navigationItem}>
        <Link to="/people/" activeClassName="active">
          People
        </Link>
      </li>
    </ul>
  </nav>
)

export default Navigation
