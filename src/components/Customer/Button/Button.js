function Button({ to, onClick, text }) {
    return (
        <>
            <button onClick={onClick} to={to} className="btn-detail">
                {text}
            </button>
        </>
    );
}

export default Button;
