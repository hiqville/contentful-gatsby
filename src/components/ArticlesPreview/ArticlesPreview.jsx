import React from 'react'
import Container from '../Container/Container'
import * as styles from './ArticlesPreview.module.css'
import Card from '../Card/Card'

const ArticlesPreview = ({ posts }) => {
  if (!posts) return null
  if (!Array.isArray(posts)) return null

  return (
    <Container>
      <ul className={styles.articleList}>
        {posts.map((post) => {
          return (
            <li key={post.slug}>
              <Card
                link={`/news/${post.slug}`}
                image={post.heroImage.gatsbyImageData}
                title={post.title}
                content={post.description.childMarkdownRemark.html}
                meta={{publishDate: post.publishDate, tags: post.tags}}
              />
            </li>
          )
        })}
      </ul>
    </Container>
  )
}

export default ArticlesPreview
