import React from 'react'

const WineForm = ({ wine, handleChange, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <label>Wine</label>
    <input
      placeholder="wine type"
      value={wine}
      onChange={handleChange}
    />
    <button type="submit">submit</button>
  </form>
)

export default WineForm
