// import React, { useState } from 'react';
// import { IconButton, MenuItem } from '@mui/material';
// import CustomPopover from 'src/components/custom-popover/custom-popover';
// import Iconify from 'src/components/iconify';

// interface ActionsDropdownProps {
//   rowId: string;
//   onAction: (action: string) => void;
// }

// const ActionsDropdown: React.FC<ActionsDropdownProps> = ({ onAction }) => {
//   const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

//   const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleCloseMenu = () => {
//     setAnchorEl(null);
//   };

//   const handleMenuItem = (action: string) => {
//     onAction(action);
//     handleCloseMenu();
//   };

//   return (
//     <>
//       <IconButton onClick={handleOpenMenu} size="small">
//         <Iconify icon="ph:dots-three-outline-vertical-fill" />
//       </IconButton>

//       <CustomPopover open={anchorEl} anchorEl={anchorEl} onClose={handleCloseMenu}>
//         <MenuItem onClick={() => handleMenuItem('View')}>View</MenuItem>
//         <MenuItem onClick={() => handleMenuItem('Edit')}>Edit</MenuItem>
//         <MenuItem onClick={() => handleMenuItem('Delete')} sx={{ color: 'error.main' }}>
//           Delete
//         </MenuItem>
//       </CustomPopover>
//     </>
//   );
// };

// export default ActionsDropdown;
