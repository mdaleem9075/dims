import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

const WorkOrder = () => {
  const [data, setData] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [editedData, setEditedData] = useState({
    id: null,
    name: '',
    username: '',
    email: '',
    city: '',
  });
  const [open, setOpen] = useState(false); 

  const getData = async () => {
    const result = await axios.get('https://jsonplaceholder.typicode.com/users');
    setData(result.data);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleEditClick = (id, name, username, email, city) => {
    setSelectedId(id);
    setEditedData({ id, name, username, email, city });
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      setData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const handleSaveClick = async () => {
    try {
      await axios.put(`https://jsonplaceholder.typicode.com/users/${editedData.id}`, {
        name: editedData.name,
        username: editedData.username,
        email: editedData.email,
        address: {
          city: editedData.city,
        },
      });

      setData((prevData) =>
        prevData.map((item) =>
          item.id === editedData.id ? { ...item, ...editedData } : item
        )
      );

      setSelectedId(null);
      setEditedData({ id: null, name: '', username: '', email: '', city: '' });
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const handleAddUserClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddUserSave = () => {
    const newUser = {
      id: Math.floor(Math.random() * 1000), 
      name: editedData.name,
      username: editedData.username,
      email: editedData.email,
      address: {
        city: editedData.city,
      },
    };

    setData((prevData) => [...prevData, newUser]);
    setEditedData({ id: null, name: '', username: '', email: '', city: '' });
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleAddUserClick} variant="contained" color="primary">
        Add User
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>City</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>
                {selectedId === item.id ? (
                  <TextField
                    type="text"
                    value={editedData.name}
                    onChange={(e) =>
                      setEditedData({
                        ...editedData,
                        name: e.target.value,
                      })
                    }
                  />
                ) : (
                  item.name
                )}
              </TableCell>
              <TableCell>
                {selectedId === item.id ? (
                  <TextField
                    type="text"
                    value={editedData.username}
                    onChange={(e) =>
                      setEditedData({
                        ...editedData,
                        username: e.target.value,
                      })
                    }
                  />
                ) : (
                  item.username
                )}
              </TableCell>
              <TableCell>
                {selectedId === item.id ? (
                  <TextField
                    type="text"
                    value={editedData.email}
                    onChange={(e) =>
                      setEditedData({
                        ...editedData,
                        email: e.target.value,
                      })
                    }
                  />
                ) : (
                  item.email
                )}
              </TableCell>
              <TableCell>
                {selectedId === item.id ? (
                  <TextField
                    type="text"
                    value={editedData.city}
                    onChange={(e) =>
                      setEditedData({
                        ...editedData,
                        city: e.target.value,
                      })
                    }
                  />
                ) : (
                  item.address.city
                )}
              </TableCell>
              <TableCell>
                {selectedId === item.id ? (
                  <Button onClick={handleSaveClick}>Save</Button>
                ) : (
                  <>
                    <Button
                      onClick={() =>
                        handleEditClick(
                          item.id,
                          item.name,
                          item.username,
                          item.email,
                          item.address.city
                        )
                      }
                    >
                      Edit
                    </Button>
                    <Button onClick={() => handleDeleteClick(item.id)}>Delete</Button>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Form Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add User</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            value={editedData.name}
            onChange={(e) =>
              setEditedData({
                ...editedData,
                name: e.target.value,
              })
            }
          />
          <TextField
            label="Username"
            fullWidth
            value={editedData.username}
            onChange={(e) =>
              setEditedData({
                ...editedData,
                username: e.target.value,
              })
            }
          />
          <TextField
            label="Email"
            fullWidth
            value={editedData.email}
            onChange={(e) =>
              setEditedData({
                ...editedData,
                email: e.target.value,
              })
            }
          />
          <TextField
            label="City"
            fullWidth
            value={editedData.city}
            onChange={(e) =>
              setEditedData({
                ...editedData,
                city: e.target.value,
              })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddUserSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default WorkOrder;
