import { useRef, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layouts from "./Componends/Layouts";
import Home from "./Componends/Home";
import Signup from "./Componends/Signuppage";
import "./App.css";
import Login from "./Componends/Login";
import Touranamentadd from "./Componends/Tournamentadd";
import Checkadmin from "./Componends/Checkadmin";
import ViewTournament from "./Componends/Viewtournament";
import Userbro from "./Componends/Usersbro";
import Announcement from "./Componends/Announcement";
import Addanouncement from "./Componends/Addanouncement";
import Announcementview from "./Componends/Announcementview";
import LocomotiveScroll from 'locomotive-scroll';
import Aboutus from "./Componends/Abdoutus";

function App() {

  
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5; // 0.5 = Slow | 1 = Normal | 2 = Fast
    }
  }, []);

  return (
    <div  >
      {/* Background Video */}
      <video
        ref={videoRef}
        className="fixed top-0 left-0 w-full h-full object-cover -z-10"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/Comp 1.mp4" type="video/mp4" />
      </video>

      {/* Content */}
      <BrowserRouter>
        <Layouts>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<Aboutus/>}/>

            <Route element={<Checkadmin/>}>
            <Route path="/tournamentadd" element={<Touranamentadd />} />
            <Route path="/viewtournament" element={<ViewTournament />} />
            <Route path="/users" element={<Userbro/>}/>
            <Route path="/announcementadd" element={<Addanouncement/>}/>
            <Route path="/viewannouncement" element={<Announcementview/>}/>
            
            </Route>
          </Routes>
        </Layouts>
      </BrowserRouter>
    </div>
  );
}

export default App;
