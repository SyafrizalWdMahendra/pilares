import Content from "../components/booking/Content";
import Footer from "../components/booking/Footer";
import Navbar from "../components/booking/Navbar";

export default function Home() {
  return (
    <div className="bg-[#e6edf4] min-h-screen py-10 lg:px-5 md:px-5 px-5 w-full flex flex-col font-sans">
      <Navbar />
      <Content />
      <Footer />
    </div>
  );
}
