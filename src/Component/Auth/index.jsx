import React from "react";
import {AppBar, Box, Toolbar, Typography, Button, IconButton, Card, CardContent, TextField} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import logo from "./21-avatar-outline.gif"
import { useNavigate } from "react-router";
import "./style.css"
import { authRequest, registerRequest } from "../../server/fetchers/auth";
import addToken from "../../helpers";

const Home = () => {
    let history = useNavigate();
    const [loginList, setLoginList] = React.useState('')
    const [passwordList, setPasswordList] = React.useState('')
    const [emailList, setEmailList] = React.useState('')
    const [passwordRegistrationList, setPasswordRegistrationList] = React.useState('')
    const [error, setError] = React.useState(false)
    const [errorRegistration, setErrorRegistration] = React.useState(false)
    const [registragion, setRegistragion] = React.useState(false)
    const authExamination = async () => {
        try{
            await addToken(authRequest, {email: loginList, password: passwordList})
            history("/posts");
        }
        catch{
            setError(true);
        }
    }
    const registerForm = async () => {
        try {
            await addToken(registerRequest, {email: emailList, password: passwordRegistrationList})
            history("/posts");
        }
        catch{
            setErrorRegistration(true)
        }
    }
    return (
        <>
        <Box  sx={{ flexGrow: 1 }}>
        <AppBar selected className="boxItem" position="static">
            <Toolbar>
                <IconButton
                size = "large"
                edge = "start"
                color = "inherit"
                aria-label = "menu"
                sx = {{ mr: 2 }}
                >
                <MenuIcon />
                </IconButton>
                <Typography variant = "h6" component = "div" sx = {{ flexGrow: 1 }}>
                Test registration
                </Typography>
            </Toolbar>
        </AppBar>
        </Box>
        <Card selected className="cardItem">
        <img className={"img_logo"} src={logo}/>
        <CardContent className="cardContentItem">
            <Typography className="cardText" sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
            Member Login
            </Typography>
            {!registragion &&
            <>
            <TextField 
                id="outlined-basic"
                label="UserName"
                variant="outlined"
                className="cardLogin"
                color="success"
                onChange = {(e) => setLoginList(e.target.value)}
                value={loginList}
            />
            <TextField
                type="password"
                label="Password"
                variant="outlined"
                className="cardPassword"
                color="success"
                value={passwordList}
                onChange = {(e) => setPasswordList(e.target.value)}
            />
            <div className={'box_flex'}>
            <Button className={'box_flex-button'} onClick = {authExamination} variant="contained" color="success">
                Войти
            </Button>
            <Button onClick = {() => setRegistragion(true)} variant="contained" color="success">
                Зарегестрироваться
            </Button>
            </div>
            {error &&
            <Typography className="cardText" sx={{ fontSize: 20 }} color="error" gutterBottom>
            Неправильный логин или пароль
            </Typography>
            }
            </>
            }
            {registragion &&
            <>
            <TextField 
                id="outlined-basic"
                label="Email"
                variant="outlined"
                className="cardLogin"
                color="success"
                onChange = {(e) => setEmailList(e.target.value)}
                value={emailList}
            />
            <TextField
                type="password"
                label="Password"
                variant="outlined"
                className="cardPassword"
                color="success"
                value={passwordRegistrationList}
                onChange = {(e) => setPasswordRegistrationList(e.target.value)}
            />
            <div className={'box_flex'}>
            <Button className={'box_flex-button'} onClick = {registerForm} variant="contained" color="success">
                Зарегестрироваться
            </Button>
            <Button onClick = {()=> setRegistragion(false)} variant="contained" color="success">
                Назад
            </Button>
            </div>
            {errorRegistration &&
            <Typography className="cardText" sx={{ fontSize: 20 }} color="error" gutterBottom>
            Введите email и пароль
            </Typography>
            }
            </>
            }
        </CardContent>
        </Card>
        </>
    )
}

export default Home;