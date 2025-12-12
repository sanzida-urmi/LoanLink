import React,{ useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'
import useAuth from './useAuth'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
})

const useAxiosSecure = () => {
  const { user, signOutUser, loading } = useAuth()
  const navigate = useNavigate()
 
  console.log(user?.accessToken);

  useEffect(() => {
    if (user?.accessToken) {
      // Add request interceptor
      console.log("hi")
      const requestInterceptor = axiosInstance.interceptors.request.use(
        config => {
            console.log(user?.accessToken);

          config.headers.authorization = `Bearer ${user?.accessToken}`
          return config
          
        }
      )

      // Add response interceptor
      const responseInterceptor = axiosInstance.interceptors.response.use(
        res => res,
        err => {
          if (err?.response?.status === 401 || err?.response?.status === 403) {
            signOutUser()
              .then(() => {
                console.log('Logged out successfully.')
              })
              .catch(console.error)
            navigate('/login')
          }
          return Promise.reject(err)
        }
      )

      // Cleanup to prevent multiple interceptors on re-renders
      return () => {
        axiosInstance.interceptors.request.eject(requestInterceptor)
        axiosInstance.interceptors.response.eject(responseInterceptor)
      }
    }
  }, [user, loading, signOutUser, navigate])

  return axiosInstance
}
export default useAxiosSecure




// import axios from 'axios'
// import React, { useEffect } from 'react'
// // import useAuth from './useAuth';
// import { useNavigate } from 'react-router';
// import useAuth from './useAuth';

// const axiosSecure = axios.create({
//     baseURL: 'https://lonklinkserver.vercel.app'
// })

// function useAxiosSecure() {
//    const { user } = useAuth();
//     const navigate = useNavigate();


//  console.log(user?.accessToken);

//      useEffect(() => {
//        if (!user?.accessToken) {
//            console.log("No user token available")
//            return
//        }

//        console.log(user?.accessToken);
//         // intercept request
//         const reqInterceptor = axiosSecure.interceptors.request.use(config => {
//             config.headers.Authorization = `Bearer ${user?.accessToken}`
//             console.log(user?.accessToken)
//             return config
//         })

//         // interceptor response
//         const resInterceptor = axiosSecure.interceptors.response.use((response) => {
//             return response;
//         }, (error) => {
//             console.log(error);

//             // const statusCode = error.status;
//             // if (statusCode === 401 || statusCode === 403) {
//             //     logOut()
//             //         .then(() => {
//             //             navigate('/login')
//             //         })
//             // }


//             return Promise.reject(error);
//         })

//         return () => {
//             axiosSecure.interceptors.request.eject(reqInterceptor);
//             axiosSecure.interceptors.response.eject(resInterceptor);
//         }

//     }, [user, navigate])

//   return axiosSecure;
// }

// export default useAxiosSecure






// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router";
// import useAuth from "./useAuth";

// // Base axios instance
// const axiosSecure = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || "https://lonklinkserver.vercel.app",
//   withCredentials: true, // credentials সাথে যাবে
// });

// function useAxiosSecure() {
//   const { user, signOutUser, loading } = useAuth();
//   const navigate = useNavigate();
//   const [ready, setReady] = useState(false);

//   useEffect(() => {
//     // Token না আসলে কিছু করা হয়নি
//     if (loading) return;
//     if (!user?.accessToken) {
//       console.log("No user token yet. Waiting...");
//       return;
//     }

//     console.log("Attaching interceptors with token:", user.accessToken);

//     // Request interceptor
//     const reqInterceptor = axiosSecure.interceptors.request.use(
//       (config) => {
//         config.headers.Authorization = `Bearer ${user.accessToken}`;
//            console.log("----:", user.accessToken);
//         return config;
//       },
//       (error) => {
//         console.error("Request interceptor error:", error);
//         return Promise.reject(error);
//       }
//     );

//     // Response interceptor
//     const resInterceptor = axiosSecure.interceptors.response.use(
//       (response) => response,
//       async (error) => {
//         console.error("Response error:", error.response?.status, error.message);

//         if (
//           error.response?.status === 401 ||
//           error.response?.status === 403
//         ) {
//           try {
//             await logOut();
//             navigate("/login");
//           } catch (err) {
//             console.error("Logout failed:", err);
//           }
//         }

//         return Promise.reject(error);
//       }
//     );

//     // Interceptors attach complete
//     setReady(true);

//     // Cleanup
//     return () => {
//       axiosSecure.interceptors.request.eject(reqInterceptor);
//       axiosSecure.interceptors.response.eject(resInterceptor);
//       setReady(false);
//     };
//   }, [user?.accessToken, loading, signOutUser, navigate]);

//   if (!ready) {
//     console.log("Axios not ready yet. Waiting for token...");
//   }

//   return axiosSecure;
// }

// export default useAxiosSecure;
