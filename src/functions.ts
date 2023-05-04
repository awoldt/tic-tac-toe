export function isThereWinner(
  grid: (null[] | string[])[],
  currentTurn: "X" | "O",
  setGameOver: React.Dispatch<React.SetStateAction<boolean>>,
  setWinningPattern: React.Dispatch<React.SetStateAction<boolean[][] | null>>,
  totalMoves: number,
  whoseTurn: "X" | "O",
  setWhoseTurn: React.Dispatch<React.SetStateAction<"X" | "O">>,
  setTotalMoves: React.Dispatch<React.SetStateAction<number>>
) {
  //there are 8 possible patterns to win
  if (
    grid[0][0] === currentTurn &&
    grid[1][0] === currentTurn &&
    grid[2][0] === currentTurn
  ) {
    setGameOver(true);
    setWinningPattern([
      [true, false, false],
      [true, false, false],
      [true, false, false],
    ]);
  } else if (
    grid[0][1] === currentTurn &&
    grid[1][1] === currentTurn &&
    grid[2][1] === currentTurn
  ) {
    setGameOver(true);
    setWinningPattern([
      [false, true, false],
      [false, true, false],
      [false, true, false],
    ]);
  } else if (
    grid[0][2] === currentTurn &&
    grid[1][2] === currentTurn &&
    grid[2][2] === currentTurn
  ) {
    setGameOver(true);
    setWinningPattern([
      [false, false, true],
      [false, false, true],
      [false, false, true],
    ]);
  } else if (
    grid[0][0] === currentTurn &&
    grid[0][1] === currentTurn &&
    grid[0][2] === currentTurn
  ) {
    setGameOver(true);
    setWinningPattern([
      [true, true, true],
      [false, false, false],
      [false, false, false],
    ]);
  } else if (
    grid[1][0] === currentTurn &&
    grid[1][1] === currentTurn &&
    grid[1][2] === currentTurn
  ) {
    setGameOver(true);
    setWinningPattern([
      [false, false, false],
      [true, true, true],
      [false, false, false],
    ]);
  } else if (
    grid[2][0] === currentTurn &&
    grid[2][1] === currentTurn &&
    grid[2][2] === currentTurn
  ) {
    setGameOver(true);
    setWinningPattern([
      [false, false, false],
      [false, false, false],
      [true, true, true],
    ]);
  } else if (
    grid[0][0] === currentTurn &&
    grid[1][1] === currentTurn &&
    grid[2][2] === currentTurn
  ) {
    setGameOver(true);
    setWinningPattern([
      [true, false, false],
      [false, true, false],
      [false, false, true],
    ]);
  } else if (
    grid[0][2] === currentTurn &&
    grid[1][1] === currentTurn &&
    grid[2][0] === currentTurn
  ) {
    setGameOver(true);
    setWinningPattern([
      [false, false, true],
      [false, true, false],
      [true, false, false],
    ]);
  } else {
    //nobody won, grid full
    if (totalMoves === 8) {
      setGameOver(true);
      setWinningPattern(null);
    } else {
      whoseTurn === "X" ? setWhoseTurn("O") : setWhoseTurn("X");
      setTotalMoves((prev) => (prev += 1));
    }
  }
}
