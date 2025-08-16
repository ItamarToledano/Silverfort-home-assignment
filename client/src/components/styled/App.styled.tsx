import { styled } from "@mui/material/styles";
import { Paper, Button } from "@mui/material";

export const AppContainer = styled("div")({
  minHeight: "100vh",
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  paddingTop: 32,
  paddingBottom: 32,
});

export const GameHeader = styled("div")({
  textAlign: "center",
  marginBottom: 32,
});

export const GameTitle = styled("h1")({
  color: "white",
  marginBottom: 16,
  fontWeight: 700,
  textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
});

export const ScoreContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: 16,
  marginBottom: 16,
});

export const AppGameBoardContainer = styled(Paper)({
  padding: 32,
  background: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(10px)",
  borderRadius: 24,
  marginBottom: 32,
});

export const ControlsContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  gap: 24,
  marginBottom: 32,
});

export const AppStyledButton = styled(Button)({
  minWidth: 160,
});
