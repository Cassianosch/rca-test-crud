import { IconType } from 'react-icons/lib';
import {
    GoHome,
    GoListOrdered,
    GoTag,
    GoEye,
    GoOrganization,
    GoMegaphone,
    GoPerson,
} from 'react-icons/go';

interface MenuData {
    id: number;
    to: string;
    label: string;
    icon: IconType;
}

export const sidebarMenus: MenuData[] = [
    {
        id: 0,
        to: '/todo',
        label: 'TODO',
        icon: GoListOrdered,
    },
    {
        id: 1,
        to: '/albums',
        label: 'Albuns',
        icon: GoTag,
    },
    {
        id: 2,
        to: '/posts',
        label: 'Posts',
        icon: GoMegaphone,
    },
];
