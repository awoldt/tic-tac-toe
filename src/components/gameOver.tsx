export default function Gameover({
  gridData,
  winningPattern,
  whoseTurn,
  setWhoseTurn,
  setGridData,
  setGameOver,
  setWinningPattern,
  setTotalMoves,
}: {
  gridData: (null[] | string[])[];
  winningPattern: boolean[][] | null;
  whoseTurn: "X" | "O";
  setWhoseTurn: React.Dispatch<React.SetStateAction<"X" | "O">>;
  setGridData: React.Dispatch<React.SetStateAction<(null[] | string[])[]>>;
  setGameOver: React.Dispatch<React.SetStateAction<boolean>>;
  setWinningPattern: React.Dispatch<React.SetStateAction<boolean[][] | null>>;
  setTotalMoves: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <>
      <div className="text-center">
        <code
          style={{
            display: "block",
            marginBottom: "5px",
            fontSize: "30px",
            marginTop: "50px",
          }}
        >
          Game over
        </code>

        <button
          style={{
            marginBottom: "25px",
            backgroundColor: "#282c34",
            color: "#00ffff",
            border: "none",
            fontWeight: "bold",
          }}
          onClick={() => {
            setWhoseTurn("X");
            setGridData([
              [null, null, null], //top row
              [null, null, null], //middle row
              [null, null, null], //bottom row
            ]);
            setGameOver(false);
            setWinningPattern(null);
            setTotalMoves(0);
          }}
        >
          <img src="/icons/arrow-repeat.svg" alt="restart game icon" /> Play
          again
        </button>

        {winningPattern! && (
          <span
            className="text-center"
            style={{ display: "block", marginBottom: "50px" }}
          >
            The {whoseTurn}'s won!
          </span>
        )}
      </div>

      <div style={{ maxWidth: "600px" }} id="grid_row" className="row">
        {gridData.map((row: any[], rowIndex: number) => {
          return (
            <>
              {winningPattern === null && (
                <>
                  {row.map((data: null | "X" | "O", dataIndex: number) => {
                    return (
                      <>
                        <div className="grid_square col-4">{data}</div>
                      </>
                    );
                  })}
                </>
              )}
              {winningPattern! && (
                <>
                  {row.map((data: null | "X" | "O", dataIndex: number) => {
                    return (
                      <>
                        {winningPattern![rowIndex][dataIndex] && (
                          <div
                            className="grid_square col-4"
                            style={{
                              backgroundColor: "rgb(0, 255, 255, .5)",
                            }}
                          >
                            {data}
                          </div>
                        )}
                        {!winningPattern![rowIndex][dataIndex] && (
                          <div className="grid_square col-4">{data}</div>
                        )}
                      </>
                    );
                  })}
                </>
              )}
            </>
          );
        })}
      </div>
    </>
  );
}
