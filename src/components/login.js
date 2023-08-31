// src/components/Login.js
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/authActions';
import { Button, TextField, Container, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom'; 

const Login = ({ isAuthenticated, error, login }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate(); 

  const handleLogin = () => {
    login(username, password);
  };

  if (isAuthenticated) {
    navigate('/admin'); 
    return null;
  }

  return (
    <Container>
      <Grid container justify="center" alignItems="center" style={{ height: '100vh' }}>
        <Grid item xs={4} ></Grid>
        <Grid item xs={4} >
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <Button variant="contained" color="primary" onClick={handleLogin} fullWidth>
            Login
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { login })(Login);
