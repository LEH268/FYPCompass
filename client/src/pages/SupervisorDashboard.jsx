import {
  Users,
  FileCheck,
  Clock,
  MessageSquare,
  CalendarDays,
  AlertTriangle
} from "lucide-react";


const SupervisorDashboard = () => {


  const students = [
    {
      name: "John Tan",
      project: "AI Chatbot System",
      progress: 75,
      status: "On Track"
    },
    {
      name: "Sarah Lim",
      project: "Smart Attendance System",
      progress: 45,
      status: "Delayed"
    },
    {
      name: "Adam Lee",
      project: "E-Commerce Recommendation",
      progress: 90,
      status: "Completed"
    }
  ];


  return (

    <div className="min-h-screen bg-gray-100 p-8">


      {/* Header */}

      <div className="mb-8">

        <h1 className="text-3xl font-bold">
          Supervisor Dashboard
        </h1>

        <p className="text-gray-500">
          Monitor your students' FYP progress and activities
        </p>

      </div>



      {/* Statistic Cards */}

      <div className="
        grid 
        grid-cols-1 
        md:grid-cols-3 
        lg:grid-cols-6 
        gap-5
      ">


        <Card
          icon={<Users />}
          title="Students"
          value="12"
        />


        <Card
          icon={<FileCheck />}
          title="Pending Review"
          value="5"
        />


        <Card
          icon={<Clock />}
          title="Upcoming"
          value="8"
        />


        <Card
          icon={<MessageSquare />}
          title="Feedback"
          value="23"
        />


        <Card
          icon={<CalendarDays />}
          title="Meetings"
          value="4"
        />


        <Card
          icon={<AlertTriangle />}
          title="Overdue"
          value="2"
        />


      </div>



      {/* Student Progress Table */}


      <div className="
        bg-white
        rounded-xl
        shadow
        mt-8
        p-6
      ">


        <h2 className="text-xl font-semibold mb-5">

          Student Progress

        </h2>



        <table className="w-full">


          <thead>

            <tr className="border-b text-left">

              <th className="py-3">
                Student
              </th>

              <th>
                Project
              </th>

              <th>
                Progress
              </th>

              <th>
                Status
              </th>


            </tr>

          </thead>



          <tbody>


            {
              students.map((student,index)=>(

                <tr
                  key={index}
                  className="border-b"
                >

                  <td className="py-4">

                    {student.name}

                  </td>


                  <td>

                    {student.project}

                  </td>



                  <td>


                    <div className="w-40 bg-gray-200 rounded-full h-2">


                      <div
                        className="
                        bg-blue-600
                        h-2
                        rounded-full
                        "
                        style={{
                          width:`${student.progress}%`
                        }}
                      />


                    </div>


                    <span className="text-sm">

                      {student.progress}%

                    </span>


                  </td>



                  <td>


                    <span
                      className={`
                      px-3
                      py-1
                      rounded-full
                      text-sm

                      ${
                        student.status==="Delayed"
                        ?
                        "bg-red-100 text-red-600"
                        :
                        student.status==="Completed"
                        ?
                        "bg-green-100 text-green-600"
                        :
                        "bg-blue-100 text-blue-600"
                      }

                      `}
                    >

                      {student.status}

                    </span>


                  </td>



                </tr>


              ))

            }



          </tbody>


        </table>


      </div>




      {/* Recent Activity */}


      <div className="
      bg-white
      rounded-xl
      shadow
      mt-8
      p-6
      ">


        <h2 className="text-xl font-semibold mb-5">

          Recent Activity

        </h2>


        <ul className="space-y-4">


          <li>
            John Tan submitted Literature Review
          </li>


          <li>
            Sarah Lim requested proposal revision
          </li>


          <li>
            Adam Lee completed System Design milestone
          </li>


        </ul>


      </div>



    </div>


  );


};





function Card({icon,title,value}) {


  return (

    <div className="
    bg-white
    rounded-xl
    shadow
    p-5
    flex
    items-center
    gap-4
    ">


      <div className="
      bg-blue-100
      text-blue-600
      p-3
      rounded-lg
      ">

        {icon}

      </div>



      <div>

        <p className="text-gray-500 text-sm">

          {title}

        </p>


        <h3 className="text-2xl font-bold">

          {value}

        </h3>


      </div>



    </div>

  );

}


export default SupervisorDashboard;