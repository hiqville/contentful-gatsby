import React from 'react'
import { Link, graphql } from 'gatsby'
import Seo from '../components/Seo/Seo'
import Layout from '../components/Layout/Layout'
import Hero from '../components/Hero/Hero'
import * as styles from './ArticleTemplate.module.css'

const ArticleTemplate = ({ data, location }) => {
  const article = data.contentfulArticle

  return (
    <Layout location={location}>
      <Seo
        title={article.title}
        description={article.description.childMarkdownRemark.excerpt}
        image={`http:${article.heroImage.resize.src}`}
      />
      <Hero
        image={article.heroImage?.gatsbyImageData}
        title={article.title}
        content={article.description?.childMarkdownRemark?.excerpt}
      />
      <div className={styles.container}>
        <span className={styles.meta}>
          {article.author?.name} &middot;{' '}
          <time dateTime={article.rawDate}>{article.publishDate}</time> –{' '}
          {article.body?.childMarkdownRemark?.timeToRead} minute read
        </span>
        <div className={styles.article}>
          <div
            className={styles.body}
            dangerouslySetInnerHTML={{
              __html: article.body?.childMarkdownRemark?.html,
            }}
          />
        <div>
          <Link to={`/news/`} rel="prev">
            ← Back to News
          </Link>
        </div>
        </div>
      </div>
    </Layout>
  )
}

export default ArticleTemplate

export const pageQuery = graphql`
  query ArticlesBySlug(
    $slug: String!
  ) {
    contentfulArticle(slug: { eq: $slug }) {
      slug
      title
      author {
        name
      }
      publishDate(formatString: "MMMM Do, YYYY")
      rawDate: publishDate
      heroImage {
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, width: 1280)
        resize(height: 630, width: 1200) {
          src
        }
      }
      body {
        childMarkdownRemark {
          html
          timeToRead
        }
      }
      tags
      description {
        childMarkdownRemark {
          excerpt
        }
      }
    }
  }
`
