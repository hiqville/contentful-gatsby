import React from 'react'
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import Container from '../Container/Container'
import * as styles from './HeroCard.module.css'

const HeroCard = ({ image, header, content, link, linkText }) => {

  return (
    <Container>
      <div className={styles.hero_card}>
        <div className={styles.image_container}>
          <GatsbyImage style={{ maxHeight: '400px' }} alt="" image={image} />
        </div>
        <div className={`${styles.text_container} px-1 py-1`}>
          <h2 className={styles.title}>{header}</h2>
          <div
            dangerouslySetInnerHTML={{
              __html: content,
            }}
          />
          {link && <Link to={link} className={styles.link}>
              {linkText ? linkText : 'See more'}
          </Link>}
        </div>
      </div>
    </Container>
  )
}

export default HeroCard;