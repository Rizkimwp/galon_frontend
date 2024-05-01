import { FC, useState, useEffect, ReactNode } from 'react'
import {
  Divider,
  Box,
  Card,
  useTheme,
  CardHeader,
  Autocomplete,
  TextField,
  TableRow,
  TableCell,
  Typography,
  darken,
  Button,
  AutocompleteRenderInputParams,
} from '@mui/material'

import { CryptoOrder, CryptoOrderStatus } from 'src/models/crypto_order'
import BulkActions from './BulkActions'
import { useApi } from 'src/utils/ApiHook'
import { id } from 'date-fns/locale'
import Table from 'src/components/Table'
import { DeliveryDto } from 'src/utils/GeneratedApi'
import { Cancel, Edit, ExitToApp, Label } from '@mui/icons-material'

interface RecentOrdersTableProps {
  className?: string
  cryptoOrders: CryptoOrder[]
}

const RecentOrdersTable: FC<{ fetch: string }> = ({ fetch }) => {
  const [selectedCryptoOrders, setSelectedCryptoOrders] = useState<string[]>([])
  const api = useApi()
  const [edit, setEdit] = useState(false)
  const [data, setData] = useState<any[] | null>(null)
  const [kurir, setkurir] = useState<any[] | null>(null)
  const selectedBulkActions = selectedCryptoOrders.length > 0
  const [Id, setId] = useState<{ id: number }>({ id: 0 })
  useEffect(() => {
    fetchData()
    fetchKurir()
  }, [Id.id, fetch])

  const fetchData = async () => {
    try {
      const res = await api.delivery.deliveryControllerGetDeliveriesForToday({ kurirId: Id.id['id'] }).then((i) => i.json())
      setData(res)
      console.log(res)
      console.log(Id.id)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchKurir = async () => {
    try {
      const res = await api.courier.courierControllerFindAll().then((i) => i.json())
      setkurir(res)
    } catch (error) {
      console.log(error)
    }
  }

  const theme = useTheme()

  return (
    <Card>
      {selectedBulkActions && (
        <Box flex={1} p={2}>
          <BulkActions />
        </Box>
      )}
      {!selectedBulkActions && (
        <CardHeader
          action={
            <Box width={150}>
              <Autocomplete
                options={kurir || []}
                getOptionLabel={(o) => o.nama}
                onChange={(e, v) => setId((prev) => ({ ...prev, id: v }))}
                value={Id.id}
                renderInput={(render) => <TextField {...render} label="Kurir" />}
              />
            </Box>
          }
          title="DATA PENGIRIMAN"
        />
      )}
      <Divider />
      <Table
        columns={[
          { label: 'Pelanggan', align: 'center' },
          { label: 'Kurir', align: 'center' },
          { label: 'Status', align: 'center' },
          { label: 'Aksi', align: 'center' },
        ]}
        data={data}
        renderRow={(data, index) => (
          <TableRow key={index}>
            <TableCell>
              <Typography variant="body1" fontWeight="bold" color="text.primary" gutterBottom noWrap>
                {data.customers?.nama || 'Unknown'}
              </Typography>
              {data.items?.namaBarang} {data.qty}
            </TableCell>
            <TableCell>{data.courier?.nama}</TableCell>
            {!edit ? (
              <TableCell>{data.status}</TableCell>
            ) : (
              <TableCell>
                <Autocomplete onChange={() => {}} options={[]} value={data.status} renderInput={(params) => <TextField {...params} />} />
              </TableCell>
            )}

            <TableCell>
              {!edit ? (
                <Button onClick={() => setEdit(true)}>
                  <Edit />
                </Button>
              ) : (
                <Button onClick={() => setEdit(false)}>
                  <Cancel />
                </Button>
              )}
            </TableCell>
          </TableRow>
        )}
      />
      <Box p={2}></Box>
    </Card>
  )
}

export default RecentOrdersTable
