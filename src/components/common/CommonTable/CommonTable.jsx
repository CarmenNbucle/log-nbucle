import React, { useState } from 'react'
import {
	Card,
	LinearProgress
} from '@mui/material'
import { DataGrid, GridOverlay } from '@mui/x-data-grid'

function CustomLoadingOverlay() {
	return (
		<GridOverlay>
			<div style={{ position: 'absolute', top: 0, width: '100%' }}>
				<LinearProgress />
			</div>
		</GridOverlay>
	)
}

const CommonTable = ({ data, columns }) => {

	return (
		<Card style={{background: '#323232', boxShadow: 'none', marginLeft: '50px'}}>
			<DataGrid
				autoHeight
				rows={data}
				columns={columns}
				pageSize={10}
				rowsPerPageOptions={[10]}
				disableSelectionOnClick
				pagination
				components={{
					LoadingOverlay: CustomLoadingOverlay
				}}
				style={{background: '#323232', border: 'none', boxShadow: 'none'}}
			/>
		</Card>
	)
}

export default CommonTable
