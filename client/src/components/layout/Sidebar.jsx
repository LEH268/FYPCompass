import {

LayoutDashboard,
FileText,
Clock,
MessageSquare,
CalendarDays,
Bell,
LogOut

} from "lucide-react";


import {
useNavigate
}
from "react-router-dom";



const Sidebar = ({role}) => {


const navigate = useNavigate();



const menu = {


Student:[


{
name:"Dashboard",
icon:LayoutDashboard,
path:"/student/dashboard"
},


{
name:"Proposal Submission",
icon:FileText,
path:"/student/proposal"
},


{
name:"Milestones",
icon:Clock,
path:"/student/milestones"
},


{
name:"Feedback",
icon:MessageSquare,
path:"/student/feedback"
},


{
name:"Consultation Records",
icon:CalendarDays,
path:"/student/consultations"
},


{
name:"Notifications",
icon:Bell,
path:"/student/notifications"
}



],



Supervisor:[

{
name:"Dashboard",
icon:LayoutDashboard,
path:"/supervisor/dashboard"
},

{
name:"Student Progress",
icon:Clock,
path:"#"
},

{
name:"Feedback Management",
icon:MessageSquare,
path:"#"
},

{
name:"Consultations",
icon:CalendarDays,
path:"#"
}


],




Coordinator:[

{
name:"Dashboard",
icon:LayoutDashboard,
path:"#"
},

{
name:"Cohort Monitoring",
icon:Clock,
path:"#"
},

{
name:"Reports",
icon:FileText,
path:"#"
}

],




Examiner:[

{
name:"Dashboard",
icon:LayoutDashboard,
path:"#"
},

{
name:"Project Evaluation",
icon:FileText,
path:"#"
}

]


};





return (

<aside

className="
w-64
min-h-screen
bg-slate-900
text-white
flex
flex-col
p-5
"


>


<h1 className="
text-2xl
font-bold
mb-8
">

FYPCompass

</h1>





<nav className="flex-1">


{

menu[role]?.map(

(item,index)=>{


const Icon=item.icon;


return (

<button

key={index}


onClick={()=>navigate(item.path)}


className="
w-full
flex
items-center
gap-3
px-4
py-3
rounded-lg
hover:bg-slate-700
mb-2
transition
"


>


<Icon size={20}/>


<span>

{item.name}

</span>



</button>


)


}


)


}



</nav>





<button

onClick={()=>navigate("/")}


className="
flex
items-center
gap-3
px-4
py-3
hover:bg-red-500
rounded-lg
"


>


<LogOut size={20}/>

Logout


</button>



</aside>


)


}



export default Sidebar;