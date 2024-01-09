import axios from "axios";
import { useEffect, useState } from "react";
import StaffInfo, { StaffInfoProps } from "./StaffInfo";

function StaffInfoList() {
  const [staff, setStaff] = useState([]);

  useEffect(() => {
    const getStaffInfo = async () => {
      try {
        const response = await axios.get("http://localhost:5000/staff");
        setStaff(response.data["staff"]);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error(error.message);
        } else {
          console.error(String(error));
        }
      }
    };

    getStaffInfo();
  }, []);

  return (
    <>
      {staff.map((s: StaffInfoProps) => (
        <StaffInfo firstName={s.firstName} surname={s.surname} age={s.age} />
      ))}
    </>
  );
}

export default StaffInfoList;
