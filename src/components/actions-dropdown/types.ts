export interface MenuItem {
  label: string;
  action: string;
  color?: string;
}

export interface ActionsDropdownProps {
  items?: MenuItem[];
  onAction: (action: string) => void;
}
