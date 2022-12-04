import { useEffect, useState } from "react";
import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Checkbox, FormControlLabel, MenuItem, Stack, TextField } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import TablePagination from '@mui/material/TablePagination';
import './App.css';
// import EditForm from "./components/EditForm";
// import ModalWindow from "./components/EditForm";

function App() {

  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState('');
  const [searchOutput, setSearchOutput] = useState([]);

  // useEffect(()=>{
  //   debugger
  //     setSearchOutput([]);
  //     items?.filter(val=>{
  //       if(searchInput && val.name.toLowerCase().includes(searchInput.toLowerCase()))
  //         setSearchOutput(searchOutput=>[...searchOutput, val])
  //     })
  // }, [searchInput, items])

  const [items, setItems] = useState(null);
  const [order, setOrder] = useState("aplhabet");
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [wasDeleted, setWasDeleted] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [gender, setGender] = useState("male");
  const [balance, setBalance] = useState(0);
  const [hasCard, setHasCard] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - items.length) : 0;

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setName("");
    setSurname("");
    setGender("male");
    setBalance(0);
    setHasCard(false);
    localStorage.removeItem('id');
  }

  const getList = () => {
    fetch("http://localhost:3001/items").then((res) => {
        return res.json();
    }).then((resp) => {
        setItems(resp.sort((a, b) => a.name.localeCompare(b.name) || a.surname.localeCompare(b.surname)));
    }).catch((err) => {
        console.log(err.message);
    })
  }

  const handleDelete = (id) => {
    fetch("http://localhost:3001/items/" + id, {
        method: "DELETE"
    }).then((res) => {
    }).catch((err) => {
        console.log(err.message)
    })
    setWasDeleted(prev=>!prev);
    getList();
    checkOrder();
  }
  /////////////////////////EDIT CARD///////////////////
  const handleEdit = (item) => {
    setEdit(true);
    setId(item.id);
    setName(item.name);
    setSurname(item.surname);
    setGender(item.gender);
    setBalance(item.balance);
    setHasCard(item.hasCard);
    handleOpen();
    localStorage.setItem('id', item.id);
  }

  const saveEdit = () => {
    const id = localStorage.getItem('id');
    const newData = {name, surname, gender, balance, hasCard}; //date
    fetch("http://localhost:3001/items/"+id, {
      method:"PATCH",
      headers:{"content-type":"application/json"},
      body: JSON.stringify(newData)
    }).catch((err) => {
      console.log(err.message);
    })
    localStorage.removeItem('id');
    handleClose();
    checkOrder();
  }


  /////////////////////////ADD CARD///////////////////
  const handleAdd = (e) => {
    setEdit(false);
    handleOpen();
  }

  const saveAdd=()=>{
    const day = String(new Date().getDate()).padStart(2, '0');
    const month = String(new Date().getMonth() + 1).padStart(2, '0');
    const year = new Date().getFullYear();
    const date = day + '.' + month + '.' + year;
    const newData = {name, surname, gender, balance, hasCard, date};
    fetch("http://localhost:3001/items", {
      method:"POST",
      headers:{"content-type":"application/json"},
      body:JSON.stringify(newData)
    }).then((res)=>{
      //?
    }).catch((err)=>{
      console.log(err.message)
    })
    handleClose();
    checkOrder();
  }

    const handleChangeName = (event) => {
        setName(event.target.value);
    };

    const handleChangeSurname = (event) => {
        setSurname(event.target.value);
    }

    const handleChangeGender = (event) => {
      setGender(event.target.value);
    }

    const handleChangeBalance = (event) => {
        setBalance(event.target.value);
    }

    const handleCardChange = (event) => {
      //   setHasCard(prev=>!prev);
    }

    const handleChangeOrder = (event) => {
      debugger
      setOrder(event?.target.value);
      checkOrder(event?.target.value);
    }

    const checkOrder  = (e) => {
      const currentOrder = e || order;
      (currentOrder === 'aplhabet') ? sortByAlphabet() : sortByDate();
      // setOrder(currentOrder);
    }

    const sortByAlphabet = () => {
      const sorted = [...items].sort((a, b) => a.name.localeCompare(b.name) || a.surname.localeCompare(b.surname));
      setItems(sorted);
    }

    const sortByDate = () => {
      const sorted = [...items].sort(function(a, b){
        const aa = a.date.split('.').reverse().join();
        const bb = b.date.split('.').reverse().join();
        return aa > bb ? -1 : (aa < bb ? 1 : 0);
      });
      // const sorted = [...items].sort((a, b) => new Date(b.date) - new Date(a.date));
      debugger
      setItems(sorted);
    }

    // const cancelSearch = () => {
    //   setSearch("");
    //   requestSearch(search);
    // };
  // const initialValue = { name: "", surname: "", gender: "", balance: "", hasCArds: false, date: "" }
  // const [formData, setFormData] = useState(initialValue)
  // const handleClose = () => {
  //   setOpen(false);
  //   setFormData(initialValue)
  // };
  // const onChange = (e) => {
  //   const { value, id } = e.target
  //   // console.log(value,id)
  //   setFormData({ ...formData, [id]: value })
  // }
  // const handleFormSubmit = () => {
  //   if (formData.id) {
  //     //updating a user 
  //     const confirm = window.confirm("Are you sure, you want to update this row ?")
  //     confirm && fetch("http://localhost:3001/items" + `/${formData.id}`, {
  //       method: "PUT", body: JSON.stringify(formData), headers: {
  //         'content-type': "application/json"
  //       }
  //     }).then(resp => resp.json())
  //       .then(resp => {
  //         handleClose()
  //         // getUsers()

  //       })
  //   } else {
  //     // adding new user
  //     fetch("http://localhost:3001/items", {
  //       method: "POST", body: JSON.stringify(formData), headers: {
  //         'content-type': "application/json"
  //       }
  //     }).then(resp => resp.json())
  //       .then(resp => {
  //         handleClose()
  //         // getUsers()
  //       })
  //   }
  // }

  
  useEffect(() => {
    getList();
  }, [name, surname, balance, gender, wasDeleted, page])

  return (
    <>
    <Box sx={{ m: 10 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <TextField
          id="search-bar"
          className="text"
          // onInput={(e) => {
          //   setSearch(e.target.value);
          // }}
          variant="outlined"
          placeholder="Search..."
          onChange={e=>setSearchInput(e.target.value)} 
        // onChange={filterData}

        // value={search}
        // onChange={(searchVal) => requestSearch(searchVal)}
        // onCancelSearch={() => cancelSearch()}
        />
        <Button 
          sx={{width: 150}}
          variant="outlined"
          onClick={handleAdd}>
            ADD
        </Button>
      </Box>
      <TextField
          sx={{width: 200, mb: 3}}
          select
          label="Sort"
          id="outlined-select-currency"
          onChange={handleChangeOrder}
          defaultValue={order}
          >
          <MenuItem value="aplhabet">
              {"aplhabetical order"}
          </MenuItem>
              <MenuItem value="date">
              {"date"}
          </MenuItem>
        </TextField>
      {edit ? 
          <Modal //edit
                open={open}
                onClose={handleClose}
            >
            <Box sx={boxStyle}>
                <Stack spacing={3}>
                <TextField
                    label="Name"
                    value={name}
                    id="outlined-required"
                    onChange={handleChangeName}
                />
                <TextField
                    label="Surname"
                    value={surname}
                    id="outlined-required"
                    onChange={handleChangeSurname}
                />
                <TextField
                    label="Balance"
                    value={balance}
                    type="number"
                    id="outlined-required"
                    autocomplete="off"
                    onChange={handleChangeBalance}
                />
                <FormControlLabel
                    label="Has card"
                    control={
                    <Checkbox
                        checked={hasCard}
                        onChange={()=>setHasCard(!hasCard)}
                    />
                    }
                />
                <TextField
                    select
                    label="Select gender"
                    id="outlined-select-currency"
                    onChange={handleChangeGender}
                    defaultValue={gender}
                    >
                    <MenuItem value="male">
                        {"male"}
                    </MenuItem>
                        <MenuItem value="female">
                        {"female"}
                    </MenuItem>
                </TextField>
                <Button disabled={false} 
                onClick={saveEdit} 
                variant="contained">EDIT</Button>
            </Stack>
            </Box>
          </Modal>  
          :
          <Modal //add
              open={open}
              onClose={handleClose}
          >
            <Box sx={boxStyle}>
                <Stack spacing={3}>
                <TextField
                    label="Name"
                    value={name}
                    id="outlined-required"
                    onChange={handleChangeName}
                />
                <TextField
                    label="Surname"
                    value={surname}
                    id="outlined-required"
                    onChange={handleChangeSurname}
                />
                <TextField
                    label="Balance"
                    value={balance}
                    type="number"
                    id="outlined-required"
                    autocomplete="off"
                    onChange={handleChangeBalance}
                />
                <FormControlLabel
                    label="Has card"
                    control={
                    <Checkbox
                        checked={hasCard}
                        onChange={()=>setHasCard(!hasCard)}
                    />
                    }
                />
                <TextField
                    select
                    label="Select gender"
                    id="outlined-select-currency"
                    onChange={handleChangeGender}
                    defaultValue={gender}
                    >
                    <MenuItem value="male">
                        {"male"}
                    </MenuItem>
                        <MenuItem value="female">
                        {"female"}
                    </MenuItem>
                </TextField>
                <Button disabled={false} onClick={saveAdd} variant="contained">ADD</Button>
            </Stack>
            </Box>
          </Modal>  
        }
      <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="caption table">
              <TableHead sx={{backgroundColor:'#6D1DFD', color: 'white'}}>
                <TableRow>
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
                {items && items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item) => ( // пагинация
                /* {searchInput==='' ? items.map((item) => { */
                  // return (
                  // <RowsComponent data={value.length > 0 ? tableFilter : dataSource}/>
                  <TableRow key={item.id}
                  tabIndex={-1}>
                    <TableCell align="right">{item.id}</TableCell>
                    <TableCell component="th" scope="row">{item.name}</TableCell>
                    <TableCell align="right">{item.surname}</TableCell>
                    <TableCell align="right">{item.gender}</TableCell>
                    <TableCell align="right">{item.balance}</TableCell>
                    <TableCell align="right">
                      <Checkbox
                      disabled
                      color = "success"
                      checked={item.hasCard}
                      />
                      </TableCell>
                    <TableCell align="right">{item.date}</TableCell>
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
              {/* {emptyRows > 0 && (Array.from(Array(emptyRows).map(()=>{ return(
                for (let i = 1; i <= emptyRows; i++) {
                <TableRow
                  // style={{
                  //   height: 53*emptyRows,
                  // }}
                >
                  <TableCell colSpan={9} />
                </TableRow>
                })}
              )))} */}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination //ломает CRUD операции
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={items?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
    </>
  );
}

export default App;

const boxStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
