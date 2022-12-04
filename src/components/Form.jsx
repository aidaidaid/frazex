// // import React, { useState, useEffect } from "react";
// // import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
// // import { Checkbox, FormControlLabel, MenuItem, Stack, TextField } from "@mui/material";
// // import Button from '@mui/material/Button';
// // import Modal from '@mui/material/Modal';
// // import Box from '@mui/material/Box';


// // const ModalWindow = ({open,handleClose}) => {
// //   const {id, name, surname, gender, balance, hasCard, date}=data;

// // //   useEffect(() => {

// // //   }, [props]);

// // //   };

// //   return (

// // };

// // export default ModalWindow;

// // const boxStyle = {
// //   position: 'absolute',
// //   top: '50%',
// //   left: '50%',
// //   transform: 'translate(-50%, -50%)',
// //   width: 400,
// //   bgcolor: 'background.paper',
// //   border: '2px solid #000',
// //   boxShadow: 24,
// //   p: 4,
// // };


//   :
//           <Modal //add
//               open={open}
//               onClose={handleClose}
//           >
//             <Box sx={boxStyle}>
//                 <Stack spacing={3}>
//                 <TextField
//                     label="Name"
//                     value={name}
//                     id="outlined-required"
//                     onChange={handleChangeName}
//                 />
//                 <TextField
//                     label="Surname"
//                     value={surname}
//                     id="outlined-required"
//                     onChange={handleChangeSurname}
//                 />
//                 <TextField
//                     label="Balance"
//                     value={balance}
//                     type="number"
//                     id="outlined-required"
//                     autocomplete="off"
//                     onChange={handleChangeBalance}
//                 />
//                 <FormControlLabel
//                     label="Has card"
//                     control={
//                     <Checkbox
//                         checked={hasCard}
//                         onChange={()=>setHasCard(!hasCard)}
//                     />
//                     }
//                 />
//                 <TextField
//                     select
//                     label="Select gender"
//                     id="outlined-select-currency"
//                     onChange={handleChangeGender}
//                     defaultValue={gender}
//                     >
//                     <MenuItem value="male">
//                         {"male"}
//                     </MenuItem>
//                         <MenuItem value="female">
//                         {"female"}
//                     </MenuItem>
//                 </TextField>
//                 <Button disabled={false} onClick={saveAdd} variant="contained">ADD</Button>
//             </Stack>
//             </Box>
//           </Modal>  
//         }