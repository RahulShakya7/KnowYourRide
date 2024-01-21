import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Common from "../../components/CommonSection";
import { AuthProvider } from "../../utils/Authcontext";

describe('HeroSection', () => {
    test("should not render correctly", () => {
        render(<AuthProvider>
          <MemoryRouter initialEntries={["/"]}>
            <Routes>
              <Route path="/" element={<Common />} />
            </Routes>
          </MemoryRouter>
        </AuthProvider>);
        
        const text = screen.getByText("");
    
        expect(text).toBeInTheDocument();
      });
      test("should render correctly", () => {
        render(<AuthProvider>
          <MemoryRouter initialEntries={["/"]}>
            <Routes>
              <Route path="/" element={<Common title={"test"} />} />
            </Routes>
          </MemoryRouter>
        </AuthProvider>);
        
        const text = screen.getByText("test");
    
        expect(text).toBeInTheDocument();
      });

   })
   
   