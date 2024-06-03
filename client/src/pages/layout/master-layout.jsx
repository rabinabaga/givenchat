import { Outlet } from "react-router-dom";
import HeaderComponent from "../../components/header-component";
import FooterComponent from "../../components/footer-component";
import "./master-layout.modules.css"
const MasterLayout = () => {
    return(
        <>
            <HeaderComponent></HeaderComponent>
            <Outlet/>
            <FooterComponent></FooterComponent>
        </>
    )
}

export default MasterLayout;