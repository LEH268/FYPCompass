import {
useState
}
from "react";


import FileUpload
from "../../components/FileUpload";



export default function ProposalSubmission(){


const [file,setFile]=useState(null);


const [form,setForm]=useState({

title:"",
description:""

});



function handleChange(e){

setForm({

...form,

[e.target.name]:
e.target.value

});

}



function submitProposal(){

alert(
"Proposal submitted successfully!"
);

}



return (

<div className="
space-y-6
">


{/* Header */}

<div>

<h1 className="
text-3xl
font-bold
text-gray-800
">

Proposal Submission

</h1>


<p className="
text-gray-500
">

Submit your Final Year Project proposal for supervisor review.

</p>


</div>





{/* Form */}

<div className="
bg-white
border
rounded-xl
shadow-sm
p-6
max-w-4xl
">



<div className="space-y-5">



<div>


<label className="
block
text-sm
font-medium
mb-2
">

Project Title

</label>


<input

type="text"

name="title"

value={form.title}

onChange={handleChange}

placeholder="
Enter your FYP title
"

className="
w-full
border
rounded-lg
px-4
py-3
focus:ring-2
focus:ring-blue-500
outline-none
"

/>


</div>





<div>


<label className="
block
text-sm
font-medium
mb-2
">

Project Description

</label>



<textarea

rows="5"

name="description"

value={form.description}

onChange={handleChange}

placeholder="
Describe your project idea...
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





<FileUpload

file={file}

setFile={setFile}

/>






<button

onClick={submitProposal}

className="
bg-blue-600
text-white
px-6
py-3
rounded-lg
hover:bg-blue-700
transition
"

>

Submit Proposal

</button>



</div>


</div>






{/* Submission Status */}

<div className="
bg-white
border
rounded-xl
p-6
">


<h2 className="
text-xl
font-semibold
mb-4
">

Submission Status

</h2>



<div className="
flex
items-center
gap-3
">


<span className="
px-4
py-2
rounded-full
bg-yellow-100
text-yellow-700
text-sm
">

Pending Review

</span>


<p className="
text-gray-500
">

Waiting for supervisor approval

</p>



</div>



</div>



</div>

)

}