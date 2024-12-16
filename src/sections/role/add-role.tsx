import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Checkbox,
  Button,
  Typography,
  Box,
} from '@mui/material';
import { AddRoleDialogProps, RolePermissions } from 'src/types/role';
import { PermissionModule } from 'src/types/permissions';
import { PERMISSION } from './constants';

const AddRoleDialog = ({ open, onClose, onSubmit }: AddRoleDialogProps) => {
  const [roleName, setRoleName] = useState<string>('');
  const [permissions, setPermissions] = useState<RolePermissions>({
    administratorAccess: { selectAll: false },
    userManagement: { ...PERMISSION },
    contentManagement: { ...PERMISSION },
    disputesManagement: { ...PERMISSION },
    databaseManagement: { ...PERMISSION },
    financialManagement: { ...PERMISSION },
    reporting: { ...PERMISSION },
    apiControl: { ...PERMISSION },
    repositoryManagement: { ...PERMISSION },
    payroll: { ...PERMISSION },
  });

  const handleSelectAllChange = (checked: boolean) => {
    setPermissions((prev) => ({
      ...prev,
      administratorAccess: { selectAll: checked },
      userManagement: { read: checked, write: checked, create: checked },
      contentManagement: { read: checked, write: checked, create: checked },
      disputesManagement: { read: checked, write: checked, create: checked },
      databaseManagement: { read: checked, write: checked, create: checked },
      financialManagement: { read: checked, write: checked, create: checked },
      reporting: { read: checked, write: checked, create: checked },
      apiControl: { read: checked, write: checked, create: checked },
      repositoryManagement: { read: checked, write: checked, create: checked },
      payroll: { read: checked, write: checked, create: checked },
    }));
  };

  const handlePermissionChange = (
    module: keyof Omit<RolePermissions, 'administratorAccess'>,
    action: keyof PermissionModule,
    checked: boolean
  ) => {
    setPermissions((prev) => ({
      ...prev,
      [module]: {
        ...prev[module],
        [action]: checked,
      },
    }));
  };

  const handleSubmit = () => {
    if (!roleName.trim()) {
      alert('Role name is required');
      return;
    }

    const formattedPermissions = {
      name: roleName,
      permissions: {
        isAdmin: permissions.administratorAccess.selectAll,
        modules: Object.entries(permissions)
          .filter(([key]) => key !== 'administratorAccess')
          .reduce(
            (acc, [module, perms]) => ({
              ...acc,
              [module]: {
                read: perms.read,
                write: perms.write,
                create: perms.create,
              },
            }),
            {}
          ),
      },
    };
    console.log('Submitting role with permissions:', formattedPermissions);
    onSubmit({
      name: roleName,
      permissions: {
        isAdmin: permissions.administratorAccess.selectAll,
        modules: {
          userManagement: permissions.userManagement,
          contentManagement: permissions.contentManagement,
          disputesManagement: permissions.disputesManagement,
          databaseManagement: permissions.databaseManagement,
          financialManagement: permissions.financialManagement,
          reporting: permissions.reporting,
          apiControl: permissions.apiControl,
          repositoryManagement: permissions.repositoryManagement,
          payroll: permissions.payroll,
        },
      },
    });
    onClose();
  };

  const renderPermissionRow = (
    label: string,
    module: keyof Omit<RolePermissions, 'administratorAccess'>
  ) => (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        py: 1,
        borderBottom: '1px solid #eee',
      }}
    >
      <Typography sx={{ flex: 1 }}>{label}</Typography>
      <Box sx={{ display: 'flex', gap: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Checkbox
            size="small"
            checked={permissions[module].read}
            onChange={(e) => handlePermissionChange(module, 'read', e.target.checked)}
          />
          <Typography variant="body2">Read</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Checkbox
            size="small"
            checked={permissions[module].write}
            onChange={(e) => handlePermissionChange(module, 'write', e.target.checked)}
          />
          <Typography variant="body2">Write</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Checkbox
            size="small"
            checked={permissions[module].create}
            onChange={(e) => handlePermissionChange(module, 'create', e.target.checked)}
          />
          <Typography variant="body2">Create</Typography>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ pb: 1 }}>Add Role</DialogTitle>
      <DialogContent sx={{ pb: 2 }}>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Set Role Permissions
        </Typography>

        <TextField
          autoFocus
          placeholder="Role Name"
          fullWidth
          size="small"
          value={roleName}
          onChange={(e) => setRoleName(e.target.value)}
          sx={{ mb: 3 }}
        />

        <Box sx={{ mb: 2 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              py: 1,
              borderBottom: '1px solid #eee',
            }}
          >
            <Typography>Administrator Access</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Checkbox
                size="small"
                checked={permissions.administratorAccess.selectAll}
                onChange={(e) => handleSelectAllChange(e.target.checked)}
              />
              <Typography variant="body2">Select All</Typography>
            </Box>
          </Box>

          {renderPermissionRow('User Management', 'userManagement')}
          {renderPermissionRow('Content Management', 'contentManagement')}
          {renderPermissionRow('Disputes Management', 'disputesManagement')}
          {renderPermissionRow('Database Management', 'databaseManagement')}
          {renderPermissionRow('Financial Management', 'financialManagement')}
          {renderPermissionRow('Reporting', 'reporting')}
          {renderPermissionRow('API Control', 'apiControl')}
          {renderPermissionRow('Repository Management', 'repositoryManagement')}
          {renderPermissionRow('Payroll', 'payroll')}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ color: 'text.secondary' }}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{
            bgcolor: 'primary.main',
            '&:hover': { bgcolor: 'primary.dark' },
          }}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddRoleDialog;
