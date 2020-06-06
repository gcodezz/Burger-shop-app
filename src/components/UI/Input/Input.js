import React from 'react'

import classes from './Input.css'

const input = (props) => {
    let inputElement = null
    let validationError = null
    const inputClasses = [classes.InputElement]

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid)
        validationError = <p className={classes.ValidationError}>Please enter a valid {props.valueType}!</p>
    }
    switch (props.elementType) {
        case ('input'):
            inputElement = <input
                className={inputClasses.join(' ')} 
                onChange={props.changed}
                {...props.elementConfig} 
                value={props.value} 
            />
            break
        case ('textarea'):
            inputElement = <textarea
                className={inputClasses.join(' ')} 
                onChange={props.changed}
                {...props.elementConfig} 
                value={props.value}
            />
            break
        case ('select'): 
            inputElement = (
                <select 
                    className={inputClasses.join(' ')} 
                    onChange={props.changed}
                    value={props.value}
                >
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            )
            break
        default:
            inputElement = <input 
                className={inputClasses} 
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
            />
    }
    return (
        <div>
        <div className={classes.Input}>
            <label>{props.label}</label>
            {inputElement}
        </div>
        <div className={classes.ValidationError}>
            {validationError}
        </div>
        </div>
    )
}

export default input