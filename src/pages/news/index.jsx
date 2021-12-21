import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../../components/Layout/Layout'
import HeroCard from '../../components/HeroCard/HeroCard'
import Container from '../../components/Container/Container'
import CardList from '../../components/CardList/CardList'
import Card from '../../components/Card/Card'
import Separator from '../../components/Separator/Separator'
import RichTextContent from '../../components/RichTextContent/RichTextContent'

const News = ({ data, location }) => {
  const page = data.contentfulContentPage
  const heroCard = page.pageHeroCard
  const textContent = page.plainTextContent?.childMarkdownRemark?.html
  const richText = data.contentfulContentPage.richTextContent

  return (
    <Layout location={location}>
      <HeroCard
        image={heroCard.cardImage.image.gatsbyImageData}
        header={heroCard.header}
        content={
          heroCard.childContentfulContentCardTextTextNode.childMarkdownRemark
            .html
        }
        link={heroCard.cardLink}
        linkText={heroCard.linkText}
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
          {page.cards?.map((card) => (
            <li key={card.id}>
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
        <Separator />
        <RichTextContent content={richText} />
      </Container>
    </Layout>
  )
}

export default News

export const pageQuery = graphql`
query NewsQuery {
  contentfulContentPage(contentful_id: {eq: "zuwPjqMgHOU6177TeeHnL"}) {
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
      cardLink
      linkText
      cardImage {
        alternativeText
        image {
          gatsbyImageData
        }
      }
    }
    pageHeroCard {
      header
      cardLink
      linkText
      cardImage {
        alternativeText
        image {
          gatsbyImageData
        }
      }
      childContentfulContentCardTextTextNode {
        childMarkdownRemark {
          html
        }
      }
    }
    richTextContent {
      raw
      references {
        ... on ContentfulAsset {
          contentful_id
          __typename
          gatsbyImageData(width: 700)
          description
        }
      }
    }
  }
}
`
