function Button(props) {
    return (
        <button type="submit"  className="btn float-right login_btn" onClick={props.onHandleClick}>
            {props.label}
        </button>
    )
}

export default Button;
