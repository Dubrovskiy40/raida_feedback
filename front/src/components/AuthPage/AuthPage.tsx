import {NavLink} from "react-router-dom"
import React, {useEffect, useState} from "react"
import IconButton from "@mui/material/IconButton"
import InputLabel from "@mui/material/InputLabel"
import FormControl from "@mui/material/FormControl"
import {useDispatch, useSelector} from "react-redux"
import OutlinedInput from "@mui/material/OutlinedInput"
import Visibility from "@mui/icons-material/Visibility"
import InputAdornment from "@mui/material/InputAdornment"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"

import style from "./authPage.module.css"
import img from "../../assets/images/auth/bg.png"
import logo from "../../assets/images/auth/logo.png"
import {getAuthState} from "../../store/selectors/selectors"
import {handleChangeAuth, logIn, logOut, setHref} from "../../store/authReducer"


const AuthPage: React.FC = () => {

    const dispatch = useDispatch()
    const {email, password, href} = useSelector(getAuthState)

    useEffect(() => {
        if (email.length !== 0 && password.length !== 0) {
            href !== "/hello" && dispatch(setHref("/hello"))
        } else {
            href !== "" && dispatch(setHref(""))
        }
    }, [href, email, password, dispatch])

    useEffect(() => {
        dispatch(logOut())
    }, [dispatch])

    const handleLogIn = (email: string, password: string) => {
        if (email.length !== 0 && password.length !== 0) {
            dispatch(logIn(email, password))
        }
    }

    const changeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(handleChangeAuth(event.target.name, event.target.value))
    }

    const [isShowPassword, setIsShowPassword] = useState<boolean>(false)

    const handleClickShowPassword = () => {
        setIsShowPassword(prevState => !prevState)
    }

    return (
        <div className={style.auth}>
            <div className={style.auth__section}>
                <img className={style.auth__logo} src={logo} alt="logo"/>
                <h1 className={style.auth__title}>WORLD OF POLLS</h1>
                <h2 className={style.auth__subtitle}>{"Регистрация"}</h2>
                <span className={style.auth__form_title}>{"Создать новый аккаунт"}</span>
                <form className={style.auth__form}>
                    <FormControl variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-email">{"Email"}</InputLabel>
                        <OutlinedInput
                            className={style.input}
                            id="outlined-adornment-email"
                            name={"email"}
                            value={email}
                            onChange={changeValue}
                            endAdornment={
                                <InputAdornment position="end">
                                    <KeyboardArrowDownIcon/>
                                </InputAdornment>
                            }
                            label="Email"
                        />
                    </FormControl>
                    <FormControl variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">{"Password"}</InputLabel>
                        <OutlinedInput
                            className={style.input}
                            id="outlined-adornment-password"
                            type={isShowPassword ? "text" : "password"}
                            value={password}
                            onChange={changeValue}
                            name={"password"}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                    >
                                        {isShowPassword ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>
                    <NavLink className={`${style.button}`} to={href} onClick={() => {
                        handleLogIn(email, password)
                    }}>{"СОЗДАТЬ АККАУНТ"}</NavLink>
                </form>
            </div>
            <img className={style.auth__img} src={img} alt="img"/>
        </div>
    )
}

export default React.memo(AuthPage)