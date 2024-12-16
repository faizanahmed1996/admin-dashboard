import { Chip } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { ActionsDropdown } from 'src/components/actions-dropdown';

export const useColumns = (onAction: (action: string, rowId: string) => void) => {
  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
    },
    {
      field: 'assignedTo',
      headerName: 'Assigned To',
      flex: 1,
      renderCell: (params) => (
        <>
          {Array.isArray(params.value) ? (
            params.value.map((user, index) => (
              <Chip
                key={index}
                label={user}
                variant="outlined"
                sx={{
                  backgroundColor: 'rgba(0, 0, 255, 0.1)',
                  color: 'text.primary',
                  margin: '0 4px',
                }}
              />
            ))
          ) : (
            <Chip
              label={params.value}
              variant="outlined"
              sx={{
                backgroundColor: 'rgba(255, 0, 0, 0.1)',
                color: 'text.primary',
                margin: '0 4px',
              }}
            />
          )}
        </>
      ),
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      flex: 1,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      align: 'center',
      renderCell: (params) => (
        <ActionsDropdown onAction={(action) => onAction(action, params.row.id)} />
      ),
    },
  ];

  return columns;
};
