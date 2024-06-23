import { Container, Grid } from "@mui/material";

function Loading() {
  return (
    <Container>
      <Grid
        style={{ height: window.innerHeight - 50 }}
        container
        justifyContent={"center"}
        alignItems={"center"}
      >
        <div className="loader"></div>
      </Grid>
    </Container>
  );
}

export default Loading;
