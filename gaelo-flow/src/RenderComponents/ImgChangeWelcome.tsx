import { useLocation } from "react-router-dom";

export const ImgChangeWelcome = () => {
    const location = useLocation();

    let imageSrc, altText;
    switch (location.pathname) {
        case "/sign-up":
            console.log("sign-up");
            imageSrc = "/bgImgSignInForm.svg";
            altText = "Medical professional analyzing a digital full-body scan on a touchscreen interface";
            break;
        default:
            // default image
            imageSrc = "/VisualHome3.svg";
            altText = "Doctor presenting a chest X-ray on a computer screen with various medical and time management icons in the background";
            break;
    }

    return <img src={imageSrc} alt={altText} className="mx-auto mt-4" />;
};
