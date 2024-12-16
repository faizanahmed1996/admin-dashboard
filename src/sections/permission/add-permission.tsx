import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { AddPermissionProps } from 'src/types/permissions';

const AddPermission = ({ open, onClose, onAdd }: AddPermissionProps) => {
  const [newPermission, setNewPermission] = useState<string>('');
  const [isCore, setIsCore] = useState<boolean>(false);

  const handleAdd = () => {
    onAdd(newPermission, isCore);
    setNewPermission('');
    setIsCore(false);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Add New Permission</DialogTitle>
      <DialogContent>
        <Typography variant="body2" sx={{ mb: 1 }}>
          Permissions you may use and assign to your users.
        </Typography>
        <TextField
          autoFocus
          margin="dense"
          label="Permission Name"
          fullWidth
          value={newPermission}
          onChange={(e) => setNewPermission(e.target.value)}
        />
        <FormControlLabel
          control={<Checkbox checked={isCore} onChange={(e) => setIsCore(e.target.checked)} />}
          label="Set as core permission"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Discard
        </Button>
        <Button onClick={handleAdd} variant="contained" color="primary">
          Create Permission
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddPermission;
