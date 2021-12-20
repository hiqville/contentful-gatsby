const path = require('path')

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Define a template for blog post
  const article = path.resolve('./src/templates/ArticleTemplate.jsx')
  const person = path.resolve('./src/templates/PersonTemplate.jsx')

  const articleResult = await graphql(
    `
      {
        allContentfulArticle {
          nodes {
            title
            slug
          }
        }
      }
    `
  )

  const personResult = await graphql(
    `
      {
        allContentfulPerson {
          nodes {
            reference
            name
          }
        }
      }
    `
  )

  if (articleResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your Contentful articles`,
      articleResult.errors
    )
    return
  }

  if (personResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading all person`,
      personResult.errors
    )
    return
  }

  const articles = articleResult.data.allContentfulArticle.nodes
  const people = personResult.data.allContentfulPerson.nodes

  // Create blog posts pages
  // But only if there's at least one blog post found in Contentful
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (articles.length > 0) {
    articles.forEach((item) => {
      createPage({
        path: `/news/${item.slug}/`,
        component: article,
        context: {
          slug: item.slug,
        },
      })
    })
  }

  if (people.length > 0) {
    people.forEach((item) => {
      createPage({
        path: `/people/${item.reference}/`,
        component: person,
        context: {
          reference: item.reference,
        },
      })
    })
  }
}

exports.onCreateWebpackConfig = helper => {
  const { stage, actions, getConfig } = helper
  if (stage === 'develop' || stage === 'build-javascript') {
    const config = getConfig()
    const miniCssExtractPlugin = config.plugins.find(
      plugin => plugin.constructor.name === 'MiniCssExtractPlugin'
    )
    if (miniCssExtractPlugin) {
      miniCssExtractPlugin.options.ignoreOrder = true
    }
    actions.replaceWebpackConfig(config)
  }
}

