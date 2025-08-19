// import { useState } from "react";
// import { useSignInEmailPassword } from "@nhost/react";

// export default function SignIn({ switchToSignUp }) {
//   const { signInEmailPassword, isLoading } = useSignInEmailPassword();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [verificationNeeded, setVerificationNeeded] = useState(false);
//   const [error, setError] = useState(null);

//   const handleSignIn = async (e) => {
//     e.preventDefault();
//     setError(null);
//     setVerificationNeeded(false);

//     try {
//       const result = await signInEmailPassword(email, password);
      
//       console.log("Sign in response:", result);

//       if (result.needsEmailVerification) {
//         setVerificationNeeded(true);
//         return;
//       }

//       if (result.error) {
//         setError(result.error);
//         return;
//       }

//       // Successful sign-in logic here
//       // (Nhost will automatically handle the session)

//     } catch (err) {
//       console.error("Sign in failed:", err);
//       setError({ message: "An unexpected error occurred" });
//     }
//   };

//   return (
//     <div className="flex items-center justify-center h-screen">
//       <form onSubmit={handleSignIn} className="bg-white p-6 rounded shadow w-80 space-y-4">
//         <h2 className="text-xl font-bold">Sign In</h2>
        
//         {verificationNeeded ? (
//           <div className="bg-yellow-100 p-3 rounded text-yellow-800">
//             <p>Please verify your email address first.</p>
//             <p>Check your inbox for the verification email.</p>
//             <button 
//               type="button"
//               className="text-blue-600 mt-2 text-sm"
//               onClick={() => {
//                 // You could implement resend verification here
//                 setVerificationNeeded(false);
//               }}
//             >
//               Resend verification email
//             </button>
//           </div>
//         ) : (
//           <>
//             <input 
//               type="email" 
//               placeholder="Email"
//               className="border p-2 w-full" 
//               value={email} 
//               onChange={e => setEmail(e.target.value)} 
//               required
//             />
//             <input 
//               type="password" 
//               placeholder="Password"
//               className="border p-2 w-full" 
//               value={password} 
//               onChange={e => setPassword(e.target.value)}
//               required
//             />
            
//             {error && (
//               <p className="text-red-500">
//                 {error.message || "Sign in failed. Please check your credentials."}
//               </p>
//             )}

//             <button 
//               type="submit" 
//               disabled={isLoading} 
//               className="bg-blue-500 text-white px-4 py-2 w-full rounded hover:bg-blue-600 disabled:opacity-50"
//             >
//               {isLoading ? "Signing in..." : "Sign In"}
//             </button>
//           </>
//         )}

//         <p className="text-sm">
//           Don't have an account?{" "}
//           <span 
//             onClick={switchToSignUp} 
//             className="text-blue-600 cursor-pointer hover:underline"
//           >
//             Sign Up
//           </span>
//         </p>
//       </form>
//     </div>
//   );
// }

import { useState } from "react";
import { useSignInEmailPassword } from "@nhost/react";
import { useNhostClient } from "@nhost/react";


export default function SignIn({ switchToSignUp }) {
  const { signInEmailPassword, isLoading } = useSignInEmailPassword();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verificationNeeded, setVerificationNeeded] = useState(false);
  const [error, setError] = useState(null);
  const nhost = useNhostClient();
  const [resetMessage, setResetMessage] = useState("");
  const [resetError, setResetError] = useState("");

 

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError(null);
    setVerificationNeeded(false);

    try {
      const result = await signInEmailPassword(email, password);
      console.log("Sign in response:", result);

      if (result.needsEmailVerification) {
        setVerificationNeeded(true);
        return;
      }

      if (result.error) {
        setError(result.error);
        return;
      }
    } catch (err) {
      console.error("Sign in failed:", err);
      setError({ message: "An unexpected error occurred" });
    }
  };

  const handleForgotPassword = async () => {
    setResetMessage("");
    setResetError("");

    if (!email) {
      setResetError("Please enter your email first");
      return;
    }

    const { error } = await nhost.auth.resetPassword({ email });

    if (error) {
      setResetError(error.message);
    } else {
      setResetMessage("Password reset email sent! Check your inbox.");
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 via-indigo-500 to-blue-500 p-4 animate-gradient">
      <div className="w-full max-w-md">
        <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden border border-white border-opacity-20 transform transition-all hover:scale-[1.005] hover:shadow-2xl">
          <div className="p-8 sm:p-10">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-extrabold text-white tracking-tight">
                Welcome back
              </h2>
              <p className="mt-2 text-white text-opacity-80">
                Sign in to your account
              </p>
            </div>

            {verificationNeeded ? (
              <div className="bg-yellow-400 bg-opacity-20 p-4 rounded-xl text-yellow-100 text-center space-y-3 backdrop-blur-sm border border-yellow-400 border-opacity-30 animate-pulse">
                <p className="font-medium">Verification required</p>
                <p className="text-sm">
                  Please check your email for the verification link.
                </p>
                <button
                  type="button"
                  className="text-white text-sm font-medium mt-2 hover:underline focus:outline-none focus:ring-2 focus:ring-yellow-300 rounded"
                  onClick={() => setVerificationNeeded(false)}
                >
                  Resend verification
                </button>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSignIn}>
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-white text-opacity-80 mb-1"
                    >
                      Email address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white bg-opacity-10 border border-white border-opacity-20 text-white placeholder-white placeholder-opacity-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition-all"
                      placeholder="you@example.com"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-white text-opacity-80"
                      >
                        Password
                      </label>
                      
                    </div>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white bg-opacity-10 border border-white border-opacity-20 text-white placeholder-white placeholder-opacity-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition-all"
                      placeholder="••••••••"
                    />


                      <div className="flex justify-end text-sm mt-1">
                        <button
                          type="button"
                          onClick={handleForgotPassword}
                          className="text-indigo-200 hover:text-white underline focus:outline-none"
                        >
                          Forgot password?
                        </button>
                      </div>

                      {resetMessage && (
                        <p className="text-green-400 text-sm mt-2">{resetMessage}</p>
                      )}
                      {resetError && (
                        <p className="text-red-400 text-sm mt-2">{resetError}</p>
                      )}


                    
                  </div>

                  {error && (
                    <div className="bg-red-400 bg-opacity-20 p-3 rounded-lg text-red-100 text-sm text-center border border-red-400 border-opacity-30 animate-shake">
                      {error.message || "Invalid credentials. Please try again."}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Signing in...
                    </span>
                  ) : (
                    "Sign in"
                  )}
                </button>
              </form>
            )}

            <div className="mt-6 text-center">
              <button
                onClick={switchToSignUp}
                className="text-sm text-white text-opacity-80 hover:text-opacity-100 font-medium transition-all focus:outline-none"
              >
                Don't have an account?{" "}
                <span className="text-indigo-200 hover:text-white underline">
                  Sign up
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}