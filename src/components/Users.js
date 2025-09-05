import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

function Users() {

    //Create a state
  const [users,setUsers]=useState([]);

  //Create multiple state to add new data
  const [newName,setNewName]=useState("");
  const [newEmail,setNewEmail]=useState("");
  const [newWebsite,setNewWebsite]=useState("");
  const[newCity,setNewCity]=useState("");
  const[newStreet,setNewStreet]=useState("");


  //create useEffect
  useEffect( () => {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response=> response.json())
    .then(data => setUsers(data))
  },[])

  function addUser(){
    const name=newName.trim();     //trim() - pre-defined js function to remove whitespaces
    const email=newEmail.trim();
    const website=newWebsite.trim();
    const city=newCity.trim();
    const street=newStreet.trim();


    if(name && email && website && city){
      fetch('https://jsonplaceholder.typicode.com/users',
        {
          method : "POST",
          body: JSON.stringify({name,email,website, address:{city,street}}), //JSON.stringify() is pre-defined js function used to convert Js objects into JSON formatted string
            headers: {
              "Content-Type":"application/json; charset=utf-8"
            }
        }
      )
      .then(response=> response.json())
      .then(data => {
        setUsers([...users,data]);        //... -> spread operator. It calls old array values & merges & stores as new array
        alert("User added Successfully!");
        setNewName("");
        setNewEmail("");
        setNewWebsite("");
        setNewCity("");
        setNewStreet("");
      }
      )
    }
  }

  return(
    <>
    <h2 className='text-center mt-3 mb-3 text-decoration-underline'>Users List</h2>
    <table className='table'>
      <thead>
        <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Email</th>
        <th>Website</th>
        <th>Address</th>
        <th>Action</th>
      </tr>
      </thead>

      <tbody>
        {users.map(
          (a) =>
          <tr key={a.id}>   {/* 'a' is user-defined variable. Here key is a id becoz that is unique*/}
          <td>{a.id}</td>
          <td>{a.name}</td>
          <td>{a.email}</td>
          <td>{a.website}</td>
          <td>{a.address.city} , {a.address.street}</td>
          <td>
            <Button variant="primary">Edit</Button>
            <Button variant="danger">Delete</Button>
          </td>
          </tr>
        )
        }
      </tbody>
      <tfoot>
        <tr>
          <td></td>
          <td><input type='text' placeholder='Enter Name' value={newName} onChange={(e) => setNewName(e.target.value)}/></td>
          <td><input type='text' placeholder='Enter Email' value={newEmail} onChange={(e) => setNewEmail(e.target.value)}/></td>
          <td><input type='text' placeholder='Enter website' value={newWebsite} onChange={(e) => setNewWebsite(e.target.value)}/></td>
          <td>
            <input type='text' placeholder='Enter City' value={newCity} onChange={(e) => setNewCity(e.target.value)}/>
            <input type='text' placeholder='Enter Street' value={newStreet} onChange={(e) => setNewStreet(e.target.value)}/>
          </td>
          <td><Button variant="success" onClick={addUser}>Add user</Button></td>
        </tr>
      </tfoot>
    </table>
    </>
  );
}

export default Users
