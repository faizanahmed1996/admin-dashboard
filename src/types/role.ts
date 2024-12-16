import { PermissionModule } from "./permissions";

export type RoleData = {
  id: string;
  name: string;
  permissions?: string[];
};

export interface RoleFormData {
  name: string;
  permissions: {
    isAdmin: boolean;
    modules: {
      [key: string]: {
        read: boolean;
        write: boolean;
        create: boolean;
      };
    };
  };
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

export interface AddRoleDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (role: RoleFormData) => void;
}
