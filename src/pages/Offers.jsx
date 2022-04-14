import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  start,
  startAfter
} from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import ListingItem from '../components/ListingItem';

export default function Offers() {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);

  /// Pagination
  const [lastFetchedListing, setLastFetchedListing] = useState(null);

  const params = useParams();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        /// Get docRef
        const listingsRef = collection(db, 'listings');
        /// Create a query
        /// Old version firebase 8
        // query.where().orderBy()....
        const q = query(
          listingsRef,
          where('offer', '==', true),
          orderBy('timestamp', 'desc'),
          limit(10)
        );

        /// execute query - list of document
        const querySnap = await getDocs(q);
        const lastVisible = querySnap.docs[querySnap.docs.length - 1];

        setLastFetchedListing(lastVisible);
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id, /// Id is seperate from getDocs doc.data
            data: doc.data()
          });
        });

        setListings(listings);
        setLoading(false);
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchListings();
  }, []);

  ////// Pagination / Load more
  const onFetchMoreListings = async () => {
    try {
      /// Get docRef
      const listingsRef = collection(db, 'listings');
      /// Create a query
      /// Old version firebase 8
      // query.where().orderBy()....
      const q = query(
        listingsRef,
        where('offer', '==', true),
        orderBy('timestamp', 'desc'),
        startAfter(lastFetchedListing),
        limit(10)
      );

      /// execute query - list of document
      const querySnap = await getDocs(q);

      const lastVisible = querySnap.docs[querySnap.docs.length - 1];

      setLastFetchedListing(lastVisible);

      const listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id, /// Id is seperate from getDocs doc.data
          data: doc.data()
        });
      });

      setListings((prevState) => [...prevState, ...listings]);
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="category">
      <header>
        <p className="pageHeader">Offers</p>
      </header>

      {loading ? (
        <Spinner />
      ) : listings && listings.length > 0 ? (
        <>
          {/* Display listings */}
          <main>
            <ul className="categoryListings">
              {listings.map((listing) => {
                return (
                  <ListingItem
                    listing={listing.data}
                    id={listing.id}
                    key={listing.id}
                  />
                );
              })}
            </ul>
          </main>

          <br />
          <br />
          {lastFetchedListing && lastFetchedListing.length < 2 && (
            <p className="loadMore" onClick={onFetchMoreListings}>
              Load more
            </p>
          )}
        </>
      ) : (
        <p>There are no current offers</p>
      )}
    </div>
  );
}
