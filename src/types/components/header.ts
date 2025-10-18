export interface HeaderProps {
  isTransparent?: boolean;
  showNavigation?: boolean;
  onMenuToggle?: (isOpen: boolean) => void;
}

export interface NavItem {
  title: string;
  link: string;
  icon?: string;
  children?: NavItem[];
}
