const Select = ({ datas, onChange }) => {
    console.log(datas);
    let input = datas;
    return (
        <select id={input.id} className={input.class} value={input.value} onChange={(e) => onChange(e.target.value)}>
            {input.options.map((option, index) => {
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
