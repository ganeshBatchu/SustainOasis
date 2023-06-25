import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";
import background from "backgroundImage/background.png";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const myStyle={
    backgroundImage: `url(${background})`,
    backgroundRepeat: 'repeat-y',
    height:'500vh',
    marginTop:'-70px',
    fontSize:'50px',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  }; 
  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
        SustainOasis
        </Typography>
      <Box p="1rem"></Box>
      </Box>
      <Box p= "1rem"></Box>
      <div style={myStyle}>
      <Box p= "0.5rem"></Box>
      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to SustainOasis, a place where you can reduce waste by sharing items!
        </Typography>
        <Form />
      </Box>
      </div>
    </Box>
  );
};

export default LoginPage;
