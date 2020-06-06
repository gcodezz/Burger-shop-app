import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import validator from 'validator'

import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import Spinner from '../../components/UI/Spinner/Spinner'
import classes from './Auth.css'
import * as actions from '../../store/actions/auth' 

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
        },
        isSignup: false,
        formIsValid: false
    }

    componentDidMount () {
        //console.log(this.props.buildingBuilder)
        this.props.onSetAuthRedirectPath('/')
        if (this.props.buildingBuilder) {
            return this.props.onSetAuthRedirectPath('/checkout')
        } 
    }

    checkValidity(value, rules) {
        let isValid = true

        if (rules.required) {
            isValid = value.trim() !== '' && isValid
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            isValid = validator.isEmail(value) && isValid
        }

        if (rules.isNumeric) {
            isValid = validator.isNumeric(value) && isValid
        }

        return isValid
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedAuthForm = {
            ...this.state.controls
        }
        const updatedFormElement = {
            ...updatedAuthForm[inputIdentifier]
        }
        updatedFormElement.value = event.target.value
        updatedFormElement.valid = this.checkValidity(
            updatedFormElement.value, 
            updatedFormElement.validation
        )
        updatedFormElement.touched = true
        updatedAuthForm[inputIdentifier] = updatedFormElement

        let formIsValid = true
        for (let inputIdentifier in updatedAuthForm) {
            formIsValid = updatedAuthForm[inputIdentifier].valid && formIsValid
        }
        //console.log(formIsValid)
        this.setState({
            controls: updatedAuthForm,
            formIsValid: formIsValid
        })
    }

    submitHandler = (event) => {
        event.preventDefault()
        this.props.onAuth(
            this.state.controls.email.value,
            this.state.controls.password.value,
            this.state.isSignup
        )
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {
                isSignup: !prevState.isSignup
            }
        })
        //console.log(this.state.isSignup)
    }

    render () {
        const formElementsArray = []
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        let form = formElementsArray.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                valueType={formElement.config.placeholder}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}
            />
        ))
        
        if (this.props.loading) {
            form = <Spinner />
        }

        let errorMessage = null

        if (this.props.error) {
            //console.log(this.props.error)
            errorMessage = (
                <p>{this.props.error}</p>
            )
        }

        let authForm = (
            <div className={classes.Auth}>
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button 
                        disabled={!this.state.formIsValid}
                        btnType="Success">{this.state.isSignup ? 'Sign Up' : 'Login' }
                    </Button>
                </form>
                <Button 
                    btnType="Danger"
                    clicked={this.switchAuthModeHandler}
                >
                    {this.state.isSignup ? 'SWITCH TO LOGIN' : 'SWITCH TO SIGNUP'}
                </Button>
            </div>
        )

        if (this.props.isAuthenticated) {
            authForm = <Redirect to={this.props.authRedirectPath} />
        }

        return (
            <div>
                {authForm}       
            </div>
              
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBuilder: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)