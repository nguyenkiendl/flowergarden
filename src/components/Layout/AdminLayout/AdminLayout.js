import NavAdmin from '~/components/NavAdmin';
import AdminHeader from '../components/AdminHeader';
function AdminLayout({ children }) {
    return (
        <div className="wrapper">
            <AdminHeader />
            <div className="container">
                <div className="content">{children}</div>
            </div>
            <NavAdmin />
        </div>
    );
}

export default AdminLayout;
