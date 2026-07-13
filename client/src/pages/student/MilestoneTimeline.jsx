import {
    milestones
}
from "../../data/milestoneData";



export default function MilestoneTimeline(){


return (

<div className="space-y-6">



{/* Header */}

<div>

<h1 className="
text-3xl
font-bold
text-gray-800
">

Milestone Timeline

</h1>


<p className="
text-gray-500
">

Track your FYP progress and upcoming deadlines.

</p>


</div>





{/* Timeline */}

<div className="
bg-white
border
rounded-xl
shadow-sm
p-6
">


<div className="
space-y-8
">


{

milestones.map((item,index)=>(


<div
key={item.id}
className="
flex
gap-5
"
>



{/* Circle */}

<div className="
flex
flex-col
items-center
">


<div
className={`

w-10
h-10
rounded-full
flex
items-center
justify-center
font-bold

${
item.status==="Completed"

?

"bg-green-100 text-green-700"

:

item.status==="In Progress"

?

"bg-yellow-100 text-yellow-700"

:

"bg-gray-100 text-gray-500"

}

`}
>


{index+1}


</div>


{

index !== milestones.length-1 &&

<div className="
w-1
h-20
bg-gray-200
mt-2
"/>

}


</div>





{/* Content */}

<div className="
flex-1
pb-8
">


<div className="
flex
justify-between
items-start
">


<div>


<h2 className="
text-lg
font-semibold
">

{item.title}

</h2>


<p className="
text-gray-500
text-sm
mt-1
">

{item.description}

</p>


</div>





<span

className={`

px-3
py-1
rounded-full
text-sm

${
item.status==="Completed"

?

"bg-green-100 text-green-700"

:

item.status==="In Progress"

?

"bg-yellow-100 text-yellow-700"

:

"bg-gray-100 text-gray-600"

}

`}

>

{item.status}

</span>



</div>




<div className="
mt-3
flex
justify-between
items-center
">


<p className="
text-sm
text-gray-500
">

Deadline:
{item.deadline}

</p>



{

item.status !== "Completed" &&

<button

className="
bg-blue-600
text-white
px-4
py-2
rounded-lg
text-sm
hover:bg-blue-700
"

>

Upload Deliverable

</button>

}



</div>



</div>



</div>


))


}



</div>


</div>



</div>

)

}