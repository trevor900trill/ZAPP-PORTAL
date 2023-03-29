import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';

// material-ui
import {
    Box,
    Link,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TablePagination,
    TableHead,
    TableRow,
    CircularProgress,
    Typography
} from '@mui/material';

// third-party

// project import
import Dot from 'components/@extended/Dot';

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

// ==============================|| ORDER TABLE - HEADER CELL ||============================== //

const headCells = [
    {
        id: 'firstName',
        align: 'left',
        disablePadding: false,
        label: 'First Name'
    },
    {
        id: 'middleName',
        align: 'left',
        disablePadding: true,
        label: 'Middle Name'
    },
    {
        id: 'surname',
        align: 'left',
        disablePadding: false,
        label: 'Surname'
    },
    {
        id: 'mobileNumber',
        align: 'left',
        disablePadding: false,
        label: 'Mobile Number'
    },
    {
        id: 'email',
        align: 'left',
        disablePadding: false,
        label: 'Email'
    },
    {
        id: 'idNumber',
        align: 'left',
        disablePadding: false,
        label: 'Id Number'
    },
    {
        id: 'occupation',
        align: 'left',
        disablePadding: false,
        label: 'Occupation'
    }
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function OrderTableHead({ order, orderBy }) {
    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.align}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        {headCell.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

OrderTableHead.propTypes = {
    order: PropTypes.string,
    orderBy: PropTypes.string
};

// ==============================|| ORDER TABLE - STATUS ||============================== //

const OrderStatus = ({ status }) => {
    let color;
    let title;

    switch (status) {
        case 0:
            color = 'warning';
            title = 'Pending';
            break;
        case 1:
            color = 'success';
            title = 'Approved';
            break;
        case 2:
            color = 'error';
            title = 'Rejected';
            break;
        default:
            color = 'primary';
            title = 'None';
    }

    return (
        <Stack direction="row" spacing={1} alignItems="center">
            <Dot color={color} />
            <Typography>{title}</Typography>
        </Stack>
    );
};

OrderStatus.propTypes = {
    status: PropTypes.number
};

// ==============================|| ORDER TABLE ||============================== //

const KYCTable = ({ rows }) => {
    const [order] = useState('asc');
    const [orderBy] = useState('trackingNo');
    const [selected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const kycs = useSelector((state) => state.kyc);

    const isSelected = (trackingNo) => selected.indexOf(trackingNo) !== -1;

    function createData(firstName, middleName, surname, mobileNumber, email, idNumber, occupation) {
        return { firstName, middleName, surname, mobileNumber, email, idNumber, occupation };
    }

    const datarows = rows.map((element) =>
        createData(
            element.firstName,
            element.middleName,
            element.surname,
            element.mobileNumber,
            element.email,
            element.idNumber,
            element.occupation
        )
    );

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Box>
            <TableContainer
                sx={{
                    width: '100%',
                    overflowX: 'auto',
                    position: 'relative',
                    display: 'block',
                    maxWidth: '100%',
                    '& td, & th': { whiteSpace: 'nowrap' }
                }}
            >
                <Table
                    aria-labelledby="tableTitle"
                    sx={{
                        '& .MuiTableCell-root:first-of-type': {
                            pl: 2
                        },
                        '& .MuiTableCell-root:last-child': {
                            pr: 3
                        }
                    }}
                >
                    <OrderTableHead order={order} orderBy={orderBy} />
                    <TableBody>
                        {kycs.isLoading ? (
                            <TableRow>
                                <TableCell colSpan={7} align="center">
                                    <CircularProgress />
                                </TableCell>
                            </TableRow>
                        ) : datarows.length != 0 ? (
                            stableSort(datarows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.trackingNo);
                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.trackingNo}
                                            selected={isItemSelected}
                                        >
                                            <TableCell align="left">{row.firstName}</TableCell>
                                            <TableCell align="left">{row.middleName}</TableCell>
                                            <TableCell align="left">{row.surname}</TableCell>
                                            <TableCell align="left">{row.mobileNumber}</TableCell>{' '}
                                            <TableCell align="left">{row.email}</TableCell>
                                            <TableCell align="left">{row.idNumber}</TableCell>
                                            <TableCell align="left">{row.occupation}</TableCell>
                                            <TableCell align="left">{row.name}</TableCell>
                                        </TableRow>
                                    );
                                })
                        ) : (
                            <TableRow>
                                <TableCell colSpan={7} align="center">
                                    No Records Found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={datarows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Box>
    );
};

export default KYCTable;
