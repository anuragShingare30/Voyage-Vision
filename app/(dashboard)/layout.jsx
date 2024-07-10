import { Sidebar } from "../../components/Sidebar";
import { CiMenuFries } from "react-icons/ci";
import { RiOpenaiFill } from "react-icons/ri";

function LayoutPage({ children }) {

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            
            <div className="drawer-content px-12 py-12">
            
                {children}
                <label htmlFor="my-drawer-2" className="drawer-button lg:hidden fixed top-3 right-6">
                <CiMenuFries className="text-2xl"/>
                </label>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className=" menu bg-base-200 text-base-content min-h-full w-80 p-6">
                    <Sidebar></Sidebar>
                </div>
               
            </div>
        </div>
    );
};

export default LayoutPage;