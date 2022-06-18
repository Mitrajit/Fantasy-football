import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Container } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useState, useEffect } from 'react';
import Table from './Table';

export default function BoxComponent() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuData, setMenuData] = useState(['Loading...']);
  const [operator, setOperator] = useState(null);
  const [operatorGameType, setOperatorGameType] = useState(null);
  const [operatorName, setOperatorName] = useState(null);
  const [rows, setRows] = useState([]);
  useEffect(() => {
    fetch('/operator')
      .then((res) => res.json())
      .then((data) => {
        setMenuData(data);
      });
  }, []);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    const { currentTarget } = event;
    const { id } = event.currentTarget;
    if (id === 'operator') {
      fetch('/operator')
        .then((res) => res.json())
        .then((data) => {
          setMenuData(data);
          setAnchorEl(currentTarget);
        });
    }
    else if (id === 'gameType') {
      const url = operator ? '/operatorGameType?' + new URLSearchParams({ operator }) : '/operatorGameType';
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          setMenuData(data);
          setAnchorEl(currentTarget);
        });
    }
    else {
      const url = (operator ? '/operatorName?' + new URLSearchParams({ operator }) : '/operatorName?') +
        (operatorGameType ? '&' + new URLSearchParams({ operatorGameType }) : '');
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          setMenuData(data);
          setAnchorEl(currentTarget);
        });
    }
  };
  const handleClose = (event, value) => {
    if (value) {
      console.log(event.target);
      console.log(value);
      if (anchorEl.id === 'operator')
        setOperator(value);
      else if (anchorEl.id === 'gameType')
        setOperatorGameType(value);
      else
        setOperatorName(value);
    }
    setAnchorEl(null);
  };

  useEffect(() => {
    if (operator && operatorGameType && operatorName) {
      fetch('/players?' + new URLSearchParams({ operator, operatorGameType, operatorName }))
        .then((res) => res.json())
        .then((data) => {

          const dt = [];
          data.forEach(element => {
            dt.push({
              id: element.slatePlayerId,
              name: element.operatorPlayerName,
              team: element.team,
              position: element.operatorPosition,
              salary: `$${element.operatorSalary}`,
              points: element.fantasyPoints
            });
          });
          console.log(dt);
          setRows(dt);
        });
    }
  }, [operator, operatorGameType, operatorName]);

  return (
    <>
      <Container maxWidth='xl' sx={{
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
          }}
            id="operator"
            onClick={handleClick}>{operator ? operator : 'Select operator'} <KeyboardArrowDownIcon /></Button>
          <Button sx={{
            backgroundColor: '#000000',
            color: '#FFFFFF',
            opacity: 1,
          }}
            id="gameType"
            onClick={handleClick}>{operatorGameType ? operatorGameType : 'Select Game Type'} <KeyboardArrowDownIcon /></Button>
          <Button sx={{
            backgroundColor: '#000000',
            color: '#FFFFFF',
            opacity: 1,
          }}
            id="slate"
            onClick={handleClick}>{operatorName ? operatorName : 'Select Slate Name'} <KeyboardArrowDownIcon /></Button>
          <Menu
            id="demo-customized-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={(event) => handleClose(event, null)}>
            {menuData.map((item, index) => {
              return (
                <MenuItem key={index} onClick={(event) => handleClose(event, item)}>{item}</MenuItem>
              )
            })}
          </Menu>
        </Box>
      </Container>
      <Table rows={rows}/>
    </>
  );
}