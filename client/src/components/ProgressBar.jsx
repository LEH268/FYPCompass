export default function ProgressBar({progress}) {

    return (

        <div className="w-full">

            <div className="
                flex 
                justify-between 
                mb-2
            ">
                <span className="text-sm text-gray-600">
                    Overall Progress
                </span>

                <span className="text-sm font-semibold">
                    {progress}%
                </span>

            </div>


            <div className="
                w-full
                bg-gray-200
                rounded-full
                h-3
            ">

                <div
                    className="
                    bg-blue-600
                    h-3
                    rounded-full
                    "
                    style={{
                        width:`${progress}%`
                    }}
                />

            </div>

        </div>

    )
}