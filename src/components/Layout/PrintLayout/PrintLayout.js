function PrintLayout({ children }) {
    return (
        <>
            <div className="print-layout">
                <div className="print-wrapper">{children}</div>
            </div>
        </>
    );
}

export default PrintLayout;
