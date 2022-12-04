// import { useEffect, useState } from "react";
// import Button from '@mui/material/Button';
// import Modal from '@mui/material/Modal';
// import Box from '@mui/material/Box';
// import { Checkbox, FormControlLabel, MenuItem, Stack, TextField } from "@mui/material";

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
// };

// function ModalWindow(isOpen, onClose) {
//   debugger
//   const [open, setOpen] = useState(false);
//   // const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);
//   const [id, setId] = useState("");
//   const [name, setName] = useState("");
//   const [surname, setSurname] = useState("");
//   const [gender, setGender] = useState("male");
//   const [balance, setBalance] = useState(0);
//   const [hasCard, setHasCard] = useState(false);
//   const [date, setDate] = useState(new Date());

//       const handleChangeName = (event) => {
//         setName(event.target.value);
//     };

//     const handleChangeSurname = (event) => {
//         setSurname(event.target.value);
//     }

//     const handleChangeGender = (event) => {
//       setGender(event.target.value);
//     }

//     const handleChangeBalance = (event) => {
//         setBalance(event.target.value);
//     }

//     const handleCardChange = (event) => {
//       // debugger
//       //   setHasCard(prev=>!prev);
//     }

//     const handleAdd=(e)=>{
//       // e.preventDefault();
//       const empdata={name, surname, gender, balance, hasCard, date};
//       fetch("http://localhost:3001/items", {
//         method:"POST",
//         headers:{"content-type":"application/json"},
//         body:JSON.stringify(empdata)
//       }).then((res)=>{
//         alert('Saved successfully.')
//         // navigate('/');
//       }).catch((err)=>{
//         console.log(err.message)
//       })
//       setOpen(false);
//       // handleClose();
//     }

//   useEffect(() => {

//   }, [])
//   return (
//           <Modal 
//               open={isOpen}
//               onClose={onClose}
//           >
//             <Box sx={style}>
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
//                     // value={gender}
//                     label="Select gender"
//                     id="outlined-select-currency"
//                     onChange={handleChangeGender}
//                     defaultValue={gender}
//                     >
//                     {/* {genders.map((option) => ( */}
//                     <MenuItem value="male">
//                         {"male"}
//                     </MenuItem>
//                         <MenuItem value="female">
//                         {"female"}
//                     </MenuItem>
//                     {/* ))} */}
//                 </TextField>
//                 <Button disabled={false} onClick={handleAdd} variant="contained">SAVE</Button>
//             </Stack>
//             </Box>
//           </Modal>
//   );
// }

// export default ModalWindow;

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