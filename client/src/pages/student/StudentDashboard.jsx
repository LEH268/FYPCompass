import DashboardCard from "../../components/DashboardCard";
import ProgressBar from "../../components/ProgressBar";

import {
    studentDashboard
}
from "../../data/studentData";


export default function StudentDashboard(){


return (

<div className="space-y-6">


{/* Header */}

<div>

<h1 className="
text-3xl
font-bold
text-gray-800
">
Student Dashboard
</h1>


<p className="text-gray-500">
Welcome back, monitor your FYP progress here.
</p>


</div>



{/* Cards */}

<div className="
grid
grid-cols-1
md:grid-cols-3
gap-6
">


<DashboardCard

title="Project Progress"

value={`${studentDashboard.progress}%`}

description="Completed"

icon="📊"

/>



<DashboardCard

title="Milestones"

value="4"

description="Tracked stages"

icon="📌"

/>



<DashboardCard

title="Notifications"

value="3"

description="New updates"

icon="🔔"

/>



</div>





{/* Main Content */}

<div className="
grid
grid-cols-1
lg:grid-cols-3
gap-6
">



{/* Progress */}

<div className="
bg-white
rounded-xl
shadow-sm
border
p-6
lg:col-span-2
">


<h2 className="
text-xl
font-semibold
mb-5
">
FYP Progress
</h2>


<ProgressBar

progress={
studentDashboard.progress
}

/>


<div className="mt-6">

<p className="font-semibold">
Project:
</p>

<p className="text-gray-600">
{studentDashboard.projectTitle}
</p>


<p className="font-semibold mt-3">
Supervisor:
</p>


<p className="text-gray-600">
{studentDashboard.supervisor}
</p>


</div>


</div>





{/* Notifications */}

<div className="
bg-white
rounded-xl
shadow-sm
border
p-6
">


<h2 className="
text-xl
font-semibold
mb-4
">
Notifications
</h2>



<ul className="space-y-3">


{
studentDashboard.notifications.map(
(item,index)=>(

<li
key={index}
className="
bg-gray-50
p-3
rounded-lg
text-sm
"
>

{item}

</li>

)

)
}



</ul>


</div>


</div>





{/* Milestones */}

<div className="
bg-white
rounded-xl
shadow-sm
border
p-6
">


<h2 className="
text-xl
font-semibold
mb-5
">
Upcoming Milestones
</h2>



<div className="
space-y-4
">


{
studentDashboard.milestones.map(
(m,index)=>(


<div
key={index}
className="
flex
justify-between
items-center
border-b
pb-3
"
>


<div>

<p className="font-medium">
{m.name}
</p>

<p className="text-sm text-gray-500">
Due: {m.date}
</p>

</div>



<span
className={`
px-3
py-1
rounded-full
text-sm

${
m.status==="Completed"
?
"bg-green-100 text-green-700"
:
m.status==="In Progress"
?
"bg-yellow-100 text-yellow-700"
:
"bg-gray-100 text-gray-600"

}

`}
>

{m.status}

</span>


</div>


)

)

}



</div>


</div>



</div>

)

}