import React from 'react';
import { Link } from 'react-router-dom';

function CardItem(props) {
  return (
    <>
      <div className='cards__item__link' style={{ marginBottom: '45px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <figure className='cards__item__pic-wrap'>
          <img
            alt='Movie pic'
            src={props.props.show.image.medium}
            style={{marginBottom: 0}}
          />
        </figure>
        <div className='cards__item__info' style={{ textAlign: 'center', marginTop:0 }}>
          <h5 className='cards__item__text'>{props.props.show.language}</h5>
          <Link to={`/details/${props.props.show.id}`}>
            <button style={{ backgroundColor: 'black', color: 'white', padding: '10px', borderRadius: '8px', width: '100%' }}>View Details</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default CardItem;
