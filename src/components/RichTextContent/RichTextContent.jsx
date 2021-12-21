import React from 'react'
import { Link } from 'gatsby'
import { BLOCKS, INLINES } from '@contentful/rich-text-types'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import { GatsbyImage } from 'gatsby-plugin-image'
import * as styles from './RichTextContent.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'

const options = {
  renderNode: {
    [INLINES.HYPERLINK]: (node, children) => {
      const isExternal = node.data.uri.includes('http')
      return isExternal ? (
        <a
          className={styles.link}
          href={node.data.uri}
          target="_blank"
          rel="noreferrer"
        >
          {children}
          <FontAwesomeIcon className={styles.icon} icon={faExternalLinkAlt} />
        </a>
      ) : (
        <Link className={styles.link} to={node.data.uri}>
          {children}
        </Link>
      )
    },
    [BLOCKS.PARAGRAPH]: (node, children) => <p>{children}</p>,
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const { gatsbyImageData, description } = node.data.target
      return gatsbyImageData ? (
        <div className={styles.image_container}>
          <GatsbyImage image={gatsbyImageData} alt={description} />
        </div>
      ) : null
    },
  },
}

const RichTextContent = ({ content }) => {
  if (!content) {
    return null
  }

  return (
    <div className={styles.rich_text_container}>
      {renderRichText(content, options)}
    </div>
  )
}

export default RichTextContent
