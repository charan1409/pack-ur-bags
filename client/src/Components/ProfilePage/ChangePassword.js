import React,{ useState } from 'react'
import InputBox from '../Landing/InputBox'
import Error from '../ErrorPage/Error';

function ChangePassword(props) {
  const [pass,setPass] = useState({
    opass:"",
    npass:"",
    cnpass:""
  })
  const [loginError, setLoginError] = useState([false,""]);

  const changeHandler =(e) => {
    const nextFieldState = {
      ...pass,
      [e.target.name]: e.target.value
    };
    setPass(nextFieldState)
  }
  const closeLoginError = () => {
    setLoginError([false,""]);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if(pass.npass.trim().length < 6){
      setLoginError([true,"Password should be altleast 6 characters"])
    } else if(pass.npass !== pass.cnpass){
      setLoginError([true,"Passwords should be equal"])
    }else{
      setLoginError([false,""])
      props.users.forEach(e => {
        if(e.password === pass.opass){
          
        } else{
          setLoginError([true,"Incorrect password"])
        }
      });
    }
  };
  return (
    <div>
      <form onSubmit={submitHandler}>
        {loginError[0] && <Error msg={loginError[1]} onClick={closeLoginError} />}
        <InputBox type={"password"} placeholder={"old password"} name={"opass"} value={pass.opass} onChange={changeHandler}/>
        <InputBox type={"password"} placeholder={"new password"} name={"npass"} value={pass.npass} onChange={changeHandler}/>
        <InputBox type={"password"} placeholder={"confirm new password"} name={"cnpass"} value={pass.cnpass} onChange={changeHandler}/>
      </form>
    </div>
  )
}

export default ChangePassword
