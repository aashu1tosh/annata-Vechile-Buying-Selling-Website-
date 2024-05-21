import { useEffect, useState } from 'react';
import './HomeDealer.css'
import { FaWindowClose } from 'react-icons/fa';
import axios from '../../services/instance';

function HomeDealer() {
  // for storing the data that we fetched
  const [carsData, setCarsData] = useState<any[]>([]);
  // for dialog add part and 
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [year, setYear] = useState<number | null>(null);
  const [manufacturer, setManufacturer] = useState<string | null>(null);
  const [model, setModel] = useState<string | null>(null);
  const [mileage, setMileage] = useState<number | null>(null);
  const [engine, setEngine] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);


  const handleSubmit = async (e: any) => {
    const token = localStorage.getItem('user');
    e.preventDefault();
    console.log(year, manufacturer, mileage, engine, description);
    await axios.post('car/create', { year, manufacturer, model, mileage, engine, description }, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        console.log(res);
        setDialogOpen(false);
      }).catch((err) => {
        console.log("Error occured");
        console.log(err);
        alert("Error Occurredin handle submit");
      })
  }

  const deleteCar = async (id: string) => {
    // console.log("Delete car pressed");
    const token = localStorage.getItem('user');
    await axios.delete(`/car/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        console.log(res);
        alert(res.data.message);
      }).catch((err) => {
        alert("Error occured in delete");
        console.log(err);
      })
  }

  useEffect(()=> {
    const token = localStorage.getItem('user')
    axios.get('/car/viewaddedcars', {headers: {Authorization: `Bearer ${token}`}})
      .then((res) => {
          console.log(res);
          setCarsData(res.data.cars);
          //printing setCarsData
          console.log("Printing cars data", carsData);
      })
  }, [])

  return (
    <>
      <div>
        <button className="add-car-button" onClick={() => { setDialogOpen(true) }}>Create Ad for Car</button>
      </div>

      <div>
        {
          carsData.map((data, index) => (
            <div className="" key={index} style={{border: '1px solid red', margin: '10px'}}>
              <p>{data.year}</p>
              <p>{data.manufacturer}</p>
              <p>{data.model}</p>
              <p>{data.mileage}</p>
              <p>{data.engine}</p>
              <p>{data.description}</p>
              {/* <p>{data._id}</p> */}
              <button onClick={() => deleteCar(data._id)}>Delete Car</button>
            </div>
          ))
        }
      </div>

      {
        dialogOpen && (
          <>
            <div className="backdrop1" onClick={() => { setDialogOpen(false) }}></div>
            <div className="center-dialog1">
              <dialog open style={{ zIndex: 2 }}>
                <FaWindowClose onClick={() => { setDialogOpen(false) }} size={25} style={{ float: "right" }} /><br />
                <form onSubmit={handleSubmit} >
                  <label htmlFor="">Year: </label><br />
                  <input type="number" onChange={(e) => { setYear(Number(e.target.value)) }} required /> <br />

                  <label htmlFor="">Manufacturer</label><br />
                  <input type="text" onChange={(e) => { setManufacturer(e.target.value) }} required/> <br />

                  <label htmlFor="">Model</label><br />
                  <input type="text" onChange={(e) => { setModel(e.target.value) }} required/> <br />

                  <label htmlFor="">Mileage</label><br />
                  <input type="text" onChange={(e) => { setMileage(Number(e.target.value)) }} required/> <br />

                  <label htmlFor="">Engine</label><br />
                  <input type="text" onChange={(e) => { setEngine(e.target.value) }} required/><br />

                  <label htmlFor="">Descriptioin</label><br />
                  <input type="text" onChange={(e) => { setDescription(e.target.value) }} /><br />
                  <button type="submit" className='submit-form-button'>Submit the form </button>
                </form>
              </dialog>

            </div>
          </>
        )
      }
    </>

  )
}

export default HomeDealer