import { useEffect } from "react";
import { Link } from "react-router-dom";
import StaffInfoList from "../../other/StaffInfoList";
import StaffInfo from "../../other/StaffInfo";
import ApiRequester from "../../other/ApiRequester";

function Home() {
  useEffect(() => {
    document.title = "Home";
  });

  return (
    <>
      <ApiRequester />
    </>
  );
}
export default Home;
