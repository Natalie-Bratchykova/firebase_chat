const ErrorPage = () => {
  return (
    <div
      style={{
        display: "flex",
        height: window.innerHeight - 100,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1
        style={{
          color: "red",
          textAlign: "center",
          fontSize: "2rem",
        }}
      >
        No internet connection!
      </h1>
      <p>Check your connection and try it again</p>
    </div>
  );
};

export default ErrorPage;
