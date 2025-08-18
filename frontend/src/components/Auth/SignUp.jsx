// import { useState } from "react";
// import { useSignUpEmailPassword } from "@nhost/react";

// export default function SignUp({ switchToSignIn }) {
//   const { signUpEmailPassword, isLoading, isSuccess, error } =
//     useSignUpEmailPassword();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSignUp = async (e) => {
//   e.preventDefault();
//   try {
//     const res = await signUpEmailPassword(email, password);
//     console.log("Sign up response:", res);
//     if (res.error) {
//       console.error("Sign up error:", res.error);
//     }
//   } catch (error) {
//     console.error("Sign up failed:", error);
//   }
// };

//   return (
//     <div className="flex items-center justify-center h-screen">
//       <form
//         onSubmit={handleSignUp}
//         className="bg-white p-6 rounded shadow w-80 space-y-4"
//       >
//         <h2 className="text-xl font-bold">Sign Up</h2>
//         <input
//           type="email"
//           placeholder="Email"
//           className="border p-2 w-full"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           className="border p-2 w-full"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         {error && <p className="text-red-500">{error.message}</p>}
//         <button
//           type="submit"
//           disabled={isLoading}
//           className="bg-green-500 text-white px-4 py-2 w-full rounded"
//         >
//           {isLoading ? "Signing up..." : "Sign Up"}
//         </button>
//         <p className="text-sm">
//           Already have an account?{" "}
//           <span
//             onClick={switchToSignIn}
//             className="text-blue-600 cursor-pointer"
//           >
//             Sign In
//           </span>
//         </p>
//       </form>
//     </div>
//   );
// }


import { useState } from "react";
import { useSignUpEmailPassword } from "@nhost/react";

export default function SignUp({ switchToSignIn }) {
  const { signUpEmailPassword, isLoading, isSuccess, error } =
    useSignUpEmailPassword();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const res = await signUpEmailPassword(email, password);
      console.log("Sign up response:", res);
      if (res.error) {
        console.error("Sign up error:", res.error);
      }
    } catch (error) {
      console.error("Sign up failed:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 p-4 animate-gradient">
      <div className="w-full max-w-md">
        <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden border border-white border-opacity-20 transform transition-all hover:scale-[1.005] hover:shadow-2xl">
          <div className="p-8 sm:p-10">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-extrabold text-white tracking-tight">
                Create an account
              </h2>
              <p className="mt-2 text-white text-opacity-80">
                Join us today
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSignUp}>
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
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-white text-opacity-80 mb-1"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white bg-opacity-10 border border-white border-opacity-20 text-white placeholder-white placeholder-opacity-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition-all"
                    placeholder="••••••••"
                  />
                </div>

                {error && (
                  <div className="bg-red-400 bg-opacity-20 p-3 rounded-lg text-red-100 text-sm text-center border border-red-400 border-opacity-30 animate-shake">
                    {error.message || "Sign up failed. Please try again."}
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
                    Creating account...
                  </span>
                ) : (
                  "Sign up"
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={switchToSignIn}
                className="text-sm text-white text-opacity-80 hover:text-opacity-100 font-medium transition-all focus:outline-none"
              >
                Already have an account?{" "}
                <span className="text-pink-200 hover:text-white underline">
                  Sign in
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}