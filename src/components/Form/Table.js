const Table = ({ datas, onChange }) => {
    let header = Object.keys(datas);

    return (
        <div className="table-responsive">
            <table>
                <thead>
                    {header.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td></td>
                            </tr>
                        );
                    })}
                </thead>
                <tbody>
                    {datas.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td></td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
