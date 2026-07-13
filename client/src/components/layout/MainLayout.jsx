import Sidebar from "./Sidebar";

import {
    Outlet
}
from "react-router-dom";



const Layout = ({role}) => {


return (

<div className="
flex
min-h-screen
bg-gray-100
">


{/* Sidebar */}

<Sidebar role={role}/>




{/* Main Content */}

<main className="
flex-1
p-8
">


<Outlet/>


</main>



</div>

)


}



export default Layout;