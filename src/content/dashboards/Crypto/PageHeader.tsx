import { Typography, Avatar, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { id } from 'date-fns/locale';
import { useEffect, useState } from 'react';
import { useApi } from 'src/utils/ApiHook';
import { Courier } from 'src/utils/GeneratedApi';

function PageHeader() {
  const api = useApi()
  const [data, setData] = useState<Courier | null>(null)
  const [id, setId] = useState<number>(1)

  useEffect(() => {
    api.courier.courierControllerFindOne(id).then(res => setData(res.data))
    
  }, [])
  const user = {
    name: 'Catherine Pike',
    avatar: '/static/images/avatars/1.jpg'
  };
  const theme = useTheme();

  return (
    <Grid container alignItems="center">
      <Grid item>
        <Avatar
          sx={{
            mr: 2,
            width: theme.spacing(8),
            height: theme.spacing(8)
          }}
          variant="rounded"
          alt={data?.nama}
          src={user.avatar}
        />
      </Grid>
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Welcome, {data?.nama}!
        </Typography>
        <Typography variant="subtitle2">
          Today is a good day to start trading crypto assets!
        </Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
