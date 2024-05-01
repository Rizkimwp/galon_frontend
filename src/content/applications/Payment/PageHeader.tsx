import { Grid, Typography } from '@mui/material'
import React from 'react'

const PageHeader = () => {
  return (
    <Grid container justifyContent="center" alignItems="center" spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h3" component="h3" gutterBottom align="center">
          Pengiriman Air Depo Rizky Cendani
        </Typography>
      </Grid>
      <Grid item container justifyContent="center" spacing={3} display={'flex'} xs={12}></Grid>
    </Grid>
  )
}

export default PageHeader
