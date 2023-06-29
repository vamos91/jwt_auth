import React, { useState } from 'react'
import {
    Form,
    FormGroup,
    Input,
    Label,
    NavLink,
    Button
} from 'reactstrap'
import {Link, useNavigate} from 'react-router-dom'

function Signup() {
    const Navigate = useNavigate()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [city, setCity] = useState('')
    const [language, setLanguage] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    const signup = async (e) => {
        e.preventDefault()
        const logUserResponseFromBack = await fetch('/users/signup', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                firstname: firstName,
                lastname: lastName,
                city: city,
                language: language,
                email: email,
                password: password
            })
        })
        console.log(logUserResponseFromBack)
        if(logUserResponseFromBack.status === 200){
            const logUserResponseFromBackJson = await logUserResponseFromBack.json()
            Navigate('/')
        }
        
    }
  return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Form onSubmit={(e) => signup(e)} style={{width: '30%'}}>
        <FormGroup>
                <Label for="exampleEmail">
                Firstname
                </Label>
                <Input
                name="firstname"
                placeholder="with a placeholder"
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                />
            </FormGroup>
            <FormGroup>
                <Label for="exampleEmail">
                Lastname
                </Label>
                <Input
                name="lastname"
                placeholder="with a placeholder"
                type="text"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                />
            </FormGroup>
            <FormGroup>
                <Label for="exampleEmail">
                Language
                </Label>
                <Input
                name="langue"
                placeholder="with a placeholder"
                type="text"
                onChange={(e) => setLanguage(e.target.value)}
                value={language}
                />
            </FormGroup>
            <FormGroup>
                <Label for="exampleEmail">
                City
                </Label>
                <Input
                name="city"
                placeholder="with a placeholder"
                type="text"
                onChange={(e) => setCity(e.target.value)}
                value={city}
                />
            </FormGroup>
            <FormGroup>
                <Label for="exampleEmail">
                Email
                </Label>
                <Input
                name="email"
                placeholder="with a placeholder"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                />
            </FormGroup>
            <FormGroup>
                <Label for="examplePassword">
                Password
                </Label>
                <Input
                name="password"
                placeholder="password placeholder"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                />
            </FormGroup>
            <FormGroup>
                <Label for="examplePassword">
                Confirm password
                </Label>
                <Input
                name="confimpassword"
                placeholder="password placeholder"
                type="password"
                onChange={(e) => setConfirmPass(e.target.value)}
                value={confirmPass}
                />
            </FormGroup>
            <Button style={{width: '100%'}} type="submit" color='success'>Signup</Button>
            <span>Already member ?</span><span><NavLink style={{textDecoration: 'underline'}} tag={Link} to="/">Signin</NavLink></span>
        </Form>
    </div>
    
  )
}

export default Signup