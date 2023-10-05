const Select = ({ value, options, onChange, ...passProps }) => {
    return (
        <select {...passProps} value={value} onChange={(e) => onChange(e.target.value)}>
            {options.map((option, index) => {
                return (
                    <option key={option.key} value={option.value}>
                        {option.label}
                    </option>
                );
            })}
        </select>
    );
};

export default Select;
