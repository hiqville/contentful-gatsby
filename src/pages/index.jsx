import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout/Layout'
import Card from '../components/Card/Card'
import Hero from '../components/Hero/Hero'
import * as styles from './Home.module.css'
import Container from '../components/Container/Container'
import CardList from '../components/CardList/CardList'

const Home = ({ data, location }) => {
  const page = data.contentfulContentPage || []
  const heroImg = page.pageHeroImage

  return (
    <Layout location={location}>
      {heroImg && (
        <Hero
          image={heroImg.heroImage.image.gatsbyImageData}
          title={heroImg.heroImageHeader}
          content={heroImg.heroImageText}
        />
      )}
      <Container>
      <div
        dangerouslySetInnerHTML={{
          __html: page.plainTextContent.childMarkdownRemark.html,
        }}
      />
        <CardList>
        {page.cards.map((card) => (
          <li className={styles.card_container} key={card.id}>
            <Card
              image={card.cardImage.image.gatsbyImageData}
              title={card.header}
              content={card.text.childMarkdownRemark.html}
              link={card.cardLink}
              linkText={card.linkText}
            />
          </li>
        ))}
      </CardList>
      </Container>
    </Layout>
  )
}

export default Home

export const query = graphql`
query HomeQuery {
  contentfulContentPage(contentful_id: {eq: "2LmMNBXWDfOU8jOxkWPEu"}) {
    id
    contentful_id
    header
    pageHeroImage {
      heroImageText
      heroImageHeader
      heroImage {
        image {
          gatsbyImageData
        }
      }
    }
    plainTextContent {
      childMarkdownRemark {
        html
      }
    }
    cards {
      id
      header
      text {
        childMarkdownRemark {
          html
        }
      }
      cardLink
      linkText
      cardImage {
        alternativeText
        image {
          gatsbyImageData
        }
      }
    }
  }
}
`
