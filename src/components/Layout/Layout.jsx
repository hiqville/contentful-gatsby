import React from 'react'
import Seo from '../Seo/Seo'
import Navigation from '../Navigation/Navigation'
import Footer from '../Footer/Footer'
import '../../Styles/variables.css'
import '../../Styles/global.css'

const Layout = ({ children }) => {
  return (
    <>
      <Seo />
      <Navigation />
      <main style={{ paddingTop: 100 }}>{children}</main>
      <Footer />
    </>
  )
}

export default Layout
