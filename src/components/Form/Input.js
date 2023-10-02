const Input = ({ type, value, onChange }) => {
    return (
        <input
            type={type}
            id="customer-number"
            className="frm__input"
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    );
};

export default Input;
