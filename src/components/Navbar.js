import React, { useState } from "react";
import Link from "next/link";



const Navbar = () => {
  
  const [menuClick, setMenuClick] = useState(false);

  return (
    <div className="w-full">
      <div className="sm:hidden">

      </div>
      <section className="flex justify-between sm:justify-between py-4 px-12 lg:px-52 sm:space-x-4  items-center bg-[#1c2b39] sm:bg-white">
        <div className="mr-4">
          <h3 className="text-2xl mb-1 font-bold text-white sm:text-black">
            Lixi
          </h3>
          <h6 className="text-[#32C534] text-center text-sm">24/7 available</h6>
        </div>
        <div className="hidden sm:block">
          <div className="flex items-center">
            <span className="">
              <img className="w-8 md:mx-2 mt-1" src="/images/home-icon.png" alt="" />
            </span>
            <span className="font-bold mx-2 text-[#32C534]">Address</span>
          </div>
          <div>Bengaluru, Karnataka</div>
        </div>
        <div className="hidden sm:block">
          <div className="flex items-center">
            <span className="mx-6">
              <img className="w-8" src="/images/mail-icon.png" alt="" />
            </span>
            <span className="font-bold text-[#32C534]">Email Us</span>
          </div>
          <div>support@airportbangloretaxi.com</div>
        </div>
       
        <img
          className="w-8 sm:hidden cursor-pointer"
          src="/images/white-hamburger.png"
          alt="hamburger menu icon"
          onClick={() => {
            setMenuClick(!menuClick);
          }}
        />
      </section>

      {/* Desktop view */}
      <nav className="w-full hidden sm:block">
        <ul className="md:px-80 py-2 bg-[#1c2b39] flex justify-between text-white items-center flex-row">
          <Link href={"/"}>
            <li className="p-4 cursor-pointer hover:text-[#32C534]">Home</li>
          </Link>
          <Link href={"/fleet"}>
            <li className="p-4 cursor-pointer hover:text-[#32C534]">Fleet</li>
          </Link>
          <Link href={"/blogs"}>
            <li className="p-4 cursor-pointer hover:text-[#32C534]">Blog</li>
          </Link>
          <Link href={"/about"}>
            <li className="p-4 cursor-pointer hover:text-[#32C534]">
              About Us
            </li>
          </Link>
          <Link href={"/contact"}>
            <li className="p-4 cursor-pointer hover:text-[#32C534]">
              Contact Us
            </li>
          </Link>
        </ul>
      </nav>

      {/* Mobile view */}

      {menuClick && (
        <nav className="sm:w-fit md:w-full">
          <ul className="py-2 bg-[#1c2b39] flex flex-col justify-between items-center text-[#32C534]">
            <li className="p-4 cursor-pointer hover:text-[#32C534] ml-2 hover:ml-4 transition">
              <Link href={"/"}>Home</Link>
            </li>
            <Link href={"/fleet"}>
              <li className="p-4 cursor-pointer hover:text-[#32C534] ml-2 hover:ml-4 transition">
                Fleet
              </li>
            </Link>
            <Link href={"/blogs"}>
              <li className="p-4 cursor-pointer hover:text-[#32C534] ml-2 hover:ml-4 transition">
                Blog
              </li>
            </Link>
            <Link href={"/about"}>
              <li className="p-4 cursor-pointer hover:text-[#32C534] ml-2 hover:ml-4 transition">
                About Us
              </li>
            </Link>
            <Link href={"/contact"}>
              <li className="p-4 cursor-pointer hover:text-[#32C534] ml-2 hover:ml-4 transition">
                Contact Us
              </li>
            </Link>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default Navbar;
