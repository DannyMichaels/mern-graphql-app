/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ITEMS } from '../graphql/queries';
import { ADD_ITEM_TO_CART } from '../graphql/mutations';
import './Home.css';
import { useCartContext } from '../context/CartContext';

export default function Home() {
  const { data, loading, error } = useQuery(GET_ITEMS);
  const { dispatch } = useCartContext();

  const [addItemToCart] = useMutation(ADD_ITEM_TO_CART, {
    onCompleted: (data) => {
      dispatch({
        type: 'UPDATE_CART',
        payload: data.addItemToCart,
      });
    },
  });

  if (loading) return <p>Loading...</p>;

  return (
    <div className="home-container">
      <h1>Home</h1>

      <div className="items">
        {data.items.map((item) => (
          <Item item={item} addItemToCart={addItemToCart} key={item.id} />
        ))}
      </div>
    </div>
  );
}

function Item({ item, addItemToCart }) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div key={item.id} className="item">
      <img src={item.image} alt={item.name} />
      <h3>{item.name}</h3>
      <p>${item.price}</p>
      <label htmlFor="quantity">Quantity:</label>
      <input
        name="quantity"
        type="number"
        defaultValue={1}
        placeholder="Quantity"
        onChange={(e) => {
          setQuantity(e.target.value);
        }}
      />
      <button
        onClick={() =>
          addItemToCart({
            variables: {
              id: item.id,
              quantity: parseInt(quantity, 10),
            },
          })
        }>
        Add to Cart
      </button>
    </div>
  );
}
