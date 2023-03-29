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
            <StyledTreeItem nodeId="2" labelText="Masters" labelIcon={IdcardOutlined} color="#e3742f" bgColor="#fcefe3">
                <StyledTreeItem nodeId="21" labelText="Quick Settings" labelIcon={SettingOutlined}>
                    <StyledTreeItem
                        nodeId="213"
                        labelText="Countries"
                        color="#e3742f"
                        bgColor="#fcefe3"
                        onClick={() => {
                            navigatePage('/countries');
                        }}
                    />
                    <StyledTreeItem
                        nodeId="211"
                        labelText="Counties"
                        color="#e3742f"
                        bgColor="#fcefe3"
                        onClick={() => {
                            navigatePage('/counties');
                        }}
                    />
                    <StyledTreeItem
                        nodeId="212"
                        labelText="Sub-Counties"
                        color="#e3742f"
                        bgColor="#fcefe3"
                        onClick={() => {
                            navigatePage('/subcounties');
                        }}
                    />
                    <StyledTreeItem
                        nodeId="214"
                        labelText="Locations"
                        color="#e3742f"
                        bgColor="#fcefe3"
                        onClick={() => {
                            navigatePage('/locations');
                        }}
                    />
                    <StyledTreeItem
                        nodeId="216"
                        labelText="City Codes"
                        color="#e3742f"
                        bgColor="#fcefe3"
                        onClick={() => {
                            navigatePage('/localities');
                        }}
                    />
                    <StyledTreeItem
                        nodeId="217"
                        labelText="Regions"
                        color="#e3742f"
                        bgColor="#fcefe3"
                        onClick={() => {
                            navigatePage('/regions');
                        }}
                    />
                    <StyledTreeItem
                        nodeId="218"
                        labelText="Banks"
                        color="#e3742f"
                        bgColor="#fcefe3"
                        onClick={() => {
                            navigatePage('/banks');
                        }}
                    />
                    <StyledTreeItem nodeId="219" labelText="Geo Structure" color="#e3742f" bgColor="#fcefe3" />
                    <StyledTreeItem nodeId="2110" labelText="Gender Masters" color="#e3742f" bgColor="#fcefe3" />
                    <StyledTreeItem nodeId="2111" labelText="Industry Sector" color="#e3742f" bgColor="#fcefe3" />
                    <StyledTreeItem nodeId="2112" labelText="Professions Master" color="#e3742f" bgColor="#fcefe3" />
                    <StyledTreeItem nodeId="2113" labelText="SMI Master" color="#e3742f" bgColor="#fcefe3" />
                    <StyledTreeItem nodeId="2114" labelText="Acceptable Id Types" color="#e3742f" bgColor="#fcefe3" />
                    <StyledTreeItem nodeId="2115" labelText="Hazardous Materials" color="#e3742f" bgColor="#fcefe3" />
                </StyledTreeItem>
                <StyledTreeItem nodeId="22" labelText="Configuration" labelIcon={SlidersOutlined} color="#e3742f" bgColor="#fcefe3" />
                <StyledTreeItem nodeId="23" labelText="User Groups" labelIcon={TeamOutlined} color="#e3742f" bgColor="#fcefe3" />
                <StyledTreeItem nodeId="24" labelText="Ratings" labelIcon={StarOutlined} color="#e3742f" bgColor="#fcefe3" />
                <StyledTreeItem nodeId="25" labelText="Document Setup" labelIcon={FolderOpenOutlined} color="#e3742f" bgColor="#fcefe3" />
                <StyledTreeItem nodeId="26" labelText="Merketing" labelIcon={LineChartOutlined} color="#e3742f" bgColor="#fcefe3" />
                <StyledTreeItem
                    nodeId="27"
                    labelText="Claims Master"
                    labelIcon={SafetyCertificateOutlined}
                    color="#e3742f"
                    bgColor="#fcefe3"
                />
            </StyledTreeItem>
            <StyledTreeItem nodeId="3" labelText="Underwriting" labelIcon={ReadOutlined} color="#e3742f" bgColor="#fcefe3">
                <StyledTreeItem nodeId="31" labelText="Quotations" labelIcon={DotChartOutlined}>
                    <StyledTreeItem
                        nodeId="311"
                        labelText="Motor"
                        color="#e3742f"
                        bgColor="#fcefe3"
                        onClick={() => {
                            navigatePage('/kyc');
                        }}
                    />
                    <StyledTreeItem nodeId="312" labelText="Fire" color="#e3742f" bgColor="#fcefe3" />
                    <StyledTreeItem nodeId="313" labelText="Theft" color="#e3742f" bgColor="#fcefe3" />
                    <StyledTreeItem nodeId="314" labelText="Liability" color="#e3742f" bgColor="#fcefe3" />
                    <StyledTreeItem nodeId="315" labelText="Engineering" color="#e3742f" bgColor="#fcefe3" />
                    <StyledTreeItem nodeId="316" labelText="Marine" color="#e3742f" bgColor="#fcefe3" />
                    <StyledTreeItem nodeId="317" labelText="General" color="#e3742f" bgColor="#fcefe3" />
                    <StyledTreeItem nodeId="318" labelText="Miscellaneous" color="#e3742f" bgColor="#fcefe3" />
                    <StyledTreeItem nodeId="319" labelText="Business Package" color="#e3742f" bgColor="#fcefe3" />
                </StyledTreeItem>
                <StyledTreeItem nodeId="32" labelText="New Policy" labelIcon={SlidersOutlined} color="#e3742f" bgColor="#fcefe3" />
                <StyledTreeItem nodeId="33" labelText="Endorsement" labelIcon={WalletOutlined} color="#e3742f" bgColor="#fcefe3" />
            </StyledTreeItem>
            <StyledTreeItem nodeId="4" labelText="Claims" labelIcon={CarOutlined} color="#e3742f" bgColor="#fcefe3" />
            <StyledTreeItem nodeId="5" labelText="Reinsurance" labelIcon={SyncOutlined} color="#e3742f" bgColor="#fcefe3" />
            <StyledTreeItem nodeId="6" labelText="Finance" labelIcon={DollarOutlined} color="#e3742f" bgColor="#fcefe3" />
        </TreeView>
    );
};

export default TreeNavigation;
