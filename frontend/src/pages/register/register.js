import React from 'react';
import './register.css';
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {

  const [stuid,setStuid] = useState('')
  const [password,setPassword] = useState('')
  const [confirmpassword,setConfirmpassword] = useState('')
  const [name,setName] = useState('')
  const [dob,setDob] = useState('')
  const [year,setYear] = useState('')
  const [dept,setDept] = useState('')
  const [gender,setGender] = useState('')
  
  let navigate = useNavigate();

  const handleSubmit = (event) => {

    event.preventDefault();

    const stuidRegex = /^CIT\d{3}$/;
    if(!stuidRegex.test(stuid))
    {
      alert("Student ID should be of the form CIT followed by 3 digits.");
      return;
    }


    if(password != confirmpassword)
    {
      alert("Password and Confirm Password doesn't match");
      return ;
    }


    let dobdate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - dobdate.getFullYear();
    const monthdiff = today.getMonth() - dobdate.getMonth();
    if(monthdiff < 0 || (monthdiff === 0 && today.getDate() < dobdate.getDate()))
    {
      age--;
    } 

    if(age<18)
    {
      alert("You must be at least 18 years old to register.");
      return;
    }

     axios.post("http://localhost:8000/register",{stuid,password,name,dob,year,dept,gender})
     .then(res=>{
      navigate('/login');
     }).catch(err => console.log(err));

  }



  return (
    <div className='register'>
        <div className='regbox'>
            <form onSubmit = {handleSubmit}>
                <h1 className='reghead'>New Student Registration</h1>
                <label>StudentID</label>
                <br />
                <input type="text" placeholder="Enter StudentID" onChange = {e => setStuid(e.target.value)} required />
                <br/>
                <label>PASSWORD</label>
                <br />
                <input type="password" placeholder="Enter Password" onChange = {e => setPassword(e.target.value)} required />
                <br />
                <label>CONFIRM PASSWORD</label>
                <br />
                <input type="password" placeholder="Confirm Password" onChange={e => setConfirmpassword(e.target.value)} required />
                <br />
                <label>NAME</label>
                <br />
                <input type="text" placeholder="Enter Name" onChange={e => setName(e.target.value)} required />
                <br/>
                <label>DATE OF BIRTH</label>
                <input className="forminput" type="date" name="dob" onChange = {e => setDob(e.target.value)} required/>
                <br />
                <label>YEAR </label>
                <select name="year" className='deptinput' onChange={e => setYear(e.target.value)} required >
                    <option value="">Select Year</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>
               
                <br />
                <label>DEPARTMENT</label>
                <select name="department" className='deptinput' onChange={e => setDept(e.target.value)} required >
                    <option value="">Select Department</option>
                    <option value="CSE">CSE</option>
                    <option value="IT">IT</option>
                    <option value="ECE">ECE</option>
                    <option value="EEE">EEE</option>
                    <option value="MECH">MECH</option>
                    <option value="MCT">MCT</option>
                </select>
                <br />


                <label>Gender</label>
                {/* <br /> */} 
                <input type="radio" value="Male" className='radioinput' onChange={e => setGender(e.target.value)} />Male
                <input type="radio" value="Female" className='radioinput' onChange={e => setGender(e.target.value)}/>Female
                <br />

                <button type="submit" className='signinbtn'>REGISTER</button>
            </form>
        </div>
    </div>
  )
}

export default Register