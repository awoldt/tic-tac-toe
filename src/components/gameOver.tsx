import { Button, Col, Row } from "react-bootstrap";

export default function Gameover({
  gridData,
  winningPattern,
  whoseTurn,
  setFirstTurn,
  setWhoseTurn,
  setGridData,
  setGameOver,
  setWinningPattern,
  setTotalMoves,
}: {
  gridData: (null[] | string[])[];
  winningPattern: boolean[][] | null;
  whoseTurn: "X" | "O";
  setFirstTurn: React.Dispatch<React.SetStateAction<"X" | "O" | undefined>>;
  setWhoseTurn: React.Dispatch<React.SetStateAction<"X" | "O" | undefined>>;
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

        <Button
          style={{ marginBottom: "25px" }}
          onClick={() => {
            const r = Math.floor(Math.random() * 2); //0===x, 1===0

            if (r === 0) {
              setFirstTurn("X");
              setWhoseTurn("X");
            } else {
              setFirstTurn("O");
              setWhoseTurn("O");
            }
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrow-repeat"
            viewBox="0 0 16 16"
          >
            <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z" />
            <path
              fill-rule="evenodd"
              d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"
            />
          </svg>{" "}
          Play again
        </Button>

        {winningPattern! && (
          <span
            className="text-center"
            style={{ display: "block", marginBottom: "50px" }}
          >
            The {whoseTurn}'s won!
          </span>
        )}
      </div>

      <Row style={{ maxWidth: "600px" }} id="grid_row">
        {gridData.map((row: any[], rowIndex: number) => {
          return (
            <>
              {winningPattern === null && (
                <>
                  {row.map((data: null | "X" | "O", dataIndex: number) => {
                    return (
                      <>
                        <Col xs={4} className="grid_square">
                          {data}
                        </Col>
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
                          <Col
                            xs={4}
                            className="grid_square"
                            style={{
                              backgroundColor: "rgb(0, 255, 255, .5)",
                            }}
                          >
                            {data}
                          </Col>
                        )}
                        {!winningPattern![rowIndex][dataIndex] && (
                          <Col xs={4} className="grid_square">
                            {data}
                          </Col>
                        )}
                      </>
                    );
                  })}
                </>
              )}
            </>
          );
        })}
      </Row>
    </>
  );
}
