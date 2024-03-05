import './InputField.scss';
import { useState } from 'react';
import { HiEye, HiEyeOff } from "react-icons/hi"

const InputField = ({ id = "", name = "", label, type = "text", varient = "default", placeholder = "", width, icon, iconPos = "start", value, toggle, disable, loading, actionButton, actionIcon, onChange }) => {
    const [onToggle, setOnToggle] = useState(false);

    return (
        <div className="comp-inputfield ">
            {label && <label htmlFor={id || name}>{label}</label>}
            <div style={{ width: width ? width : "100%" }} className={`field ${varient}`}>

                {icon && iconPos === "start" && <span className='icon' htmlFor={name}>{icon}</span>}
                {type !== "password" && <input autoComplete='off' id={name} disabled={disable} name={name} type={type} placeholder={placeholder} value={value && value} onChange={onChange} />}
                {type === "password" && <input autoComplete='off' id={name} name={name} disabled={disable} type={!onToggle ? "password" : "text"} placeholder={placeholder} value={value && value} onChange={onChange} />}
                {icon && iconPos === "end" && <span className='icon' htmlFor={name}>{icon}</span>}

                {/* password toggle icon */}
                {type === 'password' && toggle && <>
                    {onToggle ? <div type="button" className='toggle' onClick={(e) => {
                        e.stopPropagation();
                        setOnToggle(false)
                    }}> <HiEye /></div> : <div type="button" className='toggle' onClick={(e) => {
                        e.stopPropagation();
                        setOnToggle(true)
                    }} > <HiEyeOff /> </div>}
                </>}

                {actionButton && <button onClick={(e) => { e.stopPropagation(); actionButton(); }} className='button'>{actionIcon ? actionIcon : "Click"}</button>}
                {loading && <div className='load-wrapper'>
                    <div className='loading'></div>
                </div>}
            </div>
        </div >
    )
}

export default InputField 