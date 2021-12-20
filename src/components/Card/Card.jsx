import React from 'react'
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'

import Tags from '../Tags/Tags'
import * as styles from './Card.module.css'

const Card = ({ link, image, title, content, meta, linkText }) => {
  if (!title) {
    return null
  }

  return (
    <div className={styles.card}>
      <div className={styles.image_container}>
        <GatsbyImage alt="" image={image} />
      </div>
      <h2 className={`${styles.title} px-1`}>{title}</h2>
      <div className="px-1 py-1">
        {content && (
          <div
            dangerouslySetInnerHTML={{
              __html: content,
            }}
          />
        )}
        {link && (
          <Link to={link} className={styles.link}>
            {linkText || 'See more'}
          </Link>
        )}
        <div className={styles.meta}>
          {meta && meta.publishDate && (
            <small className="meta">{meta.publishDate}</small>
          )}
          {meta && meta.tags && <Tags tags={meta.tags} />}
        </div>
      </div>
    </div>
  )
}

export default Card
