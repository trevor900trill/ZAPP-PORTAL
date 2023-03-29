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
    Button,
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
        id: 'lastName',
        align: 'left',
        disablePadding: true,
        label: 'Last Name'
    },
    {
        id: 'userName',
        align: 'left',
        disablePadding: false,
        label: 'User Name'
    },
    {
        id: 'phoneNumber',
        align: 'left',
        disablePadding: false,
        label: 'Phone Number'
    },
    {
        id: 'email',
        align: 'left',
        disablePadding: false,
        label: 'Email'
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
                <TableCell key="Actions" align="left" padding="none">
                    Actions
                </TableCell>
            </TableRow>
        </TableHead>
    );
}

OrderTableHead.propTypes = {
    order: PropTypes.string,
    orderBy: PropTypes.string
};

// ==============================|| ORDER TABLE ||============================== //

const UsersTable = ({ rows, modalOpen }) => {
    const [order] = useState('asc');
    const [selected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const permissions = useSelector((state) => state.kyc);

    function createData(firstName, lastName, userName, phoneNumber, email) {
        return { firstName, lastName, userName, phoneNumber, email };
    }

    const datarows = rows.map((element) =>
        createData(element.firstName, element.lastName, element.userName, element.phoneNumber, element.email)
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
                    <OrderTableHead order={order} />
                    <TableBody>
                        {permissions.isLoading ? (
                            <TableRow>
                                <TableCell colSpan={7} align="center">
                                    <CircularProgress />
                                </TableCell>
                            </TableRow>
                        ) : datarows.length != 0 ? (
                            stableSort(datarows, getComparator(order))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            tabIndex={-1}
                                            key={row.userName}
                                        >
                                            <TableCell align="left">{row.firstName}</TableCell>
                                            <TableCell align="left">{row.lastName}</TableCell>
                                            <TableCell align="left">{row.userName}</TableCell>
                                            <TableCell align="left">{row.phoneNumber}</TableCell>
                                            <TableCell align="left">{row.email}</TableCell>
                                            <TableCell align="left">
                                                <Button
                                                    disableElevation
                                                    variant="outlined"
                                                    size="medium"
                                                    onClick={() => {
                                                        modalOpen();
                                                    }}
                                                >
                                                    Edit Roles
                                                </Button>
                                            </TableCell>
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

export default UsersTable;
