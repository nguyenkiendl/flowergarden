const Iframe = ({ key, src, onChange, ...passProps }) => {
    return <>
        <iframe
            {...passProps}
            key={key}
            src={src}
            style={{ display: 'block' }}
            title="PRINT"
        />
    </>
};

export default Iframe;