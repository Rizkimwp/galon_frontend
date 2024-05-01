import { Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { Theme } from '@mui/material/styles'
import React from 'react'
import { ReactNode } from 'react'
import { render } from 'react-dom'

export interface Column {
  label: string
  align?: 'center' | 'right' | 'left'
}
interface TableProps {
  data: any[] | null
  columns: Column[]
  renderRow: (item: any, index: number) => ReactNode
}
const index: React.FC<TableProps> = ({ data, columns, renderRow }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column, index) => (
              <TableCell key={index} align={column.align}>
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {!data?.length ? (
            <TableRow>
              <TableCell colSpan={columns.length}>
                <Typography textAlign={'center'}> Tidak ada data yang tersedia </Typography>
              </TableCell>
            </TableRow>
          ) : (
            data.map((item, index) => renderRow(item, index))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default index
