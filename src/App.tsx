import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import { QueryProvider } from "./lib/react-query/QueryProvider";

const docTitle = document.title;
window.addEventListener("blur", () => {
  document.title = "Come Back 😛";
});
window.addEventListener("focus", () => {
  document.title = docTitle;
});

import { Route, Routes } from "react-router-dom";

import "./globals.css";

import {
  AllUsers,
  CreatePost,
  EditPost,
  Explore,
  Home,
  PostDetails,
  Profile,
  Saved,
  UpdateProfile,
} from "./_root/pages";
import SigninForm from "./_auth/forms/SigninForm";
import SignupForm from "./_auth/forms/SignupForm";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";
import { Toaster } from "@/components/ui/toaster";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryProvider>
        <AuthProvider>
          <main className="flex h-screen">
            <Routes>
              {/* public routes */}
              <Route element={<AuthLayout />}>
                <Route path="/sign-in" element={<SigninForm />} />
                <Route path="/sign-up" element={<SignupForm />} />
              </Route>

              {/* private routes */}
              <Route element={<RootLayout />}>
                <Route index element={<Home />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/saved" element={<Saved />} />
                <Route path="/all-users" element={<AllUsers />} />
                <Route path="/create-post" element={<CreatePost />} />
                <Route path="/update-post/:id" element={<EditPost />} />
                <Route path="/posts/:id" element={<PostDetails />} />
                <Route path="/profile/:id/*" element={<Profile />} />
                <Route path="/update-profile/:id" element={<UpdateProfile />} />
              </Route>
            </Routes>

            <Toaster />
          </main>
        </AuthProvider>
      </QueryProvider>
    </BrowserRouter>
  </React.StrictMode>
);
