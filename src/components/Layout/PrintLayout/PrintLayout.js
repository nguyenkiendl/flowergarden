function PrintLayout({ children }) {
    window.onafterprint = (e) => {
        console.log('after print');
    };
    return (
        <>
            <div className="print-layout">
                <div className="print-wrapper">{children}</div>
            </div>
        </>
    );
}

export default PrintLayout;
