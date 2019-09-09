import React from 'react'

const FoodForm = ({ food, handleChange, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <label>Food</label>
    <input
      placeholder="food name"
      value={food}
      onChange={handleChange}
    />
    <button type="submit">submit</button>
  </form>
)

export default FoodForm
