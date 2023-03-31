import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import UploadIcon from "@mui/icons-material/Upload";

import Paper from "@mui/material/Paper";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import { v4 as uuidv4 } from "uuid";
import { TableContainer } from "@mui/material";
import "./app_convert_table.scss";
import EditIcon from '@mui/icons-material/Edit';
import SaveAltIcon from '@mui/icons-material/SaveAlt';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {/* {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null} */}
    </DialogTitle>
  );
}

export default function UploadButton() {
  const [open, setOpen] = React.useState(false);
  //setting the fileitems
  const [fileItems, setFileItems] = React.useState([]);
  //setting the hedaers data
  const [headersName, setHeadersName] = React.useState([]);
 
  //changing the title
  const [title, setTitle] = React.useState("");
  //edit option
  const[isEditable,setIsEditable]=React.useState(false)
 
 
 
  
  const [selectedCell, setSelectedCell] = React.useState(null);
 
console.log("rendering")
  var jsonData = [];
  var headers = [];
 
  
  // React.useEffect(() => {
  //   rowAddButtonChange();
  // }, [headersName]);
 
  


  //file to convert to json file
  const uploadFile = (e) => {
    console.log("file uploaded", e.target.files);
    var filename = e.target.files[0].name;
    var extension = filename.substring(filename.lastIndexOf(".")).toUpperCase();
    if (extension === ".CSV") {
      //Here calling another method to read CSV file into json
      console.log(filename);
      setTitle(filename);
      csvFileToJSON(e.target.files[0]);
    } else {
      alert("Please select a valid csv file.");
    }
  };
// this functionilty to convert scv to json data
  function csvFileToJSON(file) {
    try {
      var reader = new FileReader();
      reader.readAsBinaryString(file);
      reader.onload = function (e) {
        console.log(e.target.result);
        var rows = e.target.result.split("\n");
        console.log("rows", rows);

        for (var i = 0; i < rows.length; i++) {
          var cells = rows[i].split(",");
          var rowData = [];
           let id=uuidv4()
           let eachRowData={id}
          for (var j = 0; j < cells.length; j++) {
            

            if (i === 0) {
              
              headers.push(cells[j].trim());
            } else {
              var key = headers[j];
              if (key) {
                
                 eachRowData [headers[j]]= cells[j].trim()
               
              }
            }
          }
          //skip the first row (header) data
          if (i !== 0) {
            
            jsonData.push(eachRowData);
          }
        }

        //displaying the json result in string format
        console.log(headers);
        console.log(jsonData);
        jsonData.pop()
        setFileItems(jsonData);
        setHeadersName(headers);
      };
    } catch (e) {
      console.error(e);
    }
  }
React.useEffect(()=>{
  setOpen(false)
},[fileItems])

 
  const handleClickOpen = () => {
    setOpen(true);
    

  };
  const handleClose = () => {
    setOpen(false);
  };

 
  console.log("rerender")
  const handleClickRowAdd = () => {

    
      let totalDataLength = headersName.length;
      let updatedRowData = fileItems;

      let keyValue = uuidv4();
      let value = [];
      while (totalDataLength > 0) {
        let eachData = {};

        let eachkey = uuidv4();
        let eachvalue = "";
        eachData["keyValue"] = eachkey;
        eachData["value"] = eachvalue;
        value.push(eachData);
        totalDataLength--;
      }
      let newRow = { keyValue, value };
      updatedRowData.push(newRow);

       
     setFileItems([...updatedRowData])
    console.log(fileItems);
  

   
  };

 const editableOption=()=>{
  setIsEditable(true)
 }

  const upLoadButtonClick=()=>{
         setIsEditable(false)
         console.log(isEditable)
  }
  return (
    <div>
      <br />
      <h2>Suman Panel {title}</h2>

      <br />
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        className="buttonColorchange"
      >
        <div className="backgroud_color_text">Upload files</div>
      </Button>

      {open==true?<BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
          className="upload_handle_button"
        >
          <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={handleClose}
          >
            Upload the csv files
          </BootstrapDialogTitle>
          <Button autoFocus component="label">
            <UploadIcon />
            <input
              hidden
              accept="csv/*"
              multiple
              type="file"
              onChange={uploadFile}
            />
          </Button>
          <DialogActions></DialogActions>
        </BootstrapDialog>:<div></div>}
         {/* edit & add row & save button  */}
       { fileItems.length?<div>
        <Button
          variant="outlined"
          onClick={()=>handleClickRowAdd()}
          className="buttonColorchange"
        >
          <div className="backgroud_color_text">Add Row</div>
        </Button><br/><br/><Button
         onClick={editableOption}
          className="buttonColorchange" 
        >
          <div className="backgroud_color_text"><EditIcon/></div>
        </Button> <Button
          onClick={upLoadButtonClick}
          className="buttonColorchange" 
        >
          <div className="backgroud_color_text"><SaveAltIcon/></div>
        </Button></div>:<div></div>}
      <div className="table_class">
      <TableContainer
        component={Paper}
        sx={{ maxHeight: 668, maxWidth: 1600 ,pl:'10px',pr:"10px",bgcolor:"#808080",pl:5}}
      >
        <Table stickyHeader aria-label="sticky table" sx={{bgcolor:"#ffffff"}}>
          <TableHead>
            <TableRow>{headersName.length?headersName.map((header,index) => {
    return (
      <StyledTableCell key={index}>{header}</StyledTableCell>
    );
  }):<div></div>}</TableRow>
          </TableHead>
          <TableBody > 
            { isEditable==true?fileItems.map((row, index) => (
                                    <tr key={row.keyValue}>
                                        {headersName.map((head) => (
                                            <td
                                                key={`${row.keyValue}-${head}`}
                                                onClick={() => setSelectedCell({ row: index, column: head })}
                                                contentEditable={selectedCell && selectedCell.row === index && selectedCell.column === head}
                                                suppressContentEditableWarning={true}
                                                onBlur={(event) => {
                                                    const newValue = event.target.innerText;
                                                    const newData = [...fileItems];
                                                    newData[index] = { ...newData[index], [head]: newValue };
                                                    setFileItems(newData);
                                                }}
                                                className={(selectedCell && selectedCell.row === index && selectedCell.column === head) ? 'selected-cell' : ''}
                                            >
                                                {row[head]}
                                            </td>
                                        ))}
                                    </tr>
                                )):fileItems.map((row) => (
                                  <tr key={row.keyValue}>
                                      {headersName.map((head) => (
                                          <td
                                              key={`${row.id}-${head}`}
                                          >
                                              {row[head]}
                                          </td>
                                      ))}
                                  </tr>
                              ))}
          </TableBody>
        </Table>
      </TableContainer>
      </div>
    </div>
  );
}
