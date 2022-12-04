import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Checkbox, FormControlLabel, MenuItem, Stack, TextField } from "@mui/material";

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

function ModalWindow({open, handleClose, checkOrder, edit, getList, saveEdit, saveAdd }) {
    // , name, surname, gender, balance, hasCard
    const [newItem, setNewItem] = useState({});
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [gender, setGender] = useState("male");
    const [balance, setBalance] = useState(0);
    const [hasCard, setHasCard] = useState(false);

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
    

//   const saveEdit = () => {
//     const id = localStorage.getItem('id');
//     const newData = {name, surname, gender, balance, hasCard};
//     fetch("http://localhost:3001/items/"+id, {
//       method:"PATCH",
//       headers:{"content-type":"application/json"},
//       body: JSON.stringify(newData)
//     }).catch((err) => {
//       console.log(err.message);
//     })
//     localStorage.removeItem('id');
//     handleClose();
//     checkOrder();
//   }

//   const saveAdd=()=>{
//     const day = String(new Date().getDate()).padStart(2, '0');
//     const month = String(new Date().getMonth() + 1).padStart(2, '0');
//     const year = new Date().getFullYear();
//     const date = day + '.' + month + '.' + year;
//     const newData = {name, surname, gender, balance, hasCard, date};
//     fetch("http://localhost:3001/items", {
//       method:"POST",
//       headers:{"content-type":"application/json"},
//       body:JSON.stringify(newData)
//     }).catch((err)=>{
//       console.log(err.message)
//     })
//     handleClose();
//     checkOrder();
//   }

  useEffect(() => {
    // getList();
    setNewItem({name: name, surname: surname, gender: gender, balance: balance, hasCard: hasCard})
  }, [name, surname, balance, gender, hasCard])
  
  return (
        <Modal
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
                onClick={edit ? saveEdit(newItem) : saveAdd(newItem)} 
                variant="contained">{edit ? "EDIT" : "ADD"}</Button>
            </Stack>
            </Box>
          </Modal>      

  );
}

export default ModalWindow;

// //  <Modal 
// //               open={open}
// //               onClose={handleClose}
// //           >
// //             <Box sx={style}>
// //                 <Stack spacing={3}>
// //                 <TextField
// //                     label="Name"
// //                     value={name}
// //                     id="outlined-required"
// //                     onChange={handleChangeName}
// //                 />
// //                 <TextField
// //                     label="Surname"
// //                     value={surname}
// //                     id="outlined-required"
// //                     onChange={handleChangeSurname}
// //                 />
// //                 <TextField
// //                     label="Balance"
// //                     value={balance}
// //                     type="number"
// //                     id="outlined-required"
// //                     autocomplete="off"
// //                     onChange={handleChangeBalance}
// //                 />
// //                 <FormControlLabel
// //                     label="Has card"
// //                     control={
// //                     <Checkbox
// //                         checked={hasCard}
// //                         onChange={()=>setHasCard(!hasCard)}
// //                     />
// //                     }
// //                 />
// //                 <TextField
// //                     select
// //                     // value={gender}
// //                     label="Select gender"
// //                     id="outlined-select-currency"
// //                     onChange={handleChangeGender}
// //                     defaultValue={gender}
// //                     >
// //                     {/* {genders.map((option) => ( */}
// //                     <MenuItem value="male">
// //                         {"male"}
// //                     </MenuItem>
// //                         <MenuItem value="female">
// //                         {"female"}
// //                     </MenuItem>
// //                     {/* ))} */}
// //                 </TextField>
// //                 <Button disabled={false} onClick={handleAdd} variant="contained">SAVE</Button>
// //             </Stack>
// //             </Box>
// //           </Modal>