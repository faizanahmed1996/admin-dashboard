'use client';

import React, { useState } from 'react';
import { Container, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import Iconify from 'src/components/iconify';
import AddPermission from './add-permission';
import { useColumns } from './useColumns';
import { PERMISSIONS } from './constants';

const Permissions = () => {
  const [permissions, setPermissions] = useState(PERMISSIONS);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const handleAddPermission = (newPermission: string, isCore: boolean) => {
    const newId = (permissions.length + 1).toString();
    const newCreatedAt = new Date().toLocaleString();
    const newPermissionObj = {
      id: newId,
      name: newPermission,
      assignedTo: ['Admin'],
      createdAt: newCreatedAt,
    };
    setPermissions((prev) => [...prev, newPermissionObj]);
    console.log('New Permission:', newPermission, 'Is Core:', isCore);
  };

  const handleAction = (action: string, rowId: string) => {
    console.log(`${action} action for ID: ${rowId}`);
  };

  const columns = useColumns(handleAction);

  return (
    <Container>
      <CustomBreadcrumbs
        heading="Permissions"
        links={[{ name: 'Dashboard', href: '/dashboard' }, { name: 'Permissions' }]}
        sx={{ mb: { xs: 3, md: 5 } }}
        action={
          <Button
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
            onClick={handleOpenDialog}
          >
            New Permission
          </Button>
        }
      />
      <DataGrid
        rows={permissions}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        disableRowSelectionOnClick
      />

      <AddPermission open={openDialog} onClose={handleCloseDialog} onAdd={handleAddPermission} />
    </Container>
  );
};

export default Permissions;
