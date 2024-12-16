'use client';

import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { ROLES, COLUMNS } from './constants';
import AddRoleDialog from './add-role';
import { RoleData, RoleFormData } from 'src/types/role';
import { PermissionModule } from 'src/types/permissions';



export default function RoleView() {
  const settings = useSettingsContext();
  const [roles, setRoles] = useState<RoleData[]>(ROLES);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const handleCreateRole = (roleData: RoleFormData) => {
    console.log('roleData', roleData);
    const roleToAdd: RoleData = {
      id: (roles.length + 1).toString(),
      name: roleData.name,
      permissions: roleData.permissions?.modules
        ? Object.entries(roleData.permissions.modules).map(
            ([module, perms]: [string, PermissionModule]) =>
              `${module}: ${Object.entries(perms)
                .filter(([_, value]) => value)
                .map(([action]) => action)
                .join(', ')}`
          )
        : [],
    };

    if (roleData.permissions?.isAdmin) {
      roleToAdd.permissions?.unshift('Administrator Access');
    }

    console.log('Creating new role:', roleToAdd);
    setRoles([...roles, roleToAdd]);
    handleCloseDialog();
  };

  console.log('role', roles);
  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Roles"
        links={[
          {
            name: 'Dashboard',
            href: '/dashboard',
          },
          {
            name: 'Roles',
          },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
        action={
          <Button
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
            onClick={handleOpenDialog}
          >
            New Role
          </Button>
        }
      />

      <DataGrid
        rows={roles}
        columns={COLUMNS}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        disableRowSelectionOnClick
      />

      <AddRoleDialog open={openDialog} onClose={handleCloseDialog} onSubmit={handleCreateRole} />
      {/* <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Create New Role</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Role Name"
              value={newRole.name}
              onChange={(e) => setNewRole((prev) => ({ ...prev, name: e.target.value }))}
              required
            />
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={3}
              value={newRole.description}
              onChange={(e) => setNewRole((prev) => ({ ...prev, description: e.target.value }))}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleCreateRole} variant="contained">
            Create Role
          </Button>
        </DialogActions>
      </Dialog> */}
    </Container>
  );
}
