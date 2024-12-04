import React, { useEffect, useState } from 'react';
import './App.css'; 

const App = () => {
  const [data, setdata] = useState([]);
  const [date, setdate] = useState([]);
  const [selectval, setselectval] = useState('');
  const [indexValue, setIndexValue] = useState(1000);
  const [moddata, setmoddata] = useState(() => {

    const savedData = localStorage.getItem('moddata');
    return savedData ? JSON.parse(savedData) : {};
  });

  const filterdata = selectval
    ? data.filter((item) => item.expiryDate === selectval)
    : data;

  const sortedData = [...filterdata].sort(
    (a, b) => a.strikePrice - b.strikePrice
  );

  const time_date = new Date();
  const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
  const current_time = time_date.toLocaleTimeString('en-GB', timeOptions);
  const options = { year: 'numeric', month: 'short', day: '2-digit' };
  const current_date = time_date.toLocaleDateString('en-GB', options);

  const fetchdata = async (api) => {
    try {
      const resp = await fetch(api);
      const data1 = await resp.json();
      const newindexval = indexValue + parseFloat(Math.random().toFixed(2));
      setdata(data1.records.data);
      setdate(data1.records.expiryDates);
      setIndexValue(newindexval);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchdata('https://run.mocky.io/v3/b2847f7f-f1d8-48d6-84e1-dab1387f1711');

    const intervalId = setInterval(() => {
      fetchdata(
        'https://run.mocky.io/v3/b2847f7f-f1d8-48d6-84e1-dab1387f1711'
      );
    }, 30000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    localStorage.setItem('moddata', JSON.stringify(moddata));
  }, [moddata]);

  const handlechange = (e) => {
    setselectval(e.target.value);
  };

  const inputhandler = (index, value) => {
    setmoddata((prevState) => ({
      ...prevState,
      [index]: value, 
    }));
    console.log(moddata)
  };

  return (
    <div>
      <select id="id1" value={selectval} onChange={handlechange}>
        <option value=''>--Show All--</option>
        {date &&
          date.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
      </select>

      <div>
        Underlying Index: NIFTY <span id="bold">{indexValue.toFixed(2)}</span> As on {current_date} {current_time}
      </div>

      <table className="table">
        <thead>
          <tr>
            <th colSpan="10" className="calls-header">CALLS</th>
            <th colSpan="11" className="puts-header">PUTS</th>
          </tr>
          <tr>
            <th>OI</th>
            <th>CHNG IN OI</th>
            <th>VOLUME</th>
            <th>IV</th>
            <th>LTP</th>
            <th>CHNG</th>
            <th>BID QTY</th>
            <th>BID</th>
            <th>ASK</th>
            <th>ASK QTY</th>
            <th>STRIKE</th>
            <th>BID QTY</th>
            <th>BID</th>
            <th>ASK</th>
            <th>ASK QTY</th>
            <th>CHNG</th>
            <th>LTP</th>
            <th>IV</th>
            <th>VOLUME</th>
            <th>CHNG IN OI</th>
            <th>OI</th>
          </tr>
        </thead>
        <tbody>
          {sortedData &&
            sortedData.map((item, index) => (
              <tr key={index}>
                <td>{item?.CE?.openInterest}</td>
                <td>{item?.CE?.changeinOpenInterest}</td>
                <td>{item?.CE?.totalTradedVolume}</td>
                <td>{item?.CE?.impliedVolatility}</td>
                <td>
                  <input type='number'
                    value={moddata[index] || item?.CE?.lastPrice || ''}
                    onChange={(e) => inputhandler(index, e.target.value)}
                  />
                </td>
                <td>{item?.CE?.change.toFixed(2)}</td>
                <td>{item?.CE?.bidQty}</td>
                <td>{item?.CE?.bidprice}</td>
                <td>{item?.CE?.askQty}</td>
                <td>{item?.CE?.askPrice}</td>
                <td>{item?.strikePrice}</td>
                <td>{item?.PE?.bidQty}</td>
                <td>{item?.PE?.bidprice}</td>
                <td>{item?.PE?.askPrice}</td>
                <td>{item?.PE?.askQty}</td>
                <td>{item?.PE?.change.toFixed(2)}</td>
                <td>{item?.PE?.lastPrice}</td>
                <td>{item?.PE?.impliedVolatility}</td>
                <td>{item?.PE?.totalTradedVolume}</td>
                <td>{item?.PE?.changeinOpenInterest}</td>
                <td>{item?.PE?.openInterest}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
