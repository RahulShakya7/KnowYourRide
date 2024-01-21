import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Footer from "../../components/Footer/Footer";

describe('Footer', () => {
    test("should render correctly", () => {
        render(<Footer />);
                // Check if the paragraph is rendered
        const paragraph = screen.queryByText("Copyright © 2023 - All rights reserved by KnowYourRide");
        expect(paragraph).toBeInTheDocument();
        
        // Check if the heading is rendered
        const heading = screen.queryByText("Review, Learn about any vehicle you like");
        expect(heading).toBeInTheDocument();

        // Check if the logo image is rendered
        const logoImage = screen.getByAltText("Logo");
        expect(logoImage).toBeInTheDocument();

    });
});
