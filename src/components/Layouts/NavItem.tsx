import React from 'react';

// Layouts
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useHistory } from 'react-router-dom';

export type NavItemObject = {
    path: string;
    label: string;
    icon?: JSX.Element;
};

export type NavItem = {
    item: NavItemObject;
    index: number;
    onClickNavItem?: (item: NavItemObject, index: number) => void;
};

const NavItem: React.FC<NavItem> = ({ item, index, onClickNavItem }) => {
    const history = useHistory();
    const handleOnClickNavItem = (item: NavItemObject, index: number) => {
        onClickNavItem && onClickNavItem(item, index);
        history.push(item.path);
    };

    return (
        <ListItem button key={`menu-item-${index}`} onClick={() => handleOnClickNavItem(item, index)}>
            {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
            <ListItemText primary={item.label} />
        </ListItem>
    );
};

export default NavItem;
