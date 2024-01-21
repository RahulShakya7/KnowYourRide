import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Vehicle from "../../components/FindVehicleForm";
import { AuthProvider } from "../../utils/Authcontext";

describe('Navbar', () => {
    test("should render correctly", () => {
        render(<AuthProvider>
          <MemoryRouter initialEntries={["/"]}>
            <Routes>
              <Route path="/" element={<Vehicle />} />
            </Routes>
          </MemoryRouter>
        </AuthProvider>);
        
        const selectElements = screen.getAllByRole('combobox'); 
    
        expect(selectElements.length).toBe(2);
      });
      test("should fail to display combobox", () => {
        render(
            <AuthProvider>
                <MemoryRouter initialEntries={["/"]}>
                    <Routes>
                        <Route path="/" element={<FindVehicle />} />
                    </Routes>
                </MemoryRouter>
            </AuthProvider>
        );
        
        const selectElements = screen.getAllByRole('combobox');
    
        expect(selectElements.length).toBe(3); // This expectation is incorrect and will cause the test to fail
    });
   })