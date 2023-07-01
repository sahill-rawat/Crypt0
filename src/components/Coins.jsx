import React, {useEffect, useState} from 'react';
import axios from 'axios';
import ErrorComponent from './ErrorComponent.jsx';
import Loader from '../components/Loader.jsx';
import {server} from '../index'; 
import { Text, Container, Heading, HStack, Image, VStack, Button, RadioGroup, Radio } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Coins = () => {

  const [coins, setCoins] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("inr");

  const currencySymbol =
  currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const changePage = (page)=>{
    setPage(page);
    setLoading(true);
  };

  const btn = new Array(132).fill(1);
  useEffect(()=> {

    const fetchCoins = async ()=> {
      try {
        const {data} = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${[page]}`);
        setCoins(data);
        setLoading(false);
      }
      catch (error) {
        setLoading(false);
        if (error)  return <ErrorComponent message="Error while fetching coins." />
      }
    };
    fetchCoins();
  }, [currency, page]);

  return (
    <Container maxW={"container.xl"}>
      { loading ? (
        <Loader />
      ) : (
        <>

        <RadioGroup value={currency} onChange={setCurrency} p='8'>
          <HStack spacing={'4'}>
            <Radio value='inr'>INR</Radio>
            <Radio value='eur'>EUR</Radio>
            <Radio value='USD'>USD</Radio>
          </HStack>
        </RadioGroup>

          <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {coins.map((i) => (
               <CoinCard
               id={i.id}
               key={i.id}
               name={i.name}
               price={i.current_price}
               img={i.image}
               symbol={i.symbol}
               currencySymbol={currencySymbol}
             />
            ))}
          </HStack>
          <HStack w={"full"} overflowX={"auto"} p={"8"}>
            {btn.map((item, index) => (
              <Button
                key={index}
                bgColor={"blackAlpha.900"}
                color={"white"}
                onClick={() => changePage(index + 1)}
              >
                {index + 1}
              </Button>
            ))}
          </HStack>
        </>
       )} 
    </Container>
  );
};

const CoinCard = ({ id, name, img, symbol, price, currencySymbol = "₹" }) => (
  <Link to={`/coin/${id}`}>
    <VStack
      w={"52"}
      shadow={"lg"}
      p={"8"}
      borderRadius={"lg"}
      transition={"all 0.3s"}
      m={"4"}
      css={{
        "&:hover": {
          transform: "scale(1.1)",
        },
      }}
    >
      <Image
        src={img}
        w={"10"}
        h={"10"}
        objectFit={"contain"}
        alt={"Exchange"}
      />
      <Heading size={"md"} noOfLines={1}>
        {symbol}
      </Heading>

      <Text noOfLines={1}>{name}</Text>
      <Text noOfLines={1}>{price ? `${currencySymbol}${price}` : "NA"}</Text>
    </VStack>
  </Link>
);

export default Coins;