import React, { useEffect, useState } from 'react';
import CardItem from './CardItem';

export default function Home() {
  const [shows, setShows] = useState([]);

  const fetchdata = async () => {
    try {
      const res = await fetch('https://api.tvmaze.com/search/shows?q=all');
      const responseData = await res.json();
      setShows(responseData);
      console.log(responseData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <>
      <h1 style={{backgroundColor:"#000", marginTop:0, height: 52, color:"#fff", paddingTop:15, paddingLeft:15}}>TV Shows</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap',flexDirection:'row', justifyContent: 'space-between', padding:'70px' }}>
        {shows.filter((show) => show.show.image !== null).map((show) => (
          <CardItem
            props={show}
            key={show.show.id}
          />
        ))}
      </div>
    </>
  );
}
