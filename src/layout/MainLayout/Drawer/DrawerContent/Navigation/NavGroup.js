import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useState } from 'react';

// material-ui
import { Box, Collapse, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project import
import NavItem from './NavItem';

// 3rd party
import { UpOutlined, DownOutlined } from '@ant-design/icons';

// ==============================|| NAVIGATION - LIST GROUP ||============================== //

const NavGroup = ({ item }) => {
    const theme = useTheme();

    const menu = useSelector((state) => state.menu);

    const { drawerOpen } = menu;

    const [open, setOpen] = useState('');

    const iconSelectedColor = 'primary.main';

    const navCollapse = item.children?.map((menuItem) => {
        switch (menuItem.type) {
            case 'collapse':
                const Icon = menuItem.icon;
                const itemIcon = menuItem.icon ? <Icon style={{ fontSize: drawerOpen ? '1rem' : '1.25rem' }} /> : false;

                return (
                    <Box key={menuItem.id}>
                        <ListItemButton
                            sx={{
                                zIndex: 1201,
                                pl: 1.5,
                                py: !drawerOpen ? 1.25 : 1,
                                ...(drawerOpen && {
                                    '&:hover': {
                                        bgcolor: 'primary.lighter'
                                    },
                                    '&.Mui-selected': {
                                        bgcolor: 'primary.lighter',
                                        borderRight: `2px solid ${theme.palette.primary.main}`,
                                        color: iconSelectedColor,
                                        '&:hover': {
                                            color: iconSelectedColor,
                                            bgcolor: 'primary.lighter'
                                        }
                                    }
                                }),
                                ...(!drawerOpen && {
                                    '&:hover': {
                                        bgcolor: 'transparent'
                                    },
                                    '&.Mui-selected': {
                                        '&:hover': {
                                            bgcolor: 'transparent'
                                        },
                                        bgcolor: 'transparent'
                                    }
                                })
                            }}
                            onClick={() => {
                                if (open == menuItem.id) {
                                    setOpen('');
                                } else {
                                    setOpen(menuItem.id);
                                }
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 28,
                                    ...(!drawerOpen && {
                                        borderRadius: 1.5,
                                        width: 36,
                                        height: 36,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        '&:hover': {
                                            bgcolor: 'secondary.lighter'
                                        }
                                    })
                                }}
                            >
                                {itemIcon}
                            </ListItemIcon>
                            <ListItemText primary={menuItem.title} />
                            {menuItem.id == open ? <UpOutlined /> : <DownOutlined />}
                        </ListItemButton>
                        <Collapse in={menuItem.id == open} timeout="auto" unmountOnExit>
                            {menuItem.children.map((subItem) => {
                                return <NavItem key={subItem.id} item={subItem} level={1} />;
                            })}
                        </Collapse>
                    </Box>
                );
            case 'item':
                return <NavItem key={menuItem.id} item={menuItem} level={1} />;
            default:
                return (
                    <Typography key={menuItem.id} variant="h6" color="error" align="center">
                        Fix - Group Collapse or Items
                    </Typography>
                );
        }
    });

    return (
        <List
            // subheader={
            //     item.title &&
            //     drawerOpen && (
            //         <Box sx={{ pl: 3, mb: 1.5 }}>
            //             <Typography variant="subtitle2" color="textSecondary">
            //                 {item.title}
            //             </Typography>
            //             {/* only available in paid version */}
            //         </Box>
            //     )
            // }
            sx={{ mb: drawerOpen ? 1.5 : 0, py: 0, zIndex: 0 }}
        >
            {navCollapse}
        </List>
    );
};

NavGroup.propTypes = {
    item: PropTypes.object
};

export default NavGroup;
