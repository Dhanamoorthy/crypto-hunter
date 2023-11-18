import { AppBar, Container, MenuItem, Select, ThemeProvider, Toolbar, Typography, createTheme } from '@mui/material'
import React from 'react'
import { makeStyles } from 'tss-react/mui';
import { useNavigate } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';



const useStyles = makeStyles()((theme) => {
  return {
    title: {
      flex: 1, // spread to whole its width
      color: 'gold',
      fontFamily: "Montserrat",
      fontWeight: 'bold',
      cursor: 'pointer',
    }
  }
})
const Header = () => {

  const { classes } = useStyles()

  const {currency,setCurrency} = CryptoState()
  // console.log(currency)
  

  const navigate = useNavigate()


  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    }
  })



  return (
    // we use themeprovider MUI thing to provide the theme to header component
    <ThemeProvider theme={darkTheme}>
      <AppBar color='transparent' position='static'>
        {/* Container helps to makes page responsive */}
        <Container>
          <Toolbar>
            <Typography onClick={() => navigate("/")}
             className={classes.title}
             variant='h6'
             >
              Crypto Hunter
            </Typography>

            <Select variant='outlined' style={{
              width: 100, height: 40,
              marginRight: 15,
            }}
            value={currency}
            onChange={(e)=>setCurrency(e.target.value)}
            >
              <MenuItem value={'USD'}>USD</MenuItem>
              <MenuItem value={'INR'}>INR</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  )
}

export default Header