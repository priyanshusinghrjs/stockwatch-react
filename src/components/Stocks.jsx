import { Button, Container, Heading, HStack, VStack } from '@chakra-ui/react';
import axios from 'axios';
import React from 'react'
import { useEffect, useState } from 'react';
import { Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';








const Stocks =({updateWishlist} ) => {  

  // use state hooks for stocks,loading,country
const[stocks, setStocks] = useState([]);
const[loading, setLoading] = useState(true);
const[country, setCountry] = useState('India');
const navigate = useNavigate();



// function to navigate 
const handleClick = (symbol) => {
  // console.log(symbol);
  navigate(`/timeseries/${symbol}`);
}


// make a api call to fetch the stocks using axios
useEffect(() => {
  const fetchStocks = async () => {
    const {data} = await axios.get(`https://api.twelvedata.com/stocks?country=${country}?`);
    setStocks(data.data.slice(0,400));
    setLoading(false);
  }
  fetchStocks();
}, [country]);

  return (


   <Container w={'full'} maxW={'full'} mt={'2'}>
    {/* list of button for selecting different country using chakra ui react */}

    <HStack justifyContent={'space-evenly'} marginTop={'25'} m={'1'}> 
      <Button colorScheme={'blue'} onClick={() => setCountry('India')}>India</Button>
      <Button  colorScheme={'blue'}  onClick={() => setCountry('United States')}>USA</Button>
      <Button colorScheme={'blue'} onClick={() => setCountry('United Kingdom')}>UK</Button>
      <Button colorScheme={'blue'} onClick={() => setCountry('Japan')}>Japan</Button>
      <Button colorScheme={'blue'} onClick={() => setCountry('China')}>China</Button>
    </HStack>
    <Container m ={'auto'}>
        <Heading>Stocks in {country}</Heading>
      </Container>


      {
        // if loading is true then show loading else show the list of stocks
        loading ? <div>Loading...</div> :
         <HStack wrap={'wrap'} justifyContent={'space-evenly'} marginTop={'25'}>
        {
          // map through the stocks and show the details of each stock using chakra ui react
          stocks.map((stock) => (
            <VStack shadow={'2px 2px 3px blue'} minW={'329'} maxW={'329'} m={'1'} p={'3'}>
              <Heading size={'md'}>{stock.symbol}</Heading>
              <Text size={'5'}>{stock.name}</Text>

              <HStack>
                <Text>Exchange: {stock.exchange}</Text>
                <Text>mic_code: {stock.mic_code}</Text>
              </HStack>
              <HStack>
                <Text>currency: {stock.currency}</Text>
                <Text>type: {stock.type}</Text>
              </HStack>

              <HStack>
              <Button colorScheme={'blue'} onClick={()=>updateWishlist(stock) }>Add to wishlist</Button>
              <Button colorScheme={'blue'} onClick= {()=>handleClick(stock.symbol)}>timeSeries Data</Button>
              </HStack>

            </VStack>

        
          ))}
        
    
        
        </HStack>
      }

   </Container> );
};

export default Stocks