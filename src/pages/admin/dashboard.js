import React, { useEffect, useState } from "react";
const baseUrl = "/api";
import axios from 'axios';
import { useRouter } from 'next/router';
import { toast } from "react-toastify";
import ExcelJS from 'exceljs'; // Import the Excel export library


// import ProtectedRoute from "../../components/ProtectedRoute";
const PaginationInfo = ({ currentPage, itemsPerPage, totalItems }) => {
  // Calculate the range of items currently displayed
  const fromItem = (currentPage - 1) * itemsPerPage + 1;
  const toItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex justify-between mb-4">
      <div>
        Showing {fromItem} to {toItem} of {totalItems} entries
      </div>
      <div>
        Page {currentPage} of {Math.ceil(totalItems / itemsPerPage)}
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [requests, setRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const router = useRouter();

  useEffect(() => {
    fetchAdminData();

  }, []);
  const fetchAdminData = async () => {
    try {
      const response = await axios.get('/api/requests');
      if (response.status === 200) {
        const sortedRequests = response.data.sort((a, b) => {
          // Compare by date
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          if (dateA < dateB) return 1;
          if (dateA > dateB) return -1;

          // If dates are equal, compare by time
          const timeA = a.time.split(':').map(Number);
          const timeB = b.time.split(':').map(Number);
          for (let i = 0; i < timeA.length; i++) {
            if (timeA[i] < timeB[i]) return 1;
            if (timeA[i] > timeB[i]) return -1;
          }

          return 0; // Dates and times are equal
        });
        setRequests(sortedRequests);
      }
    } catch (error) {
      toast.info("Invalid Token !!", { position: "top-center", });
      console.log(error, "error working")
      router.push('/admin/login'); // Redirect to login page in case of error
    }
  };
  const handleLogout = async () => {
    try {
      const response = await axios.post(`${baseUrl}/logout`);
      if (response.status == 200) {
        toast.success("Logged OUT");
        router.push('/');
      } else {
        toast.error("Logout Failed");
      }
    } catch (error) {
      toast.error("Logout Failed");
      // console.error('Logout Error:',error);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = requests.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(requests.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleExcelExport = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Bookings');

    // Add headers
    const headers = [
      "Serial No",
      "Booking Id",
      "Date",
      "Time",
      "Name",
      "Phone No",
      "Pick Up",
      "Drop",
      "Distance",
      "Pickup Date"
    ];
    worksheet.addRow(headers);

    // Add data
    requests.forEach((request, index) => {
      const row = [
        index + 1,
        request.bookingId,
        request.date,
        request.time,
        request.name,
        request.phoneno,
        request.pickup,
        request.drop,
        request.distance,
        request.pDate
      ];
      worksheet.addRow(row);
    });

    // Generate the Excel file
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Bookings.xlsx';
    a.click();
    window.URL.revokeObjectURL(url);
  };
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <div className="bg-blue-500 p-4">
        <div className="container mx-auto flex justify-between md:pl-14 items-center">
          <h1 className="text-xl font-semibold text-white">
            Welcome to Admin dashboard
          </h1>
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
      <div className="container mx-auto py-10 px-4">
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          onClick={handleExcelExport}
        >
          Export to Excel
        </button>

        <PaginationInfo
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalItems={requests.length}
        />
        <table
          id="requestsTable" // Add an ID to the table for export
          className="w-full bg-white shadow rounded-lg">
          <thead>
            <tr>
              <th className="bg-gray-200 p-3">Serial No</th>
              <th className="bg-gray-200 p-3">Booking Id</th>
              <th className="bg-gray-200 p-3">Date</th>
              <th className="bg-gray-200 p-3">Time</th>
              <th className="bg-gray-200 p-3">Name</th>
              <th className="bg-gray-200 p-3">Phone No</th>
              <th className="bg-gray-200 p-3">Pick Up</th>
              <th className="bg-gray-200 p-3">Drop</th>
              <th className="bg-gray-200 p-3">Distance</th>
              <th className="bg-gray-200 p-3">Pickup Date</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((request, index) => (
              <tr key={request._id} className="border-b">
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{request.bookingId}</td>
                <td className="p-3">{request.date}</td>
                <td className="p-3">{request.time}</td>
                <td className="p-3">{request.name}</td>
                <td className="p-3">{request.phoneno}</td>
                <td className="p-3">{request.pickup}</td>
                <td className="p-3">{request.drop}</td>
                <td className="p-3">{request.distance}</td>
                <td className="p-3">{request.pDate}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
      <div>
        {pageNumbers.length > 1 && (
          <ul className="flex justify-center space-x-2">
            {pageNumbers.map((number) => (
              <li
                key={number}
                className={number === currentPage ? 'bg-blue-500 text-white rounded-full' : 'bg-gray-200 hover:bg-blue-100 rounded-full'}
              >
                <button
                  onClick={(e) => {
                    e.preventDefault(); // Prevent the default anchor link behavior
                    setCurrentPage(number); // Update the current page
                  }}
                  className="w-8 h-8 flex items-center justify-center"
                >
                  {number}
                </button>
              </li>

            ))}
          </ul>
        )}
      </div>
    </div>

  );
};

export default Dashboard;

