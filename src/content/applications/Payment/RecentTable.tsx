import React, { useEffect, useState } from 'react'
import Table from 'src/components/Table'
import { useApi } from 'src/utils/ApiHook'
const RecentTable = () => {
  const api = useApi()
  const [data, setData] = useState<any[]>([])

  useEffect(() => console.log('test'), [])

  return (
    <>
      <Table
        columns={[
          { label: 'Pelanggan', align: 'left' },
          { label: 'Barang', align: 'left' },
          { label: 'Total', align: 'left' },
        ]}
        data={[]}
        renderRow={(item, index) => (
          <>
            <td>{item.name}</td>
            <td>{item.age}</td>
          </>
        )}
      />
    </>
  )
}

export default RecentTable
