import { CREATE_ITEM } from '../graphql/mutations';
import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useItemsStore } from '../stores/items.store';

export default function ItemCreate() {
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    image: '',
    variants: [],
    variantImages: [],
  });
  const { addItem } = useItemsStore();
  const navigate = useNavigate();

  const [createItem] = useMutation(CREATE_ITEM, {
    onCompleted: (data) => {
      addItem(data.createItem);
      navigate('/');
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div>
      <h1>Create Item</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          createItem({
            variables: {
              ...formData,
              price: parseFloat(formData.price),
            },
          });
        }}>
        <label htmlFor="name">Name:</label>
        <input
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
        />

        <label htmlFor="price">Price:</label>
        <input
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
        />

        <label htmlFor="image">Image:</label>
        <input
          name="image"
          type="text"
          value={formData.image}
          onChange={handleChange}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
