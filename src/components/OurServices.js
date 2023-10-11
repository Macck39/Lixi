


const OurServices = () => {

return(
    <section className="text-black body-font pt-12">
        <div className="container px-5 pb-24 mx-auto  ">
            <div className="flex flex-wrap -m-4 ">
                <div className="p-4 w-full md:w-1/3">
                    <div className="h-full bg-[#00B068] bg-opacity-75 px-4 md:px-8 pt-7 md:pt-12 rounded-lg overflow-hidden text-center relative ">
                        <img
                            className="h-40 rounded w-full object-cover object-center mb-6"
                            src="/images/images/undraw_car.png"
                            alt="content"
                        />
                        <h1 className="title-font sm:text-2xl text-xl font-semibold  mb-3">
                            Easy Booking
                        </h1>
                        <p className="leading-relaxed mb-3">
                            Booking a local taxi with us is very easy, from anywhere, at
                            any time by web or phone & we are also available Online Chat
                            24/7.
                        </p>
                    </div>
                </div>
                <div className="p-4 w-full md:w-1/3">
                    <div className="h-full bg-[#00B068] bg-opacity-75 px-4 md:px-8 pt-7 md:pt-12 rounded-lg overflow-hidden text-center relative ">
                        <img
                            className="h-40 rounded w-full object-cover object-center mb-6"
                            src="/images/undraw_designer.png"
                            alt="content"
                        />
                        <h1 className="title-font sm:text-2xl text-xl font-semibold  mb-3">
                            24/7 Customer Care
                        </h1>
                        <p className="leading-relaxed mb-3">
                            A dedicated 24x7 customer support team always at your service
                            to help solve any problem.
                        </p>
                    </div>
                </div>
                <div className="p-4 w-full md:w-1/3">
                    <div className="h-full bg-[#00B068] bg-opacity-75 px-4 md:px-8 pt-7 md:pt-12 rounded-lg overflow-hidden text-center relative ">
                        <img
                            className="h-40 rounded w-full object-cover object-center mb-6"
                            src="/images/images/undrawCar.png"
                            alt="content"
                        />

                        <h1 className="title-font sm:text-2xl text-xl font-semibold  mb-3">
                            24/7 Availability
                        </h1>
                        <p className="leading-relaxed mb-3">
                            24/7 Local Drop Cabs in Bangalore at affordable prices.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
)    

}
export default OurServices;