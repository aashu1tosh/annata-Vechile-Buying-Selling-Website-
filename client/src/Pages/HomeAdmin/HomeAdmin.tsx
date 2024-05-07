import { useEffect, useState } from "react"
import axios from "../../services/instance"


function HomeAdmin() {

  // const [data, setData] = useState([]);
  useEffect(() => {
    const token: string | null = localStorage.getItem('user');
    try {
      axios.get('/user/getall', { headers: { Authorization: `Bearer ${token}` } }).then((res) => {
        if (res) {
          // setData(res.data.users);
          console.log(res);
          res.data.users.forEach(element => {
            console.log(typeof(element))
            console.log(element.name, element.role, element.email);
          });
        }
      }).catch(() => {
        console.log('Promise Error',)
      })
    } catch (error) {
      console.log('Error aayo')
    }

  })
  return (
    <>
      <div>HomeAdmin</div>
      <p>{data}</p>
    </>


  )
}

export default HomeAdmin