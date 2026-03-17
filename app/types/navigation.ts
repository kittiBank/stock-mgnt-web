export interface NavMenuItemChild {
  label: string;
  href: string;
  icon?: string;
}

export interface NavMenuItem {
  label: string;
  href: string;
  icon: string;
  children?: NavMenuItemChild[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}
