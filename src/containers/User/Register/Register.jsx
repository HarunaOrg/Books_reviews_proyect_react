import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser, userData } from '../userSlice';

import "./Register.css";

const Register = props => {

  const dispatch = useDispatch()

  let navigate = useNavigate()

  const identification = useSelector(userData)

  const [register, setRegister] = useState({
    name: "",
    nick_name: "",
    email: "",
    password: ""
  })

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate('/')
    }
  }, [])

  const handleInput = (e) => {
    setRegister(
      {
        ...register,
        [e.target.name]: e.target.value
      }
    )
  }

  const userRegister = (event) => {
    event.preventDefault()

    //Esta expresión regular ayuda a validar un email
    if (! /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(register.email)) {
      setRegister(
        {
          ...register,
          isError: true,
          message: "E-mail incorrecto"
        }
      );
      return;
    }

    if (register.password.length >= 6) {
      //Esta expresión regular ayuda a validar un password (número + letras en este caso)
      if (! /[\d()+-]/g.test(register.password)) {
        setRegister(
          {
            ...register,
            isError: true,
            message: "Contraseña incorrecta"
          }
        );
        return;
      };
    } else {
      setRegister(
        {
          ...register,
          isError: true,
          message: "La contraseña debe tener al menos 6 carácteres"
        }
      );
      return;
    }

    setRegister(
      {
        ...register,
        isError: false,
        errorMsg: ""
      }
    )

    dispatch(registerUser
      (
        register.name,
        register.nick_name,
        register.email,
        register.password
      )
    )

  }


  return (
    <div className='mainBox'>

      <div className='mainRegisterBox'>

        <Form className='registerForm' onSubmit={userRegister}>

          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label className='registerLabel'>Nombre</Form.Label>
            <Form.Control className='registerInput' type="text" name='name' placeholder='Introduce tu nombre' onChange={handleInput} />
            <Form.Text className="text-muted">
              blabla.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicNickname">
            <Form.Label className='registerLabel'>Apodo</Form.Label>
            <Form.Control className='registerInput' type="text" name='nick_name' placeholder='Introduce un apodo' onChange={handleInput} />
            <Form.Text className="text-muted">
              blabla.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className='registerLabel'>Correo electrónico</Form.Label>
            <Form.Control className='registerInput' type="text" name='email' placeholder='Introduce un email de contacto' onChange={handleInput} />
            <Form.Text className="text-muted">
              Formato de E-mail válido obligatorio.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className='registerLabel'>Contraseña</Form.Label>
            <Form.Control className='registerInput' type="password" name='password' placeholder='Password' onChange={handleInput} />
            <Form.Text className="text-muted">
              Debe ser mínimo de 6 carácteer.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3 boxButton">
            <button className='sendButtom' variant="primary" type="submit">
              Registrarse
            </button>

            <p className='message'>{register.isError ? register.message : ''}</p>
            <p>{identification.isError ? identification.errorMessage : identification.successMessage}</p>
          </Form.Group>

        </Form>

      </div>

    </div>
  )
}

export default Register