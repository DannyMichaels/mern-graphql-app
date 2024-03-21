/* eslint-disable react/prop-types */
import { useState, useMemo } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ITEMS } from '../graphql/queries';
import { ADD_ITEM_TO_CART } from '../graphql/mutations';
import './Home.css';
import { useCartStore } from '../stores/cart.store';

export default function Home() {
  const { data, loading, error } = useQuery(GET_ITEMS);
  const { dispatch } = useCartStore();

  const [addItemToCart] = useMutation(ADD_ITEM_TO_CART, {
    onCompleted: (data) => {
      dispatch(data.addItemToCart);
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

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
  const [selectedVariant, setSelectedVariant] = useState(() =>
    item?.variants?.length > 1 ? item.variants[0] : null
  );

  const itemImage = useMemo(() => {
    if (item?.variantImages) {
      return item.variantImages[item.variants.indexOf(selectedVariant)];
    }
    return item.image;
  }, [item, selectedVariant]);

  return (
    <div key={item.id} className="item">
      <img src={itemImage} alt={item.name} width="300" height="300" />
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

      {item?.variants?.length > 1 && (
        <select
          value={selectedVariant}
          onChange={(e) => setSelectedVariant(e.target.value)}>
          {item.variants.map((variant, index) => (
            <option key={variant} value={variant}>
              {variant}
            </option>
          ))}
        </select>
      )}
      <button
        onClick={() =>
          addItemToCart({
            variables: {
              id: item.id,
              quantity: parseInt(quantity, 10),
              selectedVariant,
            },
          })
        }>
        Add to Cart
      </button>
    </div>
  );
}
