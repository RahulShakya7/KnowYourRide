import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { act } from "react-dom/test-utils";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { AuthProvider } from "../../utils/Authcontext";

describe('Navbar', () => {
    test("should render correctly", () => {
        render(<AuthProvider>
          <MemoryRouter initialEntries={["/"]}>
            <Routes>
              <Route path="/" element={<Navbar />} />
            </Routes>
          </MemoryRouter>
        </AuthProvider>);
        
        const logoImage = screen.getByAltText("Logo");
    
        expect(logoImage).toBeInTheDocument();
      });

    test("should change theme", async () => {
        render(<AuthProvider>
          <MemoryRouter initialEntries={["/"]}>
            <Routes>
              <Route path="/" element={<Navbar />} />
            </Routes>
          </MemoryRouter>
        </AuthProvider>);


        const toggleSwitch = screen.getByRole("themechange");
    
        // Initial theme should be light
        expect(document.documentElement.getAttribute("data-theme")).toBe("light");
    
        // Change theme by clicking the toggle switch
        await act(async () => {
          userEvent.click(toggleSwitch);
        });
    
        // After changing theme, it should be dark
        expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
    
        // Change back to light
        await act(async () => {
          userEvent.click(toggleSwitch);
        });
    
        expect(document.documentElement.getAttribute("data-theme")).toBe("light");
      });

      test("should open drawer", () => {
        render(<AuthProvider>
          <MemoryRouter initialEntries={["/"]}>
            <Routes>
              <Route path="/" element={<Navbar />} />
            </Routes>
          </MemoryRouter>
        </AuthProvider>);
        const drawerToggle = screen.getByRole("navdrawer");
    
        // Drawer should be closed initially
        const drawerContent = screen.queryByTestId("drawer-content");
        expect(drawerContent).not.toBeInTheDocument();
    
        // Open the drawer
        act(() => {
          userEvent.click(drawerToggle);
        });
        
    
        // Drawer should be open now
        const activeDrawerContent = screen.queryByText("Welcome");
        expect(activeDrawerContent).toBeInTheDocument();
      });
    
      test("should close drawer", () => {
        render(<AuthProvider>
          <MemoryRouter initialEntries={["/"]}>
            <Routes>
              <Route path="/" element={<Navbar />} />
            </Routes>
          </MemoryRouter>
        </AuthProvider>);
        const drawerToggle = screen.getByRole("navdrawer");

        act(() => {
          userEvent.click(drawerToggle);
        });

        act(() => {
          userEvent.click(drawerToggle);
        });
    
        // Drawer should be closed
        const drawerContent = screen.queryByTestId("drawer-content");
        expect(drawerContent).not.toBeInTheDocument();
      });
})