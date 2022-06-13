import React from 'react';

// Components
import AppNavItem, { NavItemObject } from './NavItem';

// Layouts
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';

export type NavList = {
    items: Array<NavItemObject>;
    show: boolean;
    onClickModel?: () => void;
    onClickMenuItem?: (item: NavItemObject, index: number) => void;
};

const NavList: React.FC<NavList> = ({ items, show = false, onClickModel, onClickMenuItem }) => {
    const handleOnClickModel = () => {
        onClickModel && onClickModel();
    };

    return (
        <React.Fragment>
            <Drawer
                PaperProps={{
                    sx: {
                        width: 200,
                    },
                }}
                ModalProps={{ onClick: handleOnClickModel }}
                anchor="left"
                open={show}
            >
                <List>
                    {items.map((item, index) => (
                        <AppNavItem key={index} item={item} index={index} onClickNavItem={onClickMenuItem} />
                    ))}
                </List>
            </Drawer>
        </React.Fragment>
    );
};

export default NavList;
