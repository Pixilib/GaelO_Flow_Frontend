import GaelOContext from "./GaelOContext";

const GaelOContextProvider = ({ studyName, token, userId, role, children }) => {
  return (
    <GaelOContext.Provider
      value={{
        studyName: studyName,
        token: token,
        userId: userId,
        role: role
      }}
    >
      {children}
    </GaelOContext.Provider>
  );
};

export default GaelOContextProvider;