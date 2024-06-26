import { Helmet } from 'react-helmet-async'
import PageHeader from './PageHeader'
import PageTitleWrapper from 'src/components/PageTitleWrapper'
import { Grid, Container } from '@mui/material'
import Footer from 'src/components/Footer'

import RecentOrdersTable from './RecentOrdersTable'
import { useState } from 'react'
import { set } from 'date-fns'

function ApplicationsTransactions() {
  const [fetch, setFetch] = useState<string>('')
  return (
    <>
      <Helmet>
        <title>Transactions - Applications</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader fetch={setFetch} />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid container direction="row" justifyContent="center" alignItems="stretch" spacing={3}>
          <Grid item xs={12}>
            <RecentOrdersTable fetch={fetch} />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  )
}

export default ApplicationsTransactions
