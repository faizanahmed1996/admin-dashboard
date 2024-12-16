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

export const PERMISSIONS = [
  {
    id: '1',
    name: 'Management',
    assignedTo: ['Administrator', 'Editor'],
    createdAt: new Date('2021-04-14T20:43:00').toLocaleString(),
  },
  {
    id: '2',
    name: 'Manage Billing & Roles',
    assignedTo: ['Administrator', 'Editor'],
    createdAt: new Date('2021-09-16T17:20:00').toLocaleString(),
  },
  {
    id: '3',
    name: 'Add & Remove Users',
    assignedTo: ['Administrator'],
    createdAt: new Date('2021-10-14T10:20:00').toLocaleString(),
  },
  {
    id: '4',
    name: 'Project Planning',
    assignedTo: ['Administrator'],
    createdAt: new Date('2021-10-14T10:20:00').toLocaleString(),
  },
  {
    id: '5',
    name: 'Manage Email Sequences',
    assignedTo: ['Administrator'],
    createdAt: new Date('2021-08-23T14:00:00').toLocaleString(),
  },
  {
    id: '6',
    name: 'Client Communication',
    assignedTo: ['Administrator'],
    createdAt: new Date('2021-04-15T11:30:00').toLocaleString(),
  },
  {
    id: '7',
    name: 'Only View',
    assignedTo: ['Administrator'],
    createdAt: new Date('2021-12-04T20:15:00').toLocaleString(),
  },
  {
    id: '8',
    name: 'Financial Management',
    assignedTo: ['Administrator'],
    createdAt: new Date('2021-02-25T10:30:00').toLocaleString(),
  },
];

const role_permission_1 = {
  main_module: 'User_management',
  module_name: 'Role_permissions',
  view_access: true,
  create_access: true,
  update_access: true,
  delete_access: true,
  role: '1',
};
const role_permission = {
  id: 7,
  main_module: 'User_management',
  module_name: 'Role_permissions',
  view_access: true,
  create_access: true,
  update_access: true,
  delete_access: true,
  role: 1,
};
