import React from "react";
import { CiLocationOn } from "react-icons/ci";
import { FaPhone } from "react-icons/fa6";
import { ImConnection } from "react-icons/im";

function Contact() {
  return (
    <div>
         <div>
        <img
          className="md:w-2/6 w-10/12 rounded-md mx-auto mt-10 mb-15"
          src="https://i.ibb.co.com/9x3Gmtg/contact-us-customer-support-hotline-people-connect-businessman-touching-phone-application-check-emai.avif"
          alt=""
        />
      </div>

      <div className="flex wrap-anywhere flex-col md:flex-row  gap-10 mx-auto justify-evenly w-11/12 lg:w-8/12 xl:w-1/2 mb-10 items-center text-black">
        <div className="w-50 h-65 bg-sky-200 rounded-md border-t-2 border-sky-400 p-3 relative wrap-anywhere">

            <div className="absolute text-sky-500 -top-10 -left-5"><ImConnection size={60} /></div>

            <p className="font-bold mb-3">Press</p>
            <p className="text-center">Are you interested in our latest news or working on a Grammarly story and need to get in touch?</p>
            <button className="btn btn-outline btn-info w-full mt-4 h-7">Explore Loans</button>

        </div>
       
         <div className="w-50 relative h-70 bg-sky-200 rounded-md border-t-2 border-sky-600 p-3 my-auto">

             <div className="absolute text-sky-500 -top-10 -left-5"><FaPhone size={60} /></div>

            <p className="font-bold mb-7 mt-4">Help & Support</p>
            <p className="text-center">Our support team is spread across the globe to give you answers fast.</p>
            <button className="btn btn-outline btn-info w-full mt-10 h-7 mb-3">Explore Loans</button>

        </div>
        

          <div className="w-50 relative h-65 bg-sky-200 rounded-md border-t-2 border-sky-400 p-3">
            <div className="absolute text-sky-500 -top-10 -left-5"><CiLocationOn size={70} /></div>

            <p className="font-bold mb-6 mt-3">Sales</p>
            <p className="text-center text-black">Get in touch with our sales team to see how we can work together</p>
            <button className="btn btn-outline btn-info w-full mt-10 h-7">Explore Loans</button>

        </div>
      </div>
    </div>
  );
}

export default Contact;
