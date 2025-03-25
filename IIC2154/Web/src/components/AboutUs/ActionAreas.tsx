import React from "react";

interface ActionProps {
    eventText: string;
    encounterText: string;
    coworkTest: string;
    meetingText: string;
  }

const ActionAreas: React.FC<ActionProps> = ({ eventText, encounterText, coworkTest, meetingText, }) => {
    return (
        <div className="flex justify-center items-center px-16 py-20 bg-lime-100 max-md:px-5">
          <div className="flex flex-col mt-3 w-full max-w-[1259px] max-md:max-w-full">
            <div className="self-center text-4xl font-semibold tracking-wide text-center text-gray-900 leading-[75.95px]">
              Areas de acción
            </div>
            <div className="px-px mt-24 max-md:mt-10 max-md:max-w-full">
              <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                <div className="flex flex-col w-3/12 max-md:ml-0 max-md:w-full">
                  <div className="flex flex-col grow justify-center py-2.5 w-full tracking-wide text-white bg-lime-500 rounded-3xl max-md:mt-10">
                    <div className="text-xl font-bold text-center leading-[76px]">
                      EVENTOS
                    </div>
                    <div className="mt-14 text-base font-light leading-[55px] max-md:mt-10">
                      {eventText}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col ml-5 w-3/12 max-md:ml-0 max-md:w-full">
                  <div className="flex flex-col grow justify-center py-2.5 w-full tracking-wide text-white bg-lime-500 rounded-3xl max-md:mt-10">
                    <div className="text-xl font-bold text-center leading-[76px]">
                      ENCUENTROS
                    </div>
                    <div className="mt-14 text-base font-light leading-[55px] max-md:mt-10">
                      {encounterText}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col ml-5 w-3/12 max-md:ml-0 max-md:w-full">
                  <div className="flex flex-col grow justify-center items-center p-2.5 w-full tracking-wide text-white bg-lime-500 rounded-3xl max-md:pr-5 max-md:mt-10">
                    <div className="text-xl font-bold text-center leading-[76px]">
                      COWORK
                    </div>
                    <div className="self-start mt-12 text-base font-light leading-[55px] max-md:mt-10">
                        {coworkTest}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col ml-5 w-3/12 max-md:ml-0 max-md:w-full">
                  <div className="flex flex-col grow justify-center py-2.5 w-full tracking-wide text-white bg-lime-500 rounded-3xl max-md:mt-10">
                    <div className="text-xl font-bold text-center leading-[76px]">
                      REUNIONES
                    </div>
                    <div className="mt-12 text-base font-light leading-[55px] max-md:mt-10">
                        {meetingText}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
};


export default ActionAreas;
