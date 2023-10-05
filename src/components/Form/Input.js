const Input = ({ value, onChange, ...passProps }) => {
    return <input {...passProps} value={value} onChange={(e) => onChange(e.target.value)} />;
};

export default Input;
