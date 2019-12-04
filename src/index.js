import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/**
 * Square
 */
class Square extends React.Component {
    render() {
        return (
            <button className="square" onClick={() => this.props.onClick()}>
                {this.props.value}
            </button>
        );
    }
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
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
        };
    }
    // When we fill the board in later, the this.state.squares array will look something like this:
    //     [
    //         'O', null, 'X',
    //         'X', 'X', 'O',
    //         'O', null, null,
    //     ]

    handleClick(i){
        // we call .slice() to create a copy of the squares array to modify instead of modifying the existing array
        const squares =  this.state.squares.slice();
        squares[i] = 'X';
        this.setState({squares: squares});
    }

    renderSquare(i) {
        return (
            <Square
                value={this.state.squares[i]}
                onClick={() => this.handleClick(i)}
            />
        );
    }

    render() {
        const status = 'Next player: X';

        return (
            <div>
                <div className="status">{status}</div>
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
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board/>
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
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
