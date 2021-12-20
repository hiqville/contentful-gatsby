import { graphql, Link } from 'gatsby'
import React from 'react'
import Layout from '../components/Layout/Layout'
import Seo from '../components/Seo/Seo'
import Hero from '../components/Hero/Hero'
import * as styles from './PersonTemplate.module.css'

const PeopleTemplate = ({ data, location }) => {
  console.log('people template', data, location)
  const person = data.contentfulPerson

  return (
    <Layout location={location}>
      <Seo
        title={`${person.name} - ${person.title} - ${person.company}`}
        description={person.shortBio.childMarkdownRemark.excerpt}
        image={`http:${person.image.resize.src}`}
      />
      <Hero
        image={person.image.gatsbyImageData}
        title={person.name}
        content={person.shortBio.childMarkdownRemark.excerpt}
      />
      <div className={styles.container}>
        <div className={styles.article}>
          <div
            className={styles.body}
            dangerouslySetInnerHTML={{
              __html: person.shortBio.childMarkdownRemark?.html,
            }}
          />
        <div>
          <Link to={`/people/`} rel="prev">
            ← Back to People
          </Link>
        </div>
        </div>
      </div>
    </Layout>
  )
}

export default PeopleTemplate

export const peopleTemplateQuery = graphql`
  query PersonByReference(
    $reference: String!
  ) {
    contentfulPerson(reference: {eq: $reference}) {
      contentful_id
      name
      email
      title
      reference
      shortBio {
        childMarkdownRemark {
          html
          excerpt
        }
      }
      image {
        gatsbyImageData
        resize {
          src
        }
      }
      company
    }
  }
`