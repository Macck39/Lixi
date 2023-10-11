import { useState, useEffect } from "react";
import axios from "axios";
import MapAutocompleteInput from "./searchBox";
import { Select } from "antd";
import { calculateDistance } from "./calculateDistance";
import { toast } from "react-toastify";
import { Modal } from "antd";


const baseUrl = "/api";
const { Option } = Select;

const BasicForm = ({ selectedTab }) => {
    // modal 
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    const [submitted, setSubmitted] = useState(false);
    const airport = {
        label: "KIAL Rd, Devanahalli, Bengaluru, Karnataka 560300, India",
        lat: 13.1989089,
        lng: 77.70681309999999,
    };
    const [selectedOption, setSelectedOption] = useState("");
    const [directions, setDirections] = useState({
        pickupLat: "",
        pickupLng: "",
        dropLat: "",
        dropLng: "",
    });

    const [formData, setFormData] = useState({
        head: "",
        name: "",
        phoneNo: "",
        pickup: "",
        drop: "",
        pDate: "",
        pTime: "",
        distance: "",
    });
    useEffect(() => {
        if (selectedOption === "pickup") {
            setFormData((prevData) => ({
                ...prevData,
                drop: "",
            }));
            setSubmitted(false);
        } else if (selectedOption === "drop") {
            setFormData((prevData) => ({
                ...prevData,
                pickup: "",
            }));
            setSubmitted(false);
        }
    }, [selectedOption]);

    // Inside your component, before the return statement
    const defaultOption = "drop"; // Set "drop" as the default option

    useEffect(() => {
        // When the component first mounts, set the default option
        setSelectedOption(defaultOption);

        // Handle the default option's data
        if (defaultOption === "pickup") {
            setFormData((prevData) => ({
                ...prevData,
                pickup: airport.label,
                drop: "",
            }));
            setDirections({
                pickupLat: airport.lat,
                pickupLng: airport.lng,
                dropLat: "",
                dropLng: "",
            });
        } else if (defaultOption === "drop") {
            setFormData((prevData) => ({
                ...prevData,
                drop: airport.label,
                pickup: "",
            }));
            setDirections({
                dropLat: airport.lat,
                dropLng: airport.lng,
                pickupLat: "",
                pickupLng: "",
            });
        }
    }, []);


    const handleSelectedTab = (value) => {
        if (value == "pickup") {
            setFormData((prevData) => ({
                ...prevData,
                pickup: airport.label,
                drop: "",
            }));
            setDirections({
                pickupLat: airport.lat,
                pickupLng: airport.lng,
                dropLat: "",
                dropLng: "",
            });
        } else if (value == "drop") {
            setFormData((prevData) => ({
                ...prevData,
                drop: airport.label,
                pickup: "",
            }));
            setDirections({
                dropLat: airport.lat,
                dropLng: airport.lng,
                pickupLat: "",
                pickupLng: "",
            });
        }
        setSelectedOption(value);
    }

    const renderDropdownOptions = () => {
        const dropdownStyle = {
            width: "250",
            marginBottom: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        };

        switch (selectedTab) {
            case "1": // Airport Transfer
                return (
                    <Select
                        style={dropdownStyle}
                        placeholder="---Pickup Or Drop---"
                        onChange={handleSelectedTab}
                        value={selectedOption}
                    ><Option value="none" disabled >
                            ---Pickup Or Drop---
                        </Option>
                        <Option value="pickup">Pickup from Airport</Option>
                        <Option value="drop">Drop to Airport</Option>
                    </Select>
                );
            case "2": // Local Package
                return (
                    <Select placeholder="Select an option" style={dropdownStyle}>
                        <Option value="4hours40km">4 Hours 40km</Option>
                        <Option value="8hours80km">8 Hours 80km</Option>
                    </Select>
                );
            case "3": // Outstation
                return (
                    <Select placeholder="Select an option" style={dropdownStyle}>
                        <Option value="oneway">One Way</Option>
                        <Option value="roundtrip">Round Trip</Option>
                    </Select>
                );
            default:
                return null;
        }
    };
    const handlePlaceChange = (name, value) => {
        if (name === "pickup") {
            setFormData((prevData) => ({
                ...prevData,
                pickup: value.label,
            }));
            setDirections((prevData) => ({
                ...prevData,
                pickupLat: value.lat,
                pickupLng: value.lng,
            }));
        } else if (name === "drop") {
            setFormData((prevData) => ({
                ...prevData,
                drop: value.label,
            }));
            setDirections((prevData) => ({
                ...prevData,
                dropLat: value.lat,
                dropLng: value.lng,
            }));
        }
    };
    // onPlaceChange(name, value, google);

    const handleInputChange = (fieldName, inputValue) => {
        setFormData((prevData) => ({ ...prevData, [fieldName]: inputValue }));
    };

    const handleFormReset = () => {
        const defaultOption = selectedOption === "pickup" ? "pickup" : "drop"; // Determine the default option based on the previous choice
        setSelectedOption(defaultOption);

        setFormData({
            head: "",
            name: "",
            phoneNo: "",
            pickup: defaultOption === "pickup" ? airport.label : "",
            drop: defaultOption === "drop" ? airport.label : "",
            pDate: "",
            pTime: "",
            distance: "",
        });

        setDirections((prevData) => ({
            ...prevData,
            pickupLat: defaultOption === "pickup" ? airport.lat : "",
            pickupLng: defaultOption === "pickup" ? airport.lng : "",
            dropLat: defaultOption === "drop" ? airport.lat : "",
            dropLng: defaultOption === "drop" ? airport.lng : "",
        }));
    };


    const handleSubmit = async (event) => {
        event.preventDefault();


        // Check for errors in error object
        if (formData.name.trim() === "" || formData.pDate.trim() === "" || formData.pickup.trim() === "" || formData.drop.trim() === "") {
            toast.info("Enter Required Fields", {
                position: "top-center",
            });
            return;
        }
        const phoneNoPattern = /^\d{10}$/;
        if (!formData.phoneNo.match(phoneNoPattern)) {
            toast.error("Phone number must be 10 digits", {
                position: "top-center",
            });
            return;
        }




        const { pickup, drop } = formData;
        if (pickup !== "" && drop !== "") {
            try {
                formData.head = `user wants ${selectedOption} from airport`;

                const dist = await calculateDistance(pickup, drop, directions);
                formData.distance = dist;
                const res = await axios.post(`${baseUrl}/bookings`, formData, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const reqRes = await res.data;
                // console.log(reqRes, "data")
                if (res.status === 201) {
                    const bookingId = reqRes.bookingId;
                    setModalMessage(`Thank you ${reqRes.name} for Booking with Us. Your booking ID is ${bookingId}`);
                    setIsModalVisible(true); // Open the modal
                    handleFormReset();
                    setSubmitted(true);
                }
            } catch (error) {
                toast.error("Error Submitting Form. Try Again ", {
                    position: "top-center",
                });
            }
        } else {
            // Handle the case when either pickup or drop location is missing
            console.log("Missing pickup or drop location");
        }
    };
    const handleOk = () => {
        setIsModalVisible(false);
        setSubmitted(false)
    };

    return (
        <div className="CabForm">
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col">
                    <div className="p-2 pt-0 w-full rounded-lg    ">
                        {renderDropdownOptions()}
                    </div>
                    <div className="mb-4 text-base flex justify-between">
                        <div className="w-1/2 mr-2">
                            <h4 className="mb-2 font-semibold">Name</h4>
                            <input
                                className="p-2 w-full rounded-lg outline-none border-2 border-gray-300"
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={(event) =>
                                    handleInputChange("name", event.target.value)
                                }
                                placeholder="Name"
                            />

                        </div>
                        <div className="w-1/2 ml-2">
                            <h4 className="mb-2 font-semibold">Phone No</h4>
                            <input
                                className="p-2 w-full rounded-lg outline-none border-2 border-gray-300"
                                type="text"
                                id="phone_no"
                                placeholder="Phone No"
                                value={formData.phoneNo}
                                name="phoneNo"
                                onChange={(event) =>
                                    handleInputChange("phoneNo", event.target.value)
                                }
                            />

                        </div>
                    </div>
                    <div className="mb-4 text-base flex justify-between">
                        <div className="w-1/2 mr-2">
                            <h4 className="mb-2 font-semibold">Pick Place</h4>
                            <MapAutocompleteInput
                                value={formData.pickup}
                                id="pickup"
                                name="pickup"
                                placeholder="Enter a location"
                                onPlaceChange={handlePlaceChange}
                                disabled={selectedOption === "pickup"}
                                submitted={submitted}
                                inputStyles={{
                                    // Specify the desired input styles here
                                    border: "2px solid #d1d5db",
                                    borderRadius: "0.375rem",
                                    padding: "0.5rem",
                                    width: "100%",
                                }}
                            />

                        </div>
                        <div className="w-1/2 ml-2">
                            <h4 className="mb-2 font-semibold">Drop Place</h4>
                            <MapAutocompleteInput
                                value={formData.drop}
                                name="drop"
                                id="drop"
                                placeholder="Enter a location"
                                onPlaceChange={handlePlaceChange}
                                disabled={selectedOption === "drop"}
                                submitted={submitted}
                                inputStyles={{
                                    // Specify the desired input styles here
                                    border: "2px solid #d1d5db",
                                    borderRadius: "0.375rem",
                                    padding: "0.5rem",
                                    width: "100%",
                                }}
                            />

                        </div>
                    </div>
                    <div className="flex justify-between">
                        <div className="mb-4 text-base">
                            <h4 className="mb-2 font-semibold">PickUp Date</h4>
                            <input
                                className="p-2 w-full rounded-lg outline-none border-2 border-gray-300"
                                name="pDate"
                                value={formData.pDate}
                                onChange={(event) =>
                                    handleInputChange("pDate", event.target.value)
                                }
                                type="date"
                                id="pickup_date"
                            />

                        </div>
                        <div className="mb-4 text-base">
                            <h4 className="mb-2 font-semibold">PickUp Time</h4>
                            <input
                                className="p-2 w-full rounded-lg outline-none border-2 border-gray-300"
                                name="pTime"
                                value={formData.pTime}
                                onChange={(event) =>
                                    handleInputChange("pTime", event.target.value)
                                }
                                type="time"
                                id="pickup_time"
                            />
                        </div>
                    </div>
                    <div className="flex justify-center items-center mt-4 flex-col">
                        <button
                            type="submit"
                            className={` hover:bg-green-500 bg-[#70e772] font-bold py-2 px-4 w-1/2 rounded`}
                        >
                            {submitted ? 'Submitted' : 'Submit'}
                        </button>
                    </div>
                </div>
                <Modal
                    title="Booking Success"
                    open={isModalVisible}
                    onOk={handleOk}
                    onCancel={() => setIsModalVisible(false)}
                    className="w-full max-w-md"
                    centered
                    okButtonProps={{
                        className:
                            "bg-blue-500 hover:bg-blue-600 text-white font-semibold",
                    }}
                    cancelButtonProps={{
                        className:
                            "border border-gray-300 hover:border-blue-500 text-gray-700",
                    }}
                >

                    <p className="text-center sm:text-left text-lg font-semibold mb-4">{modalMessage}</p>
                    <p className="text-center sm:text-left text-base"><span className="font-bold">Note:</span> Our Representative will get in touch with you to confirm booking.</p>

                </Modal>
            </form>
        </div>
    );
};

export default BasicForm;
