import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Checkbox } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';

function TableForm({page, rowsPerPage, items, searchInput, handleEdit, handleDelete}) {

  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="caption table">
        <TableHead sx={{backgroundColor:'#6D1DFD', color: 'white'}}>
          <TableRow sx={{"& th": {
            fontSize: "20px",
            color: "#fff"
            }
          }}>
            <TableCell>Id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Surname</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Balance</TableCell>
            <TableCell>Card</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Edit</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items && items.filter(item => {
            if (searchInput === '') {
              return item;
            } else if (item.name.toLowerCase().includes(searchInput.toLowerCase()) || item.surname.toLowerCase().includes(searchInput.toLowerCase())) {
              return item;
            }
          }).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item) => (
          <TableRow key={item.id} tabIndex={-1}>
            <TableCell>{item.id}</TableCell>
            <TableCell component="th" scope="row">{item.name}</TableCell>
            <TableCell>{item.surname}</TableCell>
            <TableCell>{item.gender}</TableCell>
            <TableCell>{item.balance}</TableCell>
            <TableCell>
            <Checkbox
              disabled
              color = "success"
              checked={item.hasCard}
              />
              </TableCell>
            <TableCell>{item.date}</TableCell>
            <TableCell><IconButton
              color="primary"
              icon={<EditIcon />}
              ontSize="large"
              className="textPrimary"
              onClick={() => {handleEdit(item)}}
            > <EditIcon /></IconButton>
            </TableCell>
            <TableCell>
            <IconButton
              color="primary"
              ontSize="large"
              height='100%'
              className="textPrimary"
              onClick={() => {handleDelete(item.id)}}
            > <DeleteIcon /></IconButton>
            </TableCell>
          </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default TableForm;