import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { IconButton } from '@mui/material';
import TreeView from '@mui/lab/TreeView';
import TreeItem, { treeItemClasses } from '@mui/lab/TreeItem';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

import {
    DashboardOutlined,
    SettingOutlined,
    TeamOutlined,
    CaretDownOutlined,
    LineChartOutlined,
    SyncOutlined,
    FolderOpenOutlined,
    WalletOutlined,
    DotChartOutlined,
    IdcardOutlined,
    StarOutlined,
    SlidersOutlined,
    BankOutlined,
    CaretRightOutlined,
    DollarOutlined,
    CarOutlined,
    ReadOutlined,
    SafetyCertificateOutlined,
    FundProjectionScreenOutlined,
    DiffOutlined
} from '@ant-design/icons';

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
    color: theme.palette.text.secondary,
    [`& .${treeItemClasses.content}`]: {
        color: theme.palette.text.secondary,
        borderTopRightRadius: theme.spacing(2),
        borderBottomRightRadius: theme.spacing(2),
        paddingRight: theme.spacing(1),
        fontWeight: theme.typography.fontWeightMedium,
        fontSize: '6px',
        '&.Mui-expanded': {
            fontWeight: theme.typography.fontWeightRegular
        },
        '&:hover': {
            backgroundColor: theme.palette.action.hover
        },
        '&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused': {
            backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
            color: 'var(--tree-view-color)'
        },
        [`& .${treeItemClasses.label}`]: {
            fontWeight: 'inherit',
            color: 'inherit'
        }
    },
    [`& .${treeItemClasses.group}`]: {
        marginLeft: 0,
        [`& .${treeItemClasses.content}`]: {
            paddingLeft: theme.spacing(2)
        }
    }
}));

function StyledTreeItem(props) {
    const { bgColor, color, labelIcon: LabelIcon, labelInfo, labelText, ...other } = props;

    return (
        <StyledTreeItemRoot
            label={
                <Box sx={{ display: 'flex', alignItems: 'center', p: 0.5, pr: 0 }}>
                    <Box component={LabelIcon} color="primary" sx={{ mr: 1, p: 1 }} />
                    <Typography variant="h6" sx={{ fontWeight: 'inherit', flexGrow: 1 }}>
                        {labelText}
                    </Typography>
                    <Typography variant="caption" color="inherit">
                        {labelInfo}
                    </Typography>
                </Box>
            }
            style={{
                '--tree-view-color': color,
                '--tree-view-bg-color': bgColor
            }}
            {...other}
        />
    );
}

StyledTreeItem.propTypes = {
    bgColor: PropTypes.string,
    color: PropTypes.string,
    labelIcon: PropTypes.elementType,
    labelInfo: PropTypes.string,
    labelText: PropTypes.string.isRequired
};

const TreeNavigation = () => {
    const navigate = useNavigate();

    const navigatePage = (page) => {
        navigate(page);
    };

    return (
        <TreeView
            aria-label="insurance"
            defaultCollapseIcon={
                <IconButton sx={{ fontSize: '6px' }}>
                    <CaretDownOutlined />
                </IconButton>
            }
            defaultExpandIcon={
                <IconButton sx={{ fontSize: '6px' }}>
                    <CaretRightOutlined />
                </IconButton>
            }
            defaultEndIcon={<div style={{ width: 24 }} />}
            sx={{ height: '100%', flexGrow: 1, maxWidth: 400, overflowY: 'auto', fontSize: '6px', marginTop: 1 }}
        >
            <StyledTreeItem
                nodeId="1"
                labelText="Dashboard"
                labelIcon={DashboardOutlined}
                color="#e3742f"
                bgColor="#fcefe3"
                onClick={() => {
                    navigatePage('/');
                }}
            />
            <StyledTreeItem nodeId="2" labelText="Leave" labelIcon={IdcardOutlined} color="#e3742f" bgColor="#fcefe3">
                <StyledTreeItem
                    nodeId="21"
                    labelText="Apply Leave"
                    labelIcon={SlidersOutlined}
                    color="#e3742f"
                    bgColor="#fcefe3"
                    onClick={() => {
                        navigatePage('/leave');
                    }}
                />
                {/* <StyledTreeItem
                    nodeId="22"
                    labelText="Leave History"
                    labelIcon={TeamOutlined}
                    color="#e3742f"
                    bgColor="#fcefe3"
                    onClick={() => {
                        navigatePage('/leave');
                    }}
                /> */}
                <StyledTreeItem
                    nodeId="23"
                    labelText="Leave Types"
                    labelIcon={TeamOutlined}
                    color="#e3742f"
                    bgColor="#fcefe3"
                    onClick={() => {
                        navigatePage('/leaveTypes');
                    }}
                />
                {/* <StyledTreeItem
                    nodeId="24"
                    labelText="Staff"
                    labelIcon={TeamOutlined}
                    color="#e3742f"
                    bgColor="#fcefe3"
                    onClick={() => {
                        navigatePage('/leave');
                    }}
                /> */}
            </StyledTreeItem>
            <StyledTreeItem nodeId="3" labelText="PayRoll" labelIcon={ReadOutlined} color="#e3742f" bgColor="#fcefe3">
                <StyledTreeItem nodeId="32" labelText="Payslips" labelIcon={SlidersOutlined} color="#e3742f" bgColor="#fcefe3" />
                <StyledTreeItem nodeId="33" labelText="Update Information" labelIcon={WalletOutlined} color="#e3742f" bgColor="#fcefe3" />
            </StyledTreeItem>
        </TreeView>
    );
};

export default TreeNavigation;
