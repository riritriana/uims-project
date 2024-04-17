import { Instagram, Youtube } from "lucide-react";
const Footer = () => {
  return (
    <div className="w-full bg-blue-600 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between">
        <div>
          <h3 className="text-lg font-bold mb-4">Contact Us</h3>
          <p>Email: riritriana21@gmail.com</p>
          <p>Phone: 086782266</p>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4">Address</h3>
          <p>123 Street Name</p>
          <p>City, State, Country</p>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a className="text-white hover:text-gray-200">
              <i>
                <Instagram />
              </i>
            </a>
            <a className="text-white hover:text-gray-200">
              <i>
                {" "}
                <Youtube />
              </i>
            </a>
          </div>
        </div>
      </div>
      <div className="text-center mt-4">
        <p>&copy; 2024 Riri Projek. All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
