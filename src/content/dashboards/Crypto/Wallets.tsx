import { Button, Card, Grid, Box, CardContent, Typography, Avatar, alpha, Tooltip, CardActionArea, styled } from '@mui/material'
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone'
import { DeliveryDining, DinnerDining, Engineering, Group, Inventory, Paid, Receipt } from '@mui/icons-material'
import { Link as RouterLink } from 'react-router-dom'
const AvatarWrapper = styled(Avatar)(
  ({ theme }) => `
    margin: ${theme.spacing(2, 0, 1, -0.5)};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: ${theme.spacing(1)};
    padding: ${theme.spacing(0.5)};
    border-radius: 60px;
    height: ${theme.spacing(5.5)};
    width: ${theme.spacing(5.5)};
    background: ${theme.palette.mode === 'dark' ? theme.colors.alpha.trueWhite[30] : alpha(theme.colors.alpha.black[100], 0.07)};
  
    img {
      background: ${theme.colors.alpha.trueWhite[100]};
      padding: ${theme.spacing(0.5)};
      display: block;
      border-radius: inherit;
      height: ${theme.spacing(4.5)};
      width: ${theme.spacing(4.5)};
    }
`
)

const AvatarAddWrapper = styled(Avatar)(
  ({ theme }) => `
        background: ${theme.colors.alpha.black[10]};
        color: ${theme.colors.primary.main};
        width: ${theme.spacing(8)};
        height: ${theme.spacing(8)};
`
)

const CardAddAction = styled(Card)(
  ({ theme }) => `
        border: ${theme.colors.primary.main} dashed 1px;
        height: 100%;
        color: ${theme.colors.primary.main};
        transition: ${theme.transitions.create(['all'])};
        
        .MuiCardActionArea-root {
          height: 100%;
          justify-content: center;
          align-items: center;
          display: flex;
        }
        
        .MuiTouchRipple-root {
          opacity: .2;
        }
        
        &:hover {
          border-color: ${theme.colors.alpha.black[70]};
        }
`
)

function Wallets() {
  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          pb: 3,
        }}
      >
        <Typography variant="h3">Menu Transaksi</Typography>
      </Box>
      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3} item alignItems={'center'}>
          <Tooltip arrow title="Klik untuk melakukan pengiriman">
            <CardAddAction>
              <CardActionArea
                sx={{
                  px: 1,
                }}
              >
                <CardContent>
                  <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Button variant="contained" color="primary" component={RouterLink} to="/dashboards/transactions">
                      <DeliveryDining sx={{ fontSize: '50px' }} />
                    </Button>
                  </Box>
                  <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography variant="h3" fontWeight={'bold'}>
                      {' '}
                      Pengiriman
                    </Typography>
                  </Box>
                </CardContent>
              </CardActionArea>
            </CardAddAction>
          </Tooltip>
        </Grid>
        <Grid xs={12} sm={6} md={3} item>
          <Tooltip arrow title="Klik untuk melakukan pembayaran">
            <CardAddAction>
              <CardActionArea
                sx={{
                  px: 1,
                }}
              >
                <CardContent>
                  <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Button variant="contained" color="primary" component={RouterLink} to="/dashboards/payment">
                      <Paid sx={{ fontSize: '50px' }} />
                    </Button>
                  </Box>
                  <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography variant="h3" fontWeight={'bold'}>
                      {' '}
                      Pembayaran
                    </Typography>
                  </Box>
                </CardContent>
              </CardActionArea>
            </CardAddAction>
          </Tooltip>
        </Grid>
        <Grid xs={12} sm={6} md={3} item>
          <Tooltip arrow title="Klik untuk melihat hutang piutang">
            <CardAddAction>
              <CardActionArea
                sx={{
                  px: 1,
                }}
              >
                <CardContent>
                  <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Button variant="contained" color="primary">
                      <Receipt sx={{ fontSize: '50px' }} />
                    </Button>
                  </Box>
                  <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography variant="h3" fontWeight={'bold'}>
                      {' '}
                      Hutang Piutang
                    </Typography>
                  </Box>
                </CardContent>
              </CardActionArea>
            </CardAddAction>
          </Tooltip>
        </Grid>
        <Grid xs={12} sm={6} md={3} item>
          <Tooltip arrow title="Klik untuk tambah/edit/hapus Pelanggan">
            <CardAddAction>
              <CardActionArea
                sx={{
                  px: 1,
                }}
              >
                <CardContent>
                  <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Button variant="contained" color="primary">
                      <Group sx={{ fontSize: '50px' }} />
                    </Button>
                  </Box>
                  <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography variant="h3" fontWeight={'bold'}>
                      {' '}
                      Pelanggan
                    </Typography>
                  </Box>
                </CardContent>
              </CardActionArea>
            </CardAddAction>
          </Tooltip>
        </Grid>
        <Grid xs={12} sm={6} md={3} item>
          <Tooltip arrow title="Klik untuk tambah/edit/hapus Karyawan">
            <CardAddAction>
              <CardActionArea
                sx={{
                  px: 1,
                }}
              >
                <CardContent>
                  <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Button variant="contained" color="primary" component={RouterLink} to="/dashboards/transaction">
                      <Engineering sx={{ fontSize: '50px' }} />
                    </Button>
                  </Box>
                  <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography variant="h3" fontWeight={'bold'}>
                      {' '}
                      Karyawan
                    </Typography>
                  </Box>
                </CardContent>
              </CardActionArea>
            </CardAddAction>
          </Tooltip>
        </Grid>
        <Grid xs={12} sm={6} md={3} item>
          <Tooltip arrow title="Klik untuk tambah/edit/hapus Karyawan">
            <CardAddAction>
              <CardActionArea
                sx={{
                  px: 1,
                }}
              >
                <CardContent>
                  <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Button variant="contained" color="primary" component={RouterLink} to="/dashboards/transaction">
                      <Inventory sx={{ fontSize: '50px' }} />
                    </Button>
                  </Box>
                  <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography variant="h3" fontWeight={'bold'}>
                      {' '}
                      Barang
                    </Typography>
                  </Box>
                </CardContent>
              </CardActionArea>
            </CardAddAction>
          </Tooltip>
        </Grid>
      </Grid>
    </>
  )
}

export default Wallets
