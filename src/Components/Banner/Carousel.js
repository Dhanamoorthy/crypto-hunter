import React, { useEffect, useState } from 'react'
import { makeStyles } from 'tss-react/mui';


import { CryptoState } from '../../CryptoContext'
import AliceCarousel from 'react-alice-carousel'
import { Link } from 'react-router-dom'
import { TrendingCoins } from '../../Config/api';
import axios from 'axios';




const useStyles = makeStyles()((theme) => {
    return {
        carousel: {
            height: "50%",
            display: 'flex',
            alignItems: 'center'
        },
        carouselItem : {
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
            cursor:'pointer',
            textTransform:'uppercase',
            color:'white'
        },
    }
})


export function numberWithCommas(x){
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
}

const Carousel = () => {

    const [trending, setTrending] = useState([]);

    const [errormsg,setErrormsg] = useState('');

  

    const { classes } = useStyles();

    const { currency ,symbol} = CryptoState();


    const fetchTrendingCoins = async () => {
      try {
        const response = await axios.get(TrendingCoins(currency));

        setTrending(response.data)
        
      } catch (error) {
        setErrormsg(error.toJSON().message)
        // console.log(error.toJSON().message)
        // if (error.response) {
        //     console.log(error.response.data);
        //     console.log(error.response.status);
        //     console.log(error.response.headers);
        // }else if (error.request){
        //     console.log(error.request);
        // }else{
        //     console.log("error",error.message)
        // }
      }
    };






    // console.log(trending)

    //     whenever we go to call the function 
    //  when our components is first time render so inside of the useEffect we call the Function


    useEffect(() => {
        fetchTrendingCoins()
    }, [currency])
    // dependicies was every time change the currency i want to fetch the coins again



    const items = trending.map((coin) => {

        // for calculating the profit

        let profit = coin.price_change_percentage_24h >= 0;

        return (
            /// link use ful for one page to another page
            <Link className={classes.carouselItem}
                to={`/coins/${coin.id}`}>
                <img
                    src={coin?.image}
                    alt={coin.name}
                    height='80'
                    style={{ marginBottom: 10 }}
                />
                <span>
                    {coin?.symbol}
                    &nbsp;
                    <span
                    style={{
                        color: profit > 0 ? "rgb(14,203,129)":"red",
                        fontWeight:500,
                    }}
                    >
                        {profit && "+"} {coin?.price_change_percentage_24h?.toFixed(2)}%
                    </span>
                    <span style={{fontSize:22, fontWeight: 500}}>
                        {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
                    </span>
                </span>
            </Link>
        )
    })




    const responsive = {
        /// if it is 0 pixels show two items

        0: {
            items: 2,
        },
        // 512 pixels show 4 items
        512: {
            items: 4,
        }
    }

    return (
        <div className={classes.carousel}>
            <AliceCarousel
                mouseTracking
                infinite
                autoPlayInterval={1000} // every 1 second
                animationDuration={1500}
                //dont want dot controls
                disableDotsControls
                disableButtonsControls
                //responsive means how many items see in the screen at one time
                responsive={responsive}
                autoPlay
                items={items}
            />
        </div>
    )
}

export default Carousel