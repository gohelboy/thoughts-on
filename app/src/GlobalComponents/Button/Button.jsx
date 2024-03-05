/* import './Button.scss'

const Button = ({ width = "fit-content", type = 'button', text, icon, varient = "default", iconPos = "start", onClick, isLoading = false, disabled }) => {
    return (
        <div style={{ width: width }} className="comp-button" itemType='button'>
            <button className={varient} type={type} onClick={() => { onClick && onClick() }} style={{ opacity: disabled == true && "0.5" }} disabled={disabled == true ? true : false}>
                {!isLoading && icon && iconPos === "start" && icon}
                {text}
                {!isLoading && icon && iconPos === "end" && icon}
                {isLoading && <div className='load-wrapper'>
                    <div className='loading'></div>
                </div>}
            </button>
        </div>
    )
}

export default Button */

import './Button.scss';

const Button = ({ width = 'fit-content', type = 'button', text, icon, variant = 'default', iconPos = 'start', onClick, isLoading = false, disabled }) => {

    const isDisabled = disabled === true;

    return (
        <div style={{ width }} className="comp-button">
            <button className={variant} type={type} onClick={onClick} style={{ opacity: isDisabled ? 0.5 : 1 }} disabled={isDisabled} >
                {!isLoading && icon && iconPos === 'start' && icon}
                {text}
                {!isLoading && icon && iconPos === 'end' && icon}
                {isLoading && (<div className="load-wrapper"> <div className="loading" /> </div>)}
            </button>
        </div>
    );
};

export default Button;
