
import Button from "./../RenderComponents/Button";
import { useNavigate } from "react-router-dom";

const LegalMention = () => {
  const navigate = useNavigate();
  return (
    <>
      <Button color="purple" onClick={() => navigate("/")}>
        Return to Main
      </Button>{" "}
      "Legal Mention"
    </>
  );
};

export default LegalMention;
