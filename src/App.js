import { useEffect, useState } from "react";
import { Checkbox, FormControlLabel, MenuItem, Stack, TextField } from "@mui/material";
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TablePagination from '@mui/material/TablePagination';
import TableForm from "./components/Table";

function App() {
  const url = "http://localhost:3001/items/";
  const [items, setItems] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [order, setOrder] = useState("alphabet");
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [wasDeleted, setWasDeleted] = useState(false);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [gender, setGender] = useState("male");
  const [balance, setBalance] = useState(0);
  const [hasCard, setHasCard] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setName("");
    setSurname("");
    setGender("male");
    setBalance(0);
    setHasCard(false);
    setEdit(false);
    localStorage.removeItem('id');
  }

  const getList = () => {
    fetch(url).then((res) => {
      return res.json();
    }).then((resp) => {
      setItems(resp.sort((a, b) => a.name.localeCompare(b.name) || a.surname.localeCompare(b.surname)));
    }).catch((err) => {
      console.log(err.message);
    })
  }

  const handleDelete = (id) => {
    fetch(url + id, {
      method: "DELETE"
    }).catch((err) => {
      console.log(err.message)
    })
    setWasDeleted(prev=>!prev);
    getList();
    checkOrder();
  }

  const handleEdit = (item) => {
    setEdit(true);
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
    const newData = {name, surname, gender, balance, hasCard};
    fetch(url+id, {
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

  const handleAdd = () => {
    setEdit(false);
    handleOpen();
  }

  const saveAdd=()=>{
    const day = String(new Date().getDate()).padStart(2, '0');
    const month = String(new Date().getMonth() + 1).padStart(2, '0');
    const year = new Date().getFullYear();
    const date = day + '.' + month + '.' + year;
    const newData = {name, surname, gender, balance, hasCard, date};
    fetch(url, {
      method:"POST",
      headers:{"content-type":"application/json"},
      body:JSON.stringify(newData)
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

  const handleChangeOrder = (event) => {
    setOrder(event?.target.value);
    checkOrder(event?.target.value);
  }

  const checkOrder  = (e) => {
    const currentOrder = e || order;
    (currentOrder === 'alphabet') ? sortByAlphabet() : sortByDate();
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
    setItems(sorted);
  }

  useEffect(() => {
    getList();
  }, [name, surname, balance, gender, hasCard, wasDeleted])

  return (
    <>
      <Box sx={{ m: 10 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <TextField
            id="search-bar"
            className="text"
            variant="outlined"
            placeholder="Search..."
            onChange={e=>setSearchInput(e.target.value)} 
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
          <MenuItem value="alphabet">
            {"alphabetical order"}
          </MenuItem>
            <MenuItem value="date">
            {"date"}
          </MenuItem>
        </TextField>
        <Modal open={open} onClose={handleClose}>
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
              <Checkbox checked={hasCard} onChange={()=>setHasCard(!hasCard)}/>
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
              onClick={edit ? saveEdit : saveAdd} 
              variant="contained">{edit ? "EDIT" : "ADD"}
            </Button>
          </Stack>
          </Box>
        </Modal>  
        <TableForm page={page} rowsPerPage={rowsPerPage} items={items}
          searchInput={searchInput} handleEdit={handleEdit} handleDelete={handleDelete}
        />
        <TablePagination
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
