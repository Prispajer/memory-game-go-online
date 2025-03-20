import React from "react";
import GameBoard from "./components/GameBoard";

const App = () => {
  const [playerMove, SetPlayerMove] = React.useState<string>("");

  return (
    <div>
      <GameBoard />
    </div>
  );
};

export default App;
