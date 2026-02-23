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
import AboutPage from "./Componends/AboutPage";
import AnnouncementsPage from "./Componends/AnnouncementsPage";
import TournamentsPage from "./Componends/TournamentsPage";
import FrameData from "./Componends/FrameData";
import Sidestepping from "./Componends/Sidestepping";
import HeatRage from "./Componends/HeatRage";
import RegistrationForm from "./Componends/RegistrationForm";
import TournamentRegistrations from "./Componends/TournamentRegistrations";
import TournamentDetails from "./Componends/TournamentDetails";
import TournamentBrackets from "./Componends/TournamentBrackets";
import AdminBrackets from "./Componends/AdminBrackets";

function App() {

  return (
    <div>
      {/* Black Background */}
      <div className="fixed top-0 left-0 w-full h-full  bg-black -z-10" />

      {/* Content */}
      <BrowserRouter>
        <Layouts>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/announcements" element={<AnnouncementsPage />} />
            <Route path="/tournaments" element={<TournamentsPage />} />

            {/* Training Routes */}
            <Route path="/training/framedata" element={<FrameData />} />
            <Route path="/training/sidestepping" element={<Sidestepping />} />
            <Route path="/training/heatrage" element={<HeatRage />} />

            <Route element={<Checkadmin />}>
              <Route path="/tournamentadd" element={<Touranamentadd />} />
              <Route path="/viewtournament" element={<ViewTournament />} />
              <Route path="/tournament-registrations" element={<TournamentRegistrations />} />
              <Route path="/users" element={<Userbro />} />
              <Route path="/announcementadd" element={<Addanouncement />} />
              <Route path="/viewannouncement" element={<Announcementview />} />
              <Route path="/admin/brackets/:id" element={<AdminBrackets />} />
            </Route>

            {/* Registration Route */}
            <Route path="/register-tournament/:id" element={<RegistrationForm />} />

            {/* Tournament Detailed Routes */}
            <Route path="/tournament-details/:id" element={<TournamentDetails />} />
            <Route path="/tournament-brackets/:id" element={<TournamentBrackets />} />
          </Routes>
        </Layouts>
      </BrowserRouter>
    </div>
  );
}

export default App;
