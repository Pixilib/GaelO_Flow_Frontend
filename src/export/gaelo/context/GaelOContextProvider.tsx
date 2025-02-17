import GaelOContext from "./GaelOContext";

const GaelOContextProvider = ({ studyName, token, userId, role, study, children }) => {
  return (
    <GaelOContext.Provider
      value={{
        studyName: studyName,
        token: token,
        userId: userId,
        role: role,
        study : study
      }}
    >
      {children}
    </GaelOContext.Provider>
  );
};

export default GaelOContextProvider;