import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import { CryptoState } from '../CryptoContext';
import axios from 'axios';

import { makeStyles } from 'tss-react/mui';
import CoinInfo from '../Components/CoinInfo';
import { LinearProgress, Typography } from '@mui/material';
import { numberWithCommas } from '../Components/CoinsTable';
import HTMLReactParser from 'html-react-parser'
import { SingleCoin } from '../Config/api';





const Coinpage = () => {
  const {id} = useParams();
  const [coin,setCoin] = useState();
  const [errormsg,setErrormsg] =useState();


  const {currency,symbol} = CryptoState();

  console.log(coin)
  const fetchCoins =async ()=> {

    try {
      const response = await axios.get(SingleCoin(id));
      setCoin(response.data)
      // console.log(response.data)
    } catch (error) {
      setErrormsg(error.toJSON().message)
    }
  }


  useEffect(()=>{
    fetchCoins()
  }, [])



  const useStyles = makeStyles()((theme) =>{
    return{
      container: {
        display:'flex',
        [theme.breakpoints.down("md")]: {
          flexDirection: "column",
          alignItems: "center",
        },
      },
      sidebar: {
        width: "30%",
        [theme.breakpoints.down("md")]: {
          width: "100%",
        },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 25,
        borderRight: "2px solid grey",
      },
      heading: {
        fontWeight: "bold",
        marginBottom: 20,
        fontFamily: "Montserrat",
      },
      description: {
        width: "100%",
        fontFamily: "Montserrat",
        padding: 25,
        paddingBottom: 15,
        paddingTop: 0,
        textAlign: "justify",
      },
      marketData: {
        alignSelf: "start",
        padding: 25,
        paddingTop: 10,
        width: "100%",
        [theme.breakpoints.down("md")]: {
          display: "flex",
          justifyContent: "space-around",
        },
        [theme.breakpoints.down("sm")]: {
          flexDirection: "column",
          alignItems: "center",
        },
        [theme.breakpoints.down("xs")]: {
          alignItems: "start",
        },
      },
    }
  })

const {classes }= useStyles();

if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;// without this line for showing an error  below the line
// Cannot read properties of undefined (reading 'toString')

  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
      <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography variant="h3" className={classes.heading}>
          {coin?.name}
        </Typography>
        <Typography variant="subtitle1" className={classes.description}>
        {HTMLReactParser(coin?.description.en.split(". ")[0])}.
        </Typography>
        <div className={classes.marketData}>
          <span style={{display:'flex'}}>
          <Typography variant="h5" className={classes.heading}>
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {(coin?.market_cap_rank)}
            </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </span>
        </div>
      </div>

      {/* chart */}
      <CoinInfo coin={coin} />
    </div>
  )
}

export default Coinpage