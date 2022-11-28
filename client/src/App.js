import Router from "./router/index";
// import "antd/dist/antd.css";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthCntext from "./context/userState";

import TimeAgo from "javascript-time-ago";

import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";

// import AOS from "aos";
// import "aos/dist/aos.css"; // You can also use <link> for styles

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);
// // ..
// AOS.init({
//   offset: 200,
//   duration: 900,
//   once: true,
// });

const App = () => {
  return (
    <>
      <Router />
      <ToastContainer
        position="top-right"
        autoClose={6000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Slide}
      />
    </>
  );
};

export default App;
