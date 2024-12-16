import { GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import Iconify from 'src/components/iconify';
import { PermissionModule } from 'src/types/permissions';

export const ROLES = [
  {
    id: '1',
    name: 'Admin',
    description: 'Full system access',
    permissions: ['read', 'write', 'delete'],
  },
  {
    id: '2',
    name: 'Editor',
    description: 'Content management',
    permissions: ['read', 'write'],
  },
  {
    id: '3',
    name: 'Viewer',
    description: 'Read-only access',
    permissions: ['read'],
  },
];

export const PERMISSION: PermissionModule = {
  read: false,
  write: false,
  create: false,
};

export const COLUMNS: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    width: 90,
  },
  {
    field: 'name',
    headerName: 'Role Name',
    flex: 1,
    minWidth: 150,
  },
  {
    field: 'permissions',
    headerName: 'Permissions',
    flex: 1,
    minWidth: 150,
    renderCell: (params) => params.value?.join(', ') || 'No permissions',
  },
  {
    type: 'actions',
    field: 'actions',
    headerName: 'Actions',
    width: 100,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    getActions: (params) => [
      <GridActionsCellItem
        key="view"
        icon={<Iconify icon="solar:eye-bold" />}
        label="View"
        onClick={() => console.info('VIEW', params.row.id)}
      />,
      <GridActionsCellItem
        key="edit"
        icon={<Iconify icon="solar:pen-bold" />}
        label="Edit"
        onClick={() => console.info('EDIT', params.row.id)}
      />,
      <GridActionsCellItem
        key="delete"
        icon={<Iconify icon="solar:trash-bin-trash-bold" />}
        label="Delete"
        onClick={() => {
          console.log('col id', params.row.id);
        }}
        sx={{ color: 'error.main' }}
      />,
    ],
  },
];
