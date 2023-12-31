import { Container, Typography } from '@mui/material';
import React from 'react'
import { makeStyles } from 'tss-react/mui';
import Carousel from './Carousel';



const useStyles = makeStyles()((theme) => {
  return {
    banner: {
      backgroundImage: "url(/banner.jpg)"
    },
    bannerContent: {
      height: 400,
      display: 'flex',
      flexDirection: 'column',
      paddingTop: 25,
      justifyContent: 'space-around'
    },
    tagline: {
      display:'flex',
      height:'40%',
      flexDirection:'column',
      justifyContent:'center',
      textAlign:'center',
    },

  }
})



const Banner = () => {

  const { classes } = useStyles();

  return (
    <div className={classes.banner} style={{ backgroundImage: '/' }}>
      <Container className={classes.bannerContent}>
        <div className={classes.tagline}>
          <Typography
            variant='h2'
            style={{
              fontWeight: "bold",
              marginBottom: 15,
              fontFamily: 'Montserrat',
            }}
          >
            Crypto Hunter
          </Typography>
          <Typography
            variant='subtitle2'
            style={{
              color: "darkgrey",
              textTransform: 'capitalize',
              fontFamily: 'Montserrat'
            }}
          >
            Get all the Info regarding your Favorite crypto currency
          </Typography>
        </div>
        <Carousel/>
      </Container>
    </div>
  )
}

export default Banner
