import { Container, Grid } from '@mui/material'
import React from 'react'
import { Helmet } from 'react-helmet-async'
import Footer from 'src/components/Footer'
import PageTitleWrapper from 'src/components/PageTitleWrapper'
import RecentTable from './RecentTable'
import PageHeader from './PageHeader'

const index = () => {
  return (
    <>
      <Helmet>
        <title>Transactions - Applications</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid container direction="row" justifyContent="center" alignItems="stretch" spacing={3}>
          <Grid item xs={12}>
            <RecentTable />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  )
}

export default index
