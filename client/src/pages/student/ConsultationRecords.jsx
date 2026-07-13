import {
    consultationRecords
}
from "../../data/consultationData";


export default function ConsultationRecords(){


return (

<div className="space-y-6">


{/* Header */}

<div>

<h1 className="
text-3xl
font-bold
text-gray-800
">

Consultation Records

</h1>


<p className="
text-gray-500
">

View your discussion history with your supervisor.

</p>


</div>





{/* Search */}

<div className="
bg-white
border
rounded-xl
p-5
">


<input

type="text"

placeholder="
Search consultation records...
"

className="
w-full
border
rounded-lg
px-4
py-3
outline-none
focus:ring-2
focus:ring-blue-500
"

/>


</div>







{/* Records */}


<div className="
space-y-5
">


{

consultationRecords.map((record)=>(


<div

key={record.id}

className="
bg-white
border
rounded-xl
shadow-sm
p-6
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


<h2 className="
text-xl
font-semibold
">

{record.topic}

</h2>


<p className="
text-sm
text-gray-500
mt-2
">

📅 {record.date}

&nbsp;&nbsp;

⏰ {record.time}

</p>


</div>


<span className="
bg-blue-100
text-blue-700
px-3
py-1
rounded-full
text-sm
">

Completed

</span>



</div>





<hr className="
my-5
"/>





<div className="space-y-4">


<div>


<h3 className="
font-medium
text-gray-700
">

Supervisor

</h3>


<p className="
text-gray-500
">

{record.supervisor}

</p>


</div>





<div>


<h3 className="
font-medium
text-gray-700
">

Discussion Notes

</h3>


<p className="
text-gray-600
">

{record.discussion}

</p>


</div>





<div>


<h3 className="
font-medium
text-gray-700
">

Action Items

</h3>


<p className="
text-gray-600
">

{record.action}

</p>


</div>



</div>



</div>



))


}



</div>




</div>

)

}