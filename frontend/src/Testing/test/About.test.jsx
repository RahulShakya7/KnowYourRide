import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import About from "../../components/AboutSection";
import { AuthProvider } from "../../utils/Authcontext";

describe('Navbar', () => {
    test("should render correctly", () => {
        render(<AuthProvider>
          <MemoryRouter initialEntries={["/"]}>
            <Routes>
              <Route path="/" element={<About />} />
            </Routes>
          </MemoryRouter>
        </AuthProvider>);
        
        const text = screen.getByText("Welcome to Know Your Ride"); 
    
        expect(text).toBeInTheDocument();
      });

   })