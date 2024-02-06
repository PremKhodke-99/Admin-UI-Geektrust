import React, { useEffect, useState } from 'react';
import styles from './Table.module.css';
import { RiEditBoxLine } from "react-icons/ri";
import { MdOutlineDeleteForever } from "react-icons/md";


const Table = ({
  currentData,
  handleRowSelection,
  handleDeleteRows,
  selectedRow,
  handleSelectAll,
  editData,
  deleteData }) => {

  const [checked, setChecked] = useState(false);

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th><input
              type="checkbox"
              name="select-all"
              checked={selectedRow.length == currentData.length}
              onChange={() => {
                console.log(checked)
                setChecked(!checked);
                handleSelectAll(checked);
              }} /></th>
            <th><strong>Name</strong></th>
            <th><strong>Email</strong></th>
            <th><strong>Role</strong></th>
            <th><strong>Actions</strong></th>
          </tr>
        </thead>
        <tbody>
          {
            currentData.map((row, ind) => (
              <tr key={row.id} className={selectedRow.includes(row.id) ? styles.selected : ''}>
                <td><input
                  type="checkbox"
                  name={row.name}
                  value={row.id}
                  checked={selectedRow.includes(row.id)}
                  onChange={(e) => {
                    handleRowSelection(row.id)
                  }} /></td>
                <td>{row.name}</td>
                <td>{row.email}</td>
                <td>{row.role}</td>
                <td>
                  <div className={styles.action}>
                    <button name='edit'><RiEditBoxLine className={styles.edit} onClick={() => editData(ind)} /></button>
                    <button name='delete'><MdOutlineDeleteForever className={styles.delete} onClick={() => deleteData(row.id)} /></button>
                  </div>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <button className={styles.deleteButton} onClick={() => handleDeleteRows(setChecked)}>Delete Selected</button>
    </div>
  )
}

export default Table