import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Hero from "../../components/HeroSlider";
import { AuthProvider } from "../../utils/Authcontext";

describe('HeroSection', () => {
    test("should render correctly", () => {
        render(<AuthProvider>
          <MemoryRouter initialEntries={["/"]}>
            <Routes>
              <Route path="/" element={<Hero />} />
            </Routes>
          </MemoryRouter>
        </AuthProvider>);
        
        const text = screen.getByText("Learn about the latest Vehicles");
    
        expect(text).toBeInTheDocument();
      });

   })