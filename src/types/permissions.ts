export interface PermissionModule {
  read: boolean;
  write: boolean;
  create: boolean;
}

export interface RolePermissions {
  administratorAccess: {
    selectAll: boolean;
  };
  userManagement: PermissionModule;
  contentManagement: PermissionModule;
  disputesManagement: PermissionModule;
  databaseManagement: PermissionModule;
  financialManagement: PermissionModule;
  reporting: PermissionModule;
  apiControl: PermissionModule;
  repositoryManagement: PermissionModule;
  payroll: PermissionModule;
}

export interface AddPermissionProps {
  open: boolean;
  onClose: () => void;
  onAdd: (permissionName: string, isCore: boolean) => void;
}
