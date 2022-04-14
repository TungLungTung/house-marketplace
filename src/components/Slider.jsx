import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase.config';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import Spinner from '../components/Spinner';

// Helper functions
import { convertToCurrency } from '../helpers/convertToCurrency';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

function Slider() {
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const listingsRef = collection(db, 'listings');
        const q = query(listingsRef, orderBy('timestamp', 'desc'), limit(5));
        const querySnap = await getDocs(q);

        let listings = [];

        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data()
          });
        });
        console.log(listings);
        setListings(listings);
        setLoading(false);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchListings();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (listings.length === 0) {
    return <></>;
  }

  return (
    listings && (
      <>
        <p className="exploreHeading">Recommended</p>
        <Swiper
          sliderperview={1}
          pagination={{
            clickable: true
          }}
        >
          {listings.map(({ data, id }) => {
            return (
              <SwiperSlide
                key={id}
                onClick={() => navigate(`/category/${data.type}/${id}`)}
              >
                <div
                  style={{
                    background: `url(${data.imgUrls[0]}) center no-repeat`,
                    backgroundSize: 'cover'
                  }}
                  className="swiperSlideDiv"
                >
                  <p className="swiperSlideText">{data.name}</p>
                  <div className="swiperSlidePrice">
                    $
                    {convertToCurrency(
                      data.discountedPrice ?? data.regularPrice
                    )}{' '}
                    {data.type === 'rent' ? '/ month' : ''}
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </>
    )
  );
}

export default Slider;
