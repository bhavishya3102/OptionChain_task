import React, { useEffect, useState } from 'react';
import './App.css'; 

const App = () => {
  const [data, setdata] = useState([]);
  const [date, setdate] = useState([]);
  const [selectval, setselectval] = useState('');
  const [indexValue, setIndexValue] = useState(1000);

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

  function handlechange(event) {
    setselectval(event.target.value);
  }

  return (
    <div>
      <select id="id1" value={selectval} onChange={handlechange}>
        <option value="">--Show All--</option>
        {date &&
          date.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
      </select>

      <div>
        Underlying Index: NIFTY <span id='bold'>{indexValue.toFixed(2)}</span> As on {current_date} {current_time}
      </div>

      <table className="table">
        <thead>
          <tr>
            <th colSpan="10" className="calls-header">
              CALLS
            </th>
            <th colSpan="11" className="puts-header">
              PUTS
            </th>
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
                <td>{item.CE ? item?.CE?.openInterest : '-'}</td>
                <td>{item.CE ? item?.CE?.changeinOpenInterest : '-'}</td>
                <td>{item.CE ? item?.CE?.totalTradedVolume : '-'}</td>
                <td>{item.CE ? item?.CE?.impliedVolatility : '-'}</td>
                <td>{item.CE ? item?.CE?.lastPrice : '-'}</td>
                <td>{item.CE ? item?.CE?.change.toFixed(2) : '-'}</td>
                <td>{item.CE ? item?.CE?.bidQty : '-'}</td>
                <td>{item.CE ? item?.CE?.bidprice : '-'}</td>
                <td>{item.CE ? item?.CE?.askQty : '-'}</td>
                <td>{item.CE ? item?.CE?.askPrice : '-'}</td>
                <td>{item.CE ? item?.CE?.strikePrice : '-'}</td>
                <td>{item.CE ? item?.PE?.bidQty : '-'}</td>
                <td>{item.CE ? item?.PE?.bidprice : '-'}</td>
                <td>{item.CE ? item?.PE?.askPrice : '-'}</td>
                <td>{item.CE ? item?.PE?.askQty : '-'}</td>
                <td>{item.CE ? item?.PE?.change.toFixed(2) : '-'}</td>
                <td>{item.CE ? item?.PE?.lastPrice : '-'}</td>
                <td>{item.CE ? item?.PE?.impliedVolatility : '-'}</td>
                <td>{item.CE ? item?.PE?.totalTradedVolume : '-'}</td>
                <td>{item.CE ? item?.PE?.changeinOpenInterest : '-'}</td>
                <td>{item.CE ? item?.PE?.openInterest : '-'}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
