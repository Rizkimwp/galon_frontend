import { Typography, Button, Grid, TextField, Autocomplete, IconButton, Paper, Alert } from '@mui/material'

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone'
import { useApi } from 'src/utils/ApiHook'
import { FC, useContext, useEffect, useState } from 'react'
import { Courier, CourierDto, Customers, DeliveryDto, StatusPengiriman } from 'src/utils/GeneratedApi'
import { id } from 'date-fns/locale'
import AddIcon from '@mui/icons-material/Add'
import { FourMp, Remove } from '@mui/icons-material'
import { Formik, FormikContext, FormikHelpers, useFormik } from 'formik'
import * as Yup from 'yup'
import { max } from 'date-fns'
interface myFormValues {
  kurir_id: number
  customer_id: number
  item_id: number
  qty: number
  status: StatusPengiriman
}

const PageHeader: FC<{ fetch: React.Dispatch<React.SetStateAction<string>> }> = ({ fetch }) => {
  const api = useApi()
  const [kurir, setKurir] = useState<any[]>([])
  const [customers, setCustomers] = useState<any[]>([])
  const [items, setItems] = useState<any[]>([])
  const [success, setsuccess] = useState('')
  const initialValues: myFormValues = { item_id: 0, customer_id: 0, kurir_id: 0, qty: 0, status: StatusPengiriman.Proses }
  const [data, setData] = useState<DeliveryDto>({
    kurirId: 0, // Misalnya, atau sesuai dengan default yang Anda inginkan
    status: StatusPengiriman.Proses,
    itemsId: 0,
    qty: 0,
    customersId: 0,
  })
  useEffect(() => {
    fetchKurir()
    fetchCustomers()
    fetchItems()
  }, [])

  const fetchCustomers = async () => {
    try {
      const res = await api.customers.customerControllerFindAll().then((data) => data.json())

      setCustomers(res)
    } catch (error) {
      console.log(error)
    }
  }
  const fetchKurir = async () => {
    try {
      const res = await api.courier.courierControllerFindAll().then((data) => data.json())
      setKurir(res)
    } catch (error) {
      console.log(error)
    }
  }
  const fetchItems = async () => {
    try {
      const res = await api.items.itemsControllerGetItems().then((data) => data.json())
      setItems(res)
      console.log('berhasil', items)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = () => {
    formik.handleSubmit()
  }
  const validationSchema = Yup.object().shape({
    kurir_id: Yup.number().min(1, 'Minimal Harus 1').required('Kurir ID harus diisi'),
    item_id: Yup.number().min(1, 'Minimal Harus 1').required('Barang Harus Diisi'),
    customer_id: Yup.number().min(1, 'Minimal harus').required('Pelanggan Harus diisi'),
    qty: Yup.number().min(1, 'Minimal 1 Barang').required('Qty tidak boleh kosong'),
  })
  const formik = useFormik<myFormValues>({
    initialValues: initialValues,
    onSubmit: async (values) => {
      try {
        const res = await api.delivery
          .deliveryControllerCreate({
            itemsId: values.item_id,
            customersId: values.customer_id,
            kurirId: values.kurir_id,
            status: StatusPengiriman.Proses,
            qty: values.qty,
          })
          .then((data) => data.json())
        fetch('success')
        console.log(res)
        setsuccess('Data Berhasil Ditambahkan')
      } catch (error) {
        console.log(error)
      }
    },
    validationSchema: validationSchema,
  })

  return (
    <Grid container justifyContent="center" alignItems="center" spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h3" component="h3" gutterBottom align="center">
          Pengiriman Air Depo Rizky Cendani
        </Typography>
      </Grid>
      <Grid item container justifyContent="center" spacing={3} display={'flex'} xs={12}>
        <Grid item xs={12} md={6}>
          <Autocomplete
            id="kurir_id"
            disablePortal
            options={kurir || []}
            getOptionLabel={(o: Courier) => o.nama}
            onChange={(e, v: CourierDto) => formik.setFieldValue('kurir_id', v?.id || 0)}
            value={kurir.find((f: CourierDto) => f.id === data?.kurirId)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Karyawan"
                fullWidth
                helperText={formik.touched.kurir_id && formik.errors.kurir_id ? formik.errors.kurir_id : null} // Tampilkan pesan kesalahan jika ada
                error={formik.touched.kurir_id && Boolean(formik.errors.kurir_id)}
              />
            )} // Tentukan apakah ada kesalahan/>)}
          />
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            id="customer_id"
            disablePortal
            options={customers || []}
            getOptionLabel={(o: Customers) => o.nama}
            onChange={(e, v) => formik.setFieldValue('customer_id', v?.id || 0)}
            value={customers.find((m) => m.id === data.customersId)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Pelanggan"
                fullWidth
                helperText={formik.touched.customer_id && formik.errors.customer_id ? formik.errors.customer_id : null} // Tampilkan pesan kesalahan jika ada
                error={formik.touched.customer_id && Boolean(formik.errors.customer_id)} // Tentukan apakah ada kesalahan />)}
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Autocomplete
            id="item_id"
            disablePortal
            options={items || []}
            getOptionLabel={(o) => o.namaBarang}
            onChange={(e, v) => formik.setFieldValue('item_id', v?.id)}
            value={items.find((m) => m.id === data.itemsId)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Barang"
                fullWidth
                helperText={formik.touched.kurir_id && formik.errors.kurir_id ? formik.errors.item_id : null} // Tampilkan pesan kesalahan jika ada
                error={formik.touched.item_id && Boolean(formik.errors.item_id)} // Tentukan apakah ada kesalahan
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Paper sx={{ display: 'flex', alignItems: 'center', borderRadius: '1px', justifyContent: 'center' }}>
            <IconButton
              sx={{ backgroundColor: 'green', m: 1 }}
              onClick={() => formik.setFieldValue('qty', Math.max(0, formik.values.qty + 1))}
            >
              <AddIcon />
            </IconButton>
            <Typography variant="body2" fontWeight="bold" color="text.secondary" noWrap>
              {formik.values.qty}
            </Typography>
            <IconButton
              sx={{ backgroundColor: 'red', m: 1 }}
              onClick={() => formik.setFieldValue('qty', Math.max(0, formik.values.qty - 1))}
            >
              <Remove />
            </IconButton>
          </Paper>

          {formik.touched.qty && formik.errors.qty ? (
            <Typography variant="body1" color={'error'}>
              {formik.errors.qty}
            </Typography>
          ) : null}
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" onClick={handleSubmit} color="primary" fullWidth>
            Submit
          </Button>
        </Grid>
        <Grid item xs={12}>
          {success ? (
            <Alert variant="filled" severity={success ? 'success' : 'error'}>
              {success ? 'Data Berhasil Ditambahkan' : 'Data gagal Ditambahkan'}
            </Alert>
          ) : (
            ''
          )}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default PageHeader
