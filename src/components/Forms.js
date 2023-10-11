import React, { useState } from "react";
import { Card, Tabs } from "antd";
import BasicForm from "./Forms/BasicForm";

const Forms = () => {
  const [active, setActive] = useState("1");

  const FormTabs = [
    {
      tabName: "Airport Transfer",
      key: "1",
    },
    {
      tabName: "Local Package",
      key: "2",
    },
    {
      tabName: "Outstation",
      key: "3",
    },
  ];

  const onChange = (key) => {
    setActive(String(key));
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center lg:justify-between items-center bg-none bg-cover bg-no-repeat relative overflow-hidden">
      <img
        src="/images/backgr.jpg"
        className="w-full h-full object-cover absolute -z-10 top-0"
      />
      <div className="font-extrabold text-white text-4xl px-10 my-auto hidden lg:block items-center w-7/12 ">
        <h2 className="pl-4 lg:text-center font-bold">
          <div className="text-black">
            <p className="text-4xl font-extrabold m-2">
              <span className="text-stroke ">
                Need a ride <span className="text-5xl">!</span> just call us
              </span>
            </p>
            <span className="text-stroke-color-black text-5xl pl-3 phone-appear">
              <span style={{ "--i": 1 }}>8</span>
              <span style={{ "--i": 2 }}>6</span>
              <span style={{ "--i": 3 }}>1</span>
              <span style={{ "--i": 4 }}>8</span>
              <span style={{ "--i": 5 }}>8</span>
              <span style={{ "--i": 6 }}>8</span>
              <span style={{ "--i": 7 }}>8</span>
              <span style={{ "--i": 8 }}>2</span>
              <span style={{ "--i": 9 }}>1</span>
              <span style={{ "--i": 10 }}>0</span>
            </span>


          </div>
        </h2>
      </div>

      <div className="flex flex-col items-center w-full max-w-[496px] m-6 px-2 rounded-lg bg-blue-500 bg-opacity-40">
        <h2 className="text-center font-bold text-black w-full text-3xl pt-6 shadow-lg outline-black">
          Book your Premium Taxi
        </h2>
        <span className="text-lg font-semibold shadow-md rounded-md px-2 bg-transparent text-white outline-black">
          Starting at just ₹999
        </span>
        <Tabs
          defaultActiveKey={active}
          centered
          type="card"
          size="large"
          tabBarStyle={{
            marginBottom: 0,
          }}
          className="my-4 rounded-lg mx-6 lg:mx-0"
          onChange={onChange}
          items={FormTabs.map((tab) => {
            return {
              label: tab.tabName,
              key: tab.key,
              children: (
                <div className="">
                  <Card bordered={false}>
                    <BasicForm selectedTab={active} />
                  </Card>
                </div>
              ),
            };
          })}
        />
      </div>
    </div>
  );
};

export default Forms;
