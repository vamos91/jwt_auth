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

function Signin() {
    const Navigate = useNavigate()
    const [email, setEmail] = useState('Julie37@yahoo.com')
    const [password, setPassword] = useState('12345678')
    const signin = async (e) => {
        e.preventDefault()
        const logUserResponseFromBack = await fetch('/users/signin', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })

        if(logUserResponseFromBack.status === 200){
            const logUserResponseFromBackJson = await logUserResponseFromBack.json()
            Navigate('/dashboard')
        }
        
    }
  return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
        <Form onSubmit={(e) => signin(e)}>
            <FormGroup>
                <Label for="exampleEmail">
                Email
                </Label>
                <Input
                id="exampleEmail"
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
                id="examplePassword"
                name="password"
                placeholder="password placeholder"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                />
            </FormGroup>
            <Button style={{width: '100%'}} type="submit" color='success'>Signin</Button>
            <span>Not member yet ?</span><span><NavLink style={{textDecoration: 'underline'}} tag={Link} to="/signup">Signup</NavLink></span>
        </Form>
    </div>
    
  )
}

export default Signin