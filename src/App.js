import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';
import SearchBar from './Components/SearchBar/SearchBar'
import Table from './Components/Table/Table';
// import Pagination from './Components/Pagination/Pagination';


function App() {

  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 10;

  useEffect(() => {
    axios.get('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
      .then((res) => setData(res.data))
      .catch((err) => console.error("Not able to fetch data", err.message));
  }, []);

  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = data.slice(indexOfFirstData, indexOfLastData);
  const nPages = Math.ceil(data.length / dataPerPage);

  const handleRowSelection = (rowid) => {
    if (selectedRow.includes(rowid)) {
      setSelectedRow(selectedRow.filter((id) => id !== rowid))
    } else {
      setSelectedRow([...selectedRow, rowid])
    }
    const newData = data.map((row) => {
      if (row.id === rowid) {
        return { ...row }
      }
      return row;
    });
    setData(newData);
  }

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedRow([])
    } else {
      setSelectedRow(currentData.map((row) => row.id));
    }
  }

  const handleDeleteRows = (setChecked) => {
    const newData = data.filter((row) => !selectedRow.includes(row.id));
    setData(newData);
    setSelectedRow([]);
    setChecked(prev => !prev)
  }

  const editData = () => {

  }

  const deleteData = (id) => {
    const dataRow = [...data];
    let ind = dataRow.findIndex((row) => row.id === id)
    dataRow.splice(ind, 1);
    setData(dataRow);
  }

  return (
    <div className='wrapperMain'>
      <SearchBar
        data={data}
        setData={setData} />
      <Table
        currentData={currentData}
        handleRowSelection={handleRowSelection}
        handleDeleteRows={handleDeleteRows}
        selectedRow={selectedRow}
        handleSelectAll={handleSelectAll}
        editData={editData}
        deleteData={deleteData}
        nPages={nPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage} />
      {/* <Pagination
        nPages={nPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage} /> */}
    </div>
  )
}

export default App
