import {
    CalendarIcon,
    HomeIcon,
    Squares2X2Icon,
} from '@heroicons/react/24/outline';

const navigationConfig = [
    { name: 'Home', href: '/app', icon: HomeIcon, current: true },
    { name: 'Spaces', href: '/spaces', icon: Squares2X2Icon, current: false},
    { name: 'Calendar', href: '/calendar', icon: CalendarIcon, current: false },
];

export default navigationConfig