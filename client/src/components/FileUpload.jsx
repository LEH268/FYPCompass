export default function FileUpload({
    file,
    setFile
}) {


return (

<div>


<label className="
block
text-sm
font-medium
text-gray-700
mb-2
">

Upload Proposal Document

</label>



<div className="
border-2
border-dashed
rounded-xl
p-6
text-center
cursor-pointer
hover:bg-gray-50
">


<input

type="file"

accept=".pdf,.doc,.docx"

onChange={(e)=>setFile(e.target.files[0])}

className="
hidden
"

/>


<label
className="
cursor-pointer
text-blue-600
font-medium
"
>

Choose File

</label>



{
file &&

<p className="
mt-3
text-sm
text-gray-600
">

Selected:
{file.name}

</p>

}



</div>


</div>

)

}