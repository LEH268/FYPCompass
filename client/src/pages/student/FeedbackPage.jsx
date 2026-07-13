import {
    feedbackList
}
from "../../data/feedbackData";



export default function FeedbackPage(){


return (

<div className="space-y-6">



{/* Header */}

<div>

<h1 className="
text-3xl
font-bold
text-gray-800
">

Feedback & Notifications

</h1>


<p className="
text-gray-500
">

Review supervisor comments and project evaluation updates.

</p>


</div>





{/* Summary Cards */}

<div className="
grid
grid-cols-1
md:grid-cols-3
gap-6
">



<div className="
bg-white
border
rounded-xl
p-5
">

<p className="text-gray-500 text-sm">
Total Feedback
</p>


<h2 className="
text-3xl
font-bold
mt-2
">

{feedbackList.length}

</h2>

</div>





<div className="
bg-white
border
rounded-xl
p-5
">


<p className="text-gray-500 text-sm">
Approved
</p>


<h2 className="
text-3xl
font-bold
text-green-600
mt-2
">

1

</h2>


</div>





<div className="
bg-white
border
rounded-xl
p-5
">


<p className="text-gray-500 text-sm">
Revision Required
</p>


<h2 className="
text-3xl
font-bold
text-yellow-600
mt-2
">

1

</h2>


</div>


</div>







{/* Feedback List */}


<div className="
bg-white
border
rounded-xl
shadow-sm
p-6
">


<h2 className="
text-xl
font-semibold
mb-5
">

Supervisor Feedback

</h2>




<div className="
space-y-5
">


{

feedbackList.map((feedback)=>(


<div

key={feedback.id}

className="
border
rounded-xl
p-5
hover:shadow-md
transition
"

>


<div className="
flex
justify-between
items-start
">


<div>


<h3 className="
font-semibold
text-lg
">

{feedback.title}

</h3>


<p className="
text-sm
text-gray-500
mt-1
">

{feedback.category}
 • {feedback.date}

</p>


</div>





<span

className={`

px-3
py-1
rounded-full
text-sm


${
feedback.status==="Approved"

?

"bg-green-100 text-green-700"

:

feedback.status==="Revision Required"

?

"bg-yellow-100 text-yellow-700"

:

"bg-gray-100 text-gray-600"

}

`}

>

{feedback.status}

</span>



</div>






<div className="
mt-4
bg-gray-50
rounded-lg
p-4
">


<p className="
text-gray-700
">

{feedback.comment}

</p>


</div>






<div className="
mt-4
text-sm
text-gray-500
">

Reviewed by:

<span className="
font-medium
text-gray-700
">

 {feedback.supervisor}

</span>


</div>



</div>



))


}



</div>



</div>



</div>

)

}