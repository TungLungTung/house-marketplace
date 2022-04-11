import React, { useState, useEffect, useRef } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';

export default function CreateListing() {
  const [geolocationEnabled, setGeolocationEnabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: 'rent',
    name: '',
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnished: false,
    location: '',
    offer: false,
    regularPrice: 0,
    discountedPrice: 0,
    images: {},
    latitude: 0,
    longitude: 0,
    timestamp: ''
  });

  const auth = getAuth();
  const navigate = useNavigate();
  const isMounted = useRef(true);
  useEffect(() => {
    /// Check is mounted
    if (isMounted) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setFormData({
            ...formData,
            userRef: user.uid
          });
        } else {
          navigate('/sign-in');
        }
      });
    }

    /// Clean up
    return () => {
      isMounted.current = false;
    };
    /// You can disabled warning this point
  }, [isMounted]);

  if (loading) return <Spinner />;

  return <div>CreateListing</div>;
}
