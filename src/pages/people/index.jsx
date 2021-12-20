import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../../components/Layout/Layout'
import CardList from '../../components/CardList/CardList'
import Card from '../../components/Card/Card'
import Hero from '../../components/Hero/Hero'
import Container from '../../components/Container/Container'
import Separator from '../../components/Separator/Separator'

const People = ({ data, location }) => {
  const pageData = data.contentfulContentPage
  const pageHero = pageData.pageHeroImage
  const textContent = pageData.plainTextContent?.childMarkdownRemark?.html
  const { cards } = pageData

  return (
    <Layout location={location}>
      <Hero
        image={pageHero.heroImage.image.gatsbyImageData}
        title={pageHero.heroImageHeader}
        content={pageHero.heroImageText}
      />
      <Container>
      {textContent && <div
            className="md-content"
            dangerouslySetInnerHTML={{
              __html: textContent,
            }}
      />}
      <Separator />
      <CardList>
        {cards.map((card) => (
          <li key={card.id}>
            <Card
              link={card.cardLink}
              title={card.header}
              image={card.cardImage.image.gatsbyImageData}
              linkText={card.linkText}
              content={card.text?.childMarkdownRemark?.excerpt}
            />
          </li>
        ))}
      </CardList>
      </Container>
    </Layout>
  )
}

export default People

export const query = graphql`
  query PeopleQuery {
    contentfulContentPage(contentful_id: {eq: "3MRmRBR2YPGUl0CL1lVOHC"}) {
      contentful_id
      title
      header
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
        cardLink,
        linkText,
        cardImage {
          alternativeText
          image {
            gatsbyImageData
          }
        }
      }
      pageHeroImage {
        heroImageText
        heroImageHeader
        heroImage {
          alternativeText
          image {
            gatsbyImageData
          }
        }
      }
    }
  }
`
