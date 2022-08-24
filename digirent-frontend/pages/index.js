import Head from "next/head";
import React, { useState } from "react";
import Layout from "../components/Layout";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import { isUser } from "../lib/user";
import { gql, useLazyQuery } from "@apollo/client";
import { useCart } from "react-use-cart";
import { ToastContainer, toast } from "react-toastify";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

//NOTE Mutation query
const GET_AVAILABLE_RENT = gql`
  query Getavailablerentals($userinput: AvailableRentalInput) {
    getavailablerentals(userinput: $userinput) {
      id
      model
      type
      seats
      location
      status
    }
  }
`;

export default function Home({ user }) {
  const [available, setAvailable] = useState([]);
  const [isModal, setIsModal] = useState(false);

  const showSuccess = () => {
    toast.success("Rent Book sucess!");
    setIsModal(false);
  };

  const getAvailableRentHandler = (e) => {
    e.preventDefault();
    const variables = {
      userinput: {
        location: e.target.location.value,
      },
    };
    getAvailableRent({ variables });
    setIsModal(true);
  };

  //NOTE handle Mutation
  const [getAvailableRent, { loading }] = useLazyQuery(GET_AVAILABLE_RENT, {
    onCompleted(data) {
      console.log(data.getavailablerentals);
      setAvailable(data.getavailablerentals);
    },
    onError(err) {
      console.log(err);
    },
  });

  return (
    <div>
      <Head>
        <title>DigiRent</title>
        <meta name="description" content="MovoTi" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout size={"h-screen"} user={user}>
        <div
          className="h-full bg-stone-900 text-white flex justify-center items-center flex-col gap-5 bg-blend-overlay"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1610647752706-3bb12232b3ab?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1625&q=80)",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <form
            onSubmit={(e) => getAvailableRentHandler(e)}
            className="text-black bg-white p-5 rounded flex flex-col gap-5"
          >
            <h1 className="text-2xl font-bold">Get Available Rent</h1>
            <select name="location" id="location">
              <option value="Dhaka">Dhaka</option>
              <option value="Barishal">Barishal</option>
              <option value="Sylhet">Sylhet</option>
              <option value="Chittagong">Chittagong</option>
              <option value="Rangpur">Rangpur</option>
              <option value="Rajhshahi">Rajhshahi</option>
              <option value="Khulna">Khulna</option>
            </select>
            <input
              type="submit"
              value={"Submit"}
              className="bg-red-800 text-white p-2 rounded"
            />
          </form>
        </div>

        {isModal && (
          <div className="fixed top-0 left-0 w-full h-full bg-black flex justify-center items-center bg-opacity-70">
            <div className="bg-white rounded p-5 relative">
              <button
                className="absolute -top-5 -right-5 bg-red-800 w-6 h-6 p-2 rounded-full flex justify-center items-center text-white font-bold"
                onClick={() => setIsModal(false)}
              >
                X
              </button>
              {available.length <= 0 ? (
                <span>Sorry no available service</span>
              ) : (
                <span className="text-lg font-bold">
                  Select Service/vehicle
                </span>
              )}
              <div className="flex flex-col gap-2 mt-3">
                {available.map((item) => {
                  return (
                    <button
                      className="flex bg-red-800 text-white p-2 rounded"
                      key={
                        // @ts-ignore
                        item.id
                      }
                      onClick={showSuccess}
                    >
                      <span>
                        {
                          // @ts-ignore
                          item.model
                        }
                      </span>
                      <span>
                        {
                          // @ts-ignore
                          item.seats
                        }
                      </span>
                      <span>
                        {
                          // @ts-ignore
                          item.type
                        }
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        <footer className="bg-black text-white py-5 flex justify-center items-center">
          © Created by Ahnaf Shamin
        </footer>
      </Layout>
      <ToastContainer />
    </div>
  );
}

export async function getServerSideProps({ req }) {
  const user = await isUser(req.cookies["token"]);
  let loggedinUser = null;
  if (user && user.user.role !== "Admin") {
    loggedinUser = user.user;
  } else {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }
  return {
    props: {
      user: loggedinUser,
    }, // Will be passed to the page component as props
  };
}
