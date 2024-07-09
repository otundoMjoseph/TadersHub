import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';

const ItemForm = () => {
  const [refreshPage, setRefreshPage] = useState(false);

  const formSchema = yup.object().shape({
    name: yup.string().required('Must enter a name').max(100, 'Must be 100 characters or less'),
    description: yup.string().required('Must enter a description').max(500, 'Must be 500 characters or less'),
    category_id: yup
      .number()
      .required('Must enter a category ID')
      .typeError('Please enter a valid number'),
    price: yup
      .number()
      .positive()
      .required('Must enter a price')
      .typeError('Please enter a valid number'),
    image_url: yup.string().url('Must be a valid URL').required('Must enter an image URL'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      category_id: '',
      price: '',
      image_url: '',
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      fetch('/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      }).then((res) => {
        if (res.status === 200) {
          setRefreshPage(!refreshPage);
        }
      });
    },
  });

  return (
    <div>
      <h1>Create Item</h1>
      <form onSubmit={formik.handleSubmit} style={{ margin: '30px' }}>
        <label htmlFor="name">Name</label>
        <br />
        <input
          id="name"
          name="name"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        <p style={{ color: 'red' }}>{formik.errors.name}</p>

        <label htmlFor="description">Description</label>
        <br />
        <input
          id="description"
          name="description"
          onChange={formik.handleChange}
          value={formik.values.description}
        />
        <p style={{ color: 'red' }}>{formik.errors.description}</p>

        <label htmlFor="category_id">Category ID</label>
        <br />
        <input
          id="category_id"
          name="category_id"
          type="number"
          onChange={formik.handleChange}
          value={formik.values.category_id}
        />
        <p style={{ color: 'red' }}>{formik.errors.category_id}</p>

        <label htmlFor="price">Price</label>
        <br />
        <input
          id="price"
          name="price"
          type="number"
          onChange={formik.handleChange}
          value={formik.values.price}
        />
        <p style={{ color: 'red' }}>{formik.errors.price}</p>

        <label htmlFor="image_url">Image URL</label>
        <br />
        <input
          id="image_url"
          name="image_url"
          onChange={formik.handleChange}
          value={formik.values.image_url}
        />
        <p style={{ color: 'red' }}>{formik.errors.image_url}</p>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ItemForm;

