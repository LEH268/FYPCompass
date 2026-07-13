export default function DashboardCard({
    title,
    value,
    description,
    icon
}) {

    return (
        <div className="
            bg-white 
            rounded-xl 
            shadow-sm 
            p-5
            border
            hover:shadow-md
            transition
        ">

            <div className="flex justify-between items-center">

                <div>
                    <p className="text-gray-500 text-sm">
                        {title}
                    </p>

                    <h2 className="
                        text-3xl 
                        font-bold 
                        text-gray-800
                        mt-2
                    ">
                        {value}
                    </h2>

                    <p className="text-sm text-gray-400 mt-2">
                        {description}
                    </p>
                </div>


                <div className="
                    text-3xl
                    bg-blue-100
                    p-3
                    rounded-lg
                ">
                    {icon}
                </div>

            </div>

        </div>
    )
}