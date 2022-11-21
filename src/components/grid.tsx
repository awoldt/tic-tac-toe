import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import Gameover from "./gameOver";

export default function Grid() {
  const [firstTurn, setFirstTurn] = useState<"X" | "O">();
  const [whoseTurn, setWhoseTurn] = useState<"X" | "O">();
  const [GRID_DATA, SET_GRID_DATA] = useState<(null[] | string[])[]>([
    [null, null, null], //top row
    [null, null, null], //middle row
    [null, null, null], //bottom row
  ]);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [winningPattern, setWinningPattern] = useState<boolean[][] | null>(
    null
  ); //the indexs of the squares to color after someone wins, null means nobody won
  const [totalMoves, setTotalMoves] = useState<number>(0); //9 === game over

  function isThereWinner(grid: (null[] | string[])[], currentTurn: "X" | "O") {
    //there are 8 possible directions to win
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

  useEffect(() => {
    //randomly pick who goes first when game first renders
    const r = Math.floor(Math.random() * 2); //0===x, 1===0

    if (r === 0) {
      setFirstTurn("X");
      setWhoseTurn("X");
    } else {
      setFirstTurn("O");
      setWhoseTurn("O");
    }
  }, []);

  return (
    <>
      {!gameOver && (
        <>
          <div
            className="text-center"
            style={{
              fontWeight: "bold",
              fontSize: "50px",
              marginBottom: "25px",
            }}
          >
            {totalMoves === 0 && <span>{firstTurn} goes first</span>}
          </div>

          <Row style={{ maxWidth: "600px" }} id="grid_row">
            {GRID_DATA.map((row: any[], rowIndex: number) => {
              return (
                <>
                  {row.map((data: null | "X" | "O", dataIndex: number) => {
                    return (
                      <>
                        {data === null && (
                          <Col
                            xs={4}
                            className="grid_square"
                            onClick={() => {
                              //1. set new grid data based on where user clicked on grid
                              const x = [...GRID_DATA];
                              whoseTurn === "X"
                                ? (x[rowIndex][dataIndex] = "X")
                                : (x[rowIndex][dataIndex] = "O");
                              SET_GRID_DATA(x);

                              //2. check to see if anybody won based on new grid
                              isThereWinner(x, whoseTurn!);
                            }}
                          >
                            {data}
                          </Col>
                        )}
                        {data !== null && (
                          <Col xs={4} className="grid_square">
                            {data}
                          </Col>
                        )}
                      </>
                    );
                  })}
                </>
              );
            })}
          </Row>
        </>
      )}
      {gameOver && (
        <>
          <Gameover
            gridData={GRID_DATA}
            winningPattern={winningPattern}
            whoseTurn={whoseTurn!}
            setFirstTurn={setFirstTurn}
            setWhoseTurn={setWhoseTurn}
            setGridData={SET_GRID_DATA}
            setGameOver={setGameOver}
            setWinningPattern={setWinningPattern}
            setTotalMoves={setTotalMoves}
          />
        </>
      )}
    </>
  );
}
