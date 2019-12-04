import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/**
 * Square
 */
function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>

    )
}

//Note
// The DOM <button> element’s onClick attribute has a special meaning to React because it is a built-in component.
// For custom components like Square, the naming is up to you. We could give any name to the Square’s onClick prop
// or Board’s handleClick method, and the code would work the same. In React, it’s conventional to use on[Event]
// names for props which represent events and handle[Event] for the methods which handle the events.

/**
 * Board
 */
class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}


/**
 * Game
 */
class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            xIsNext: true,
        }
    }

    // history = [
    //   // Before first move
    //   {
    //     squares: [
    //       null, null, null,
    //       null, null, null,
    //       null, null, null,
    //     ]
    //   },
    //   // After first move
    //   {
    //     squares: [
    //       null, null, null,
    //       null, 'X', null,
    //       null, null, null,
    //     ]
    //   },
    //   // After second move
    //   {
    //     squares: [
    //       null, null, null,
    //       null, 'X', null,
    //       null, null, 'O',
    //     ]
    //   },
    //   // ...
    // ]

    handleClick(i) {
        const history = this.state.history;
        const current = history[history.length-1];
        // we call .slice() to create a copy of the squares array to modify instead of modifying the existing array
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]){
            // Pokud uz nekdo vyhral, nebo uz je pole obsazene.
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            // Unlike the array push() method you might be more familiar with, the concat() method doesn’t
            // mutate the original array, so we prefer it.
            history: history.concat([{squares: squares}]),
            xIsNext: !this.state.xIsNext
        });
    }

    render() {
        const history = this.state.history;
        const current = history[history.length-1];
        const winner = calculateWinner(current.squares);

        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={current.squares} onClick={(i) => this.handleClick(i)}/>
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game/>,
    document.getElementById('root')
);


function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && (squares[b] === squares[b]) && (squares[a] === squares[c])) {
            return squares[a]
        }
    }
    return null
}