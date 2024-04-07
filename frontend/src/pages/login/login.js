import React ,{useState} from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 


function Login() {
  const[IsAdmin,setIsAdmin] = useState(false);
  const[IsStudent,setIsStudent] = useState(false);
  const[adminusername,setAdminUsername] = useState('');
  const[adminpassword,setAdminPassword] = useState('');
  const[stuid,setStuId] = useState('');
  const[password,setPassword] = useState('');
  const navigate = useNavigate();

  const handleAdminSubmit = (e) => {
    e.preventDefault();

    if (adminusername == 'admin' && adminpassword === 'admin')
    {
      navigate('/admin');
    }
    else
    {
      alert('Invalid Username or Password for Admin');
    }
  }

//   const handleStudentLogin = async (e) => {
//     e.preventDefault();
//     try {
//         const response = await axios.post('http://localhost:8000/login', {
//             stuid: stuid,
//             password: password
//         });
//         if (response.data === 'success') {
//             navigate('/user/${stuid}');
//         } else {
//             alert('Invalid credentials');
//         }
//     } catch (error) {
//         console.error(error);
//         alert('An error occurred');
//     }
// };

const handleStudentLogin = async (e) => {
  e.preventDefault();
  try {
      const response = await axios.post('http://localhost:8000/login', {
          stuid: stuid,
          password: password
      });
      if (response.data === 'success') {
          // Set the stuid here
          const loggedInStuid = stuid;
          // Redirect to user page
          navigate(`/user/${loggedInStuid}`);
      } else {
          alert('Invalid credentials');
      }
  } catch (error) {
      console.error(error);
      alert('An error occurred');
  }
};


  


  const handleadminclick = event => {
    setIsAdmin(current => !current);
    if(IsStudent==true)
    {
        setIsStudent(current => !current);
    }
  }

  const handlestudentclick = event => {
    setIsStudent(current => !current);
    if(IsAdmin==true)
    {
        setIsAdmin(current => !current);
    }
  }


  return (
    <div className='login'>
       <div className='loginbox'>
            <button className='aubtn' onClick={handleadminclick}>ADMIN</button>
            <button className='aubtn' onClick={handlestudentclick}>STUDENT</button>
            {IsAdmin && (
            <form onSubmit = {handleAdminSubmit}>
                <h1 className='loginheading'>ADMIN LOGIN</h1>
                <label>USERNAME</label>
                <br />
                <input type="text" placeholder="Enter UserName" value={adminusername} onChange={(e) => setAdminUsername(e.target.value)} required />
                <br/>
                <label>PASSWORD</label>
                <input type="password" placeholder="Enter Password" value={adminpassword} onChange={(e) => setAdminPassword(e.target.value)} required/>
                <br />
                <button type="submit" className='signinbtn'>SIGN IN</button>
            </form>
            )}
            {IsStudent && ( 
            <form onSubmit={handleStudentLogin}>
                <h1 className='loginheading'>STUDENT LOGIN</h1>
                <label>STUDENT ID</label>
                <input type="text" placeholder='Enter Student ID' value={stuid} onChange={(e) => setStuId(e.target.value)} required/>
                <br />
                <label>PASSWORD</label>
                <input type="password" placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} required/>
                <br />
                <button type="submit" className='signinbtn'>SIGN IN</button>
               <p className="accreg">Does Have an Account?<a href="/register" className='regspan'> Register</a> Here.</p> 
            </form>
            )}
        </div>
    </div>
  )
}

export default Login