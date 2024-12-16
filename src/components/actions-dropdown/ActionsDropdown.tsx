import React, { MouseEvent, useState } from 'react';
import { IconButton, MenuItem } from '@mui/material';
import { MENU_ITEMS } from './constants';
import { ActionsDropdownProps } from './types';
import Iconify from '../iconify';
import CustomPopover from '../custom-popover';

const ActionsDropdown = ({ items = MENU_ITEMS, onAction }: ActionsDropdownProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleOpenMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleMenuItem = (action: string) => {
    onAction(action);
    handleCloseMenu();
  };

  return (
    <>
      <IconButton onClick={handleOpenMenu} size="small">
        <Iconify icon="ph:dots-three-outline-vertical-fill" />
      </IconButton>

      <CustomPopover open={anchorEl} anchorEl={anchorEl} onClose={handleCloseMenu}>
        {items.map((item, idx) => (
          <MenuItem
            key={idx}
            sx={{ color: item.color }}
            onClick={() => handleMenuItem(item.action)}
          >
            {item.label}
          </MenuItem>
        ))}
      </CustomPopover>
    </>
  );
};

export default ActionsDropdown;
