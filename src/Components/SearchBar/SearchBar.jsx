import React from 'react'
import styles from './SearchBar.module.css';

const SearchBar = ({data, setData}) => {

  const handleSearch = (e) => {
    let value = e.target.value;
    console.log(value)
    let filteredData = data.filter((data) => 
      data.name.toLowerCase().includes(value.toLowerCase()) || 
      data.email.toLowerCase().includes(value.toLowerCase()) || 
      data.role.toLowerCase().includes(value.toLowerCase())
    )
    setData(filteredData);
  }

  return (
    <div className={styles.wrapper}>
      <input
        type="text"
        placeholder='Search by name, email or role'
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch(e);
          }
        }}
        className={styles.search}
      />
    </div>
  )
}

export default SearchBar