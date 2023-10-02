import { useState } from 'react';
import Input from '~/components/Form/Input';
import Select from '~/components/Form/Select';
function CusomerAdd() {
    const [type, setType] = useState('flower');
    const [number, setNumber] = useState(1);

    let optionsType = [
        { key: 'flower', value: 'flower', label: 'Khách Vường hoa' },
        { key: 'hotel', value: 'hotel', label: 'Khách Khách Sạn' },
    ];

    const handleTypeChange = (type) => {
        setType(type);
    };
    const handleNumberChange = (number) => {
        setNumber(number);
    };

    const handleClick = () => {
        console.log(type, number);
        setType('flower');
        setNumber(1);
    };
    return (
        <div>
            <div className="form-row">
                <label className="col">
                    Loại khách:
                    <Select options={optionsType} value={type} onChange={handleTypeChange} />
                </label>
            </div>
            <div className="form-row">
                <label className="col">
                    Số lượng:
                    <Input type={'number'} value={number} onChange={handleNumberChange} />
                </label>
                <div className="col">
                    <button onClick={handleClick}>Thêm</button>
                </div>
            </div>
        </div>
    );
}

export default CusomerAdd;
