import { useState } from "react";
import Gameover from "./gameOver";
import { isThereWinner } from "../functions";

export default function Grid() {
  const [whoseTurn, setWhoseTurn] = useState<"X" | "O">("X"); //X is default
  const [GRID_DATA, SET_GRID_DATA] = useState<(null[] | string[])[]>([
    [null, null, null], //top row
    [null, null, null], //middle row
    [null, null, null], //bottom row
  ]);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [winningPattern, setWinningPattern] = useState<boolean[][] | null>(
    null
  ); //the indexs of the squares to color after someone wins, null means nobody won
  const [totalMoves, setTotalMoves] = useState<number>(0);

  return (
    <>
      {!gameOver && (
        <div className="row" style={{ maxWidth: "600px" }} id="grid_row">
          {GRID_DATA.map((row: any[], rowIndex: number) => {
            return (
              <>
                {row.map((data: null | "X" | "O", dataIndex: number) => {
                  return (
                    <>
                      {data === null && (
                        <div
                          className="grid_square col-4"
                          onClick={() => {
                            //1. set new grid data based on where user clicked on grid
                            const x = [...GRID_DATA];
                            whoseTurn === "X"
                              ? (x[rowIndex][dataIndex] = "X")
                              : (x[rowIndex][dataIndex] = "O");
                            SET_GRID_DATA(x);

                            //2. check to see if anybody won based on new grid
                            isThereWinner(
                              x,
                              whoseTurn!,
                              setGameOver,
                              setWinningPattern,
                              totalMoves,
                              whoseTurn,
                              setWhoseTurn,
                              setTotalMoves
                            );
                          }}
                        >
                          {data}
                        </div>
                      )}
                      {data !== null && (
                        <div className="grid_square col-4">{data}</div>
                      )}
                    </>
                  );
                })}
              </>
            );
          })}
        </div>
      )}
      {gameOver && (
        <Gameover
          gridData={GRID_DATA}
          winningPattern={winningPattern}
          whoseTurn={whoseTurn!}
          setWhoseTurn={setWhoseTurn}
          setGridData={SET_GRID_DATA}
          setGameOver={setGameOver}
          setWinningPattern={setWinningPattern}
          setTotalMoves={setTotalMoves}
        />
      )}
    </>
  );
}
