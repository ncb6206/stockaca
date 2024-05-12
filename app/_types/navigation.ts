import { IconType } from 'react-icons/lib';

export interface NavigationDataType {
  icon: IconType;
  href: string;
}

export interface NavigationItemType extends NavigationDataType {
  pathname: string;
}
