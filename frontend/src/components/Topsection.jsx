import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Container } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuCust from './Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function BoxComponent() {
  return (
    <Container maxWidth='xl'sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '50px',
    }}>
      <Box component="span" sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '50%',
        backgroundColor: '#ffffff1a',
        borderRadius: '8px',
        padding: '30px 0px',
      }}>
        <Button sx={{
          backgroundColor: '#000000',
          color: '#FFFFFF',
          opacity: 1,
        }}>Select operator <KeyboardArrowDownIcon/></Button>
        <Button sx={{
          backgroundColor: '#000000',
          color: '#FFFFFF',
          opacity: 1,
        }}>Select Game Type <KeyboardArrowDownIcon/></Button>
        <Button sx={{
          backgroundColor: '#000000',
          color: '#FFFFFF',
          opacity: 1,
        }}>Select Slate Name <KeyboardArrowDownIcon/></Button>
        <Menu>
          <MenuItem>ABC</MenuItem>
          <MenuItem>ABCdas</MenuItem>
        </Menu>
      </Box>
    </Container>
  );
}