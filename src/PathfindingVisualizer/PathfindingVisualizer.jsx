// import React, { Component } from 'react';
// import Node from './Node/Node';
// import { dijkstra, getNodesInShortestPathOrder } from '../algorithms/dijkstra';
// import { aStar } from '../algorithms/astar';
// import { dfs } from '../algorithms/dfs';
// import { bfs } from '../algorithms/bfs';

// import './PathfindingVisualizer.css';

// const START_NODE_ROW = 10;
// const START_NODE_COL = 15;
// const FINISH_NODE_ROW = 10;
// const FINISH_NODE_COL = 35;

// export default class PathfindingVisualizer extends Component {
//     constructor() {
//         super();
//         this.state = {
//             grid: [],
//             mouseIsPressed: false,
//             algorithm: 'dijkstra',
//             isSettingStartNode: false,
//             isSettingFinishNode: false,
//             startNode: { row: START_NODE_ROW, col: START_NODE_COL },
//             finishNode: { row: FINISH_NODE_ROW, col: FINISH_NODE_COL },
//         };
//     }

//     componentDidMount() {
//         const grid = getInitialGrid(this.state.startNode, this.state.finishNode);
//         this.setState({ grid });
//     }

//     handleMouseDown(row, col) {
//         const { grid, isSettingStartNode, isSettingFinishNode } = this.state;
//         if (isSettingStartNode) {
//             const newGrid = getNewGridWithStartNode(grid, row, col);
//             this.setState({
//                 grid: newGrid,
//                 startNode: { row, col },
//                 isSettingStartNode: false,
//             });
//         } else if (isSettingFinishNode) {
//             const newGrid = getNewGridWithFinishNode(grid, row, col);
//             this.setState({
//                 grid: newGrid,
//                 finishNode: { row, col },
//                 isSettingFinishNode: false,
//             });
//         } else {
//             const newGrid = getNewGridWithWallToggled(grid, row, col);
//             this.setState({ grid: newGrid, mouseIsPressed: true });
//         }
//     }

//     handleMouseEnter(row, col) {
//         if (!this.state.mouseIsPressed) return;
//         const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
//         this.setState({ grid: newGrid });
//     }

//     handleMouseUp() {
//         this.setState({ mouseIsPressed: false });
//     }

//     handleAlgorithmChange(event) {
//         this.setState({ algorithm: event.target.value }, this.resetVisited);
//     }

//     resetGrid() {
//         const { grid, startNode, finishNode } = this.state;
//         const newGrid = grid.map(row =>
//             row.map(node => ({
//                 ...node,
//                 distance: Infinity,
//                 heuristicDistance: 0,
//                 isVisited: false,
//                 isShortestPath: false,
//                 previousNode: null,
//                 isWall: false,
//                 isStart: node.row === startNode.row && node.col === startNode.col,
//                 isFinish: node.row === finishNode.row && node.col === finishNode.col,
//             }))
//         );
//         for (let row of newGrid) {
//             for (let node of row) {
//                 const element = document.getElementById(`node-${node.row}-${node.col}`);
//                 if (element) {
//                     element.className = 'node';
//                     if (node.isStart) {
//                         element.classList.add('node-start');
//                     } else if (node.isFinish) {
//                         element.classList.add('node-finish');
//                     }
//                 }
//             }
//         }

//         this.setState({ grid: newGrid });
//     }

//     resetVisited() {
//         const { grid, startNode, finishNode } = this.state;
//         const newGrid = grid.map(row =>
//             row.map(node => ({
//                 ...node,
//                 distance: Infinity,
//                 heuristicDistance: 0,
//                 isVisited: false,
//                 isShortestPath: false,
//                 previousNode: null,
//                 isWall: node.isWall,
//                 isStart: node.row === startNode.row && node.col === startNode.col,
//                 isFinish: node.row === finishNode.row && node.col === finishNode.col,
//             }))
//         );
//         for (let row of newGrid) {
//             for (let node of row) {
//                 const element = document.getElementById(`node-${node.row}-${node.col}`);
//                 if (element) {
//                     element.className = 'node';
//                     if (node.isStart) {
//                         element.classList.add('node-start');
//                     } else if (node.isFinish) {
//                         element.classList.add('node-finish');
//                     } else if (node.isWall) {
//                         element.classList.add('node-wall');
//                     }
//                 }
//             }
//         }

//         this.setState({ grid: newGrid });
//     }

//     animate(visitedNodesInOrder, nodesInShortestPathOrder) {
//         for (let i = 0; i <= visitedNodesInOrder.length; i++) {
//             if (i === visitedNodesInOrder.length) {
//                 setTimeout(() => {
//                     this.animateShortestPath(nodesInShortestPathOrder);
//                 }, 10 * i);
//                 return;
//             }
//             setTimeout(() => {
//                 const node = visitedNodesInOrder[i];
//                 if (!node.isStart && !node.isFinish) {
//                     document.getElementById(`node-${node.row}-${node.col}`).className =
//                         'node node-visited';
//                 }
//             }, 10 * i);
//         }
//     }

//     animateShortestPath(nodesInShortestPathOrder) {
//         for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
//             setTimeout(() => {
//                 const node = nodesInShortestPathOrder[i];
//                 if (!node.isStart && !node.isFinish) {
//                     document.getElementById(`node-${node.row}-${node.col}`).className =
//                         'node node-shortest-path';
//                 }
//             }, 50 * i);
//         }
//     }

//     visualizeAlgorithm() {
//         const { grid, algorithm, startNode, finishNode } = this.state;
//         const start = grid[startNode.row][startNode.col];
//         const finish = grid[finishNode.row][finishNode.col];
//         let visitedNodesInOrder;

//         if (algorithm === 'dijkstra') {
//             visitedNodesInOrder = dijkstra(grid, start, finish);
//         } else if (algorithm === 'astar') {
//             visitedNodesInOrder = aStar(grid, start, finish);
//         } else if (algorithm === 'dfs') {
//             visitedNodesInOrder = dfs(grid, start, finish);
//         } else if (algorithm === 'bfs') {
//             visitedNodesInOrder = bfs(grid, start, finish);
//         }
//         const nodesInShortestPathOrder = getNodesInShortestPathOrder(finish);
//         this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
//     }

//     restartVisualization() {
//         this.resetGrid();
//     }

//     render() {
//         const { grid, mouseIsPressed, algorithm } = this.state;

//         return (
//             <>
//                 <div style={{ backgroundColor: 'cyan', height: '100vh'}}>
//                     <div>
//                         <button onClick={() => this.visualizeAlgorithm()} style={{ marginTop: '25px', marginBottom: '15px' }}>
//                             Visualize {algorithm.charAt(0).toUpperCase() + algorithm.slice(1)}'s Algorithm
//                         </button>
//                         <select value={algorithm} onChange={(event) => this.handleAlgorithmChange(event)} style={{ marginLeft: '10px' }}>
//                             <option value="dijkstra">Dijkstra</option>
//                             <option value="astar">A*</option>
//                             <option value="dfs">DFS</option>
//                             <option value="bfs">BFS</option>
//                         </select>
//                         <button onClick={() => this.setState({ isSettingStartNode: true, isSettingFinishNode: false })} style={{ marginLeft: '10px' }}>
//                             Set Start Node
//                         </button>
//                         <button onClick={() => this.setState({ isSettingStartNode: false, isSettingFinishNode: true })} style={{ marginLeft: '10px' }}>
//                             Set Finish Node
//                         </button>   
//                         <button onClick={() => this.restartVisualization()} style={{ marginLeft: '10px', marginBottom: '15px' }}>
//                             Restart
//                         </button>
//                     </div>
//                     <div className="grid">
//                         {grid.map((row, rowIdx) => {
//                             return (
//                                 <div key={rowIdx}>
//                                     {row.map((node, nodeIdx) => {
//                                         const { row, col, isFinish, isStart, isWall } = node;
//                                         return (
//                                             <Node
//                                                 key={nodeIdx}
//                                                 col={col}
//                                                 isFinish={isFinish}
//                                                 isStart={isStart}
//                                                 isWall={isWall}
//                                                 mouseIsPressed={mouseIsPressed}
//                                                 onMouseDown={(row, col) => this.handleMouseDown(row, col)}
//                                                 onMouseEnter={(row, col) =>
//                                                     this.handleMouseEnter(row, col)
//                                                 }
//                                                 onMouseUp={() => this.handleMouseUp()}
//                                                 row={row}></Node>
//                                         );
//                                     })}
//                                 </div>
//                             );
//                         })}
//                     </div>
//                 </div>
//             </>
//         );
//     }
// }

// const getInitialGrid = (startNode, finishNode) => {
//     const grid = [];
//     for (let row = 0; row < 20; row++) {
//         const currentRow = [];
//         for (let col = 0; col < 50; col++) {
//             currentRow.push(createNode(col, row, startNode, finishNode));
//         }
//         grid.push(currentRow);
//     }
//     return grid;
// };

// const createNode = (col, row, startNode, finishNode) => {
//     return {
//         col,
//         row,
//         isStart: row === startNode.row && col === startNode.col,
//         isFinish: row === finishNode.row && col === finishNode.col,
//         distance: Infinity,
//         heuristicDistance: 0,
//         isVisited: false,
//         isWall: false,
//         previousNode: null,
//     };
// };

// const getNewGridWithWallToggled = (grid, row, col) => {
//     const newGrid = grid.slice();
//     const node = newGrid[row][col];
//     const newNode = {
//         ...node,
//         isWall: !node.isWall,
//     };
//     newGrid[row][col] = newNode;
//     return newGrid;
// };

// const getNewGridWithStartNode = (grid, row, col) => {
//     const newGrid = grid.map(row => row.map(node => ({ ...node, isStart: false })));
//     newGrid[row][col].isStart = true;
//     return newGrid;
// };

// const getNewGridWithFinishNode = (grid, row, col) => {
//     const newGrid = grid.map(row => row.map(node => ({ ...node, isFinish: false })));
//     newGrid[row][col].isFinish = true;
//     return newGrid;
// };
import React, { Component } from 'react';
import Node from './Node/Node';
import { dijkstra, getNodesInShortestPathOrder } from '../algorithms/dijkstra';
import { aStar } from '../algorithms/astar';
import { dfs } from '../algorithms/dfs';
import { bfs } from '../algorithms/bfs';

import './PathfindingVisualizer.css';

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

export default class PathfindingVisualizer extends Component {
    constructor() {
        super();
        this.state = {
            grid: [],
            mouseIsPressed: false,
            algorithm: 'dijkstra',
            isSettingStartNode: false,
            isSettingFinishNode: false,
            startNode: { row: START_NODE_ROW, col: START_NODE_COL },
            finishNode: { row: FINISH_NODE_ROW, col: FINISH_NODE_COL },
        };
    }

    componentDidMount() {
        const grid = getInitialGrid(this.state.startNode, this.state.finishNode);
        this.setState({ grid });
    }

    handleMouseDown(row, col) {
        const { grid, isSettingStartNode, isSettingFinishNode } = this.state;
        if (isSettingStartNode) {
            const newGrid = getNewGridWithStartNode(grid, row, col);
            this.setState({
                grid: newGrid,
                startNode: { row, col },
                isSettingStartNode: false,
            });
        } else if (isSettingFinishNode) {
            const newGrid = getNewGridWithFinishNode(grid, row, col);
            this.setState({
                grid: newGrid,
                finishNode: { row, col },
                isSettingFinishNode: false,
            });
        } else {
            const newGrid = getNewGridWithWallToggled(grid, row, col);
            this.setState({ grid: newGrid, mouseIsPressed: true });
        }
    }

    handleMouseEnter(row, col) {
        if (!this.state.mouseIsPressed) return;
        const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
        this.setState({ grid: newGrid });
    }

    handleMouseUp() {
        this.setState({ mouseIsPressed: false });
    }

    handleAlgorithmChange(event) {
        this.setState({ algorithm: event.target.value }, this.resetVisited);
    }

    resetGrid() {
        const { grid, startNode, finishNode } = this.state;
        const newGrid = grid.map(row =>
            row.map(node => ({
                ...node,
                distance: Infinity,
                heuristicDistance: 0,
                isVisited: false,
                isShortestPath: false,
                previousNode: null,
                isWall: false,
                isStart: node.row === startNode.row && node.col === startNode.col,
                isFinish: node.row === finishNode.row && node.col === finishNode.col,
            }))
        );
        for (let row of newGrid) {
            for (let node of row) {
                const element = document.getElementById(`node-${node.row}-${node.col}`);
                if (element) {
                    element.className = 'node';
                    if (node.isStart) {
                        element.classList.add('node-start');
                    } else if (node.isFinish) {
                        element.classList.add('node-finish');
                    }
                }
            }
        }

        this.setState({ grid: newGrid });
    }

    resetVisited() {
        const { grid, startNode, finishNode } = this.state;
        const newGrid = grid.map(row =>
            row.map(node => ({
                ...node,
                distance: Infinity,
                heuristicDistance: 0,
                isVisited: false,
                isShortestPath: false,
                previousNode: null,
                isWall: node.isWall,
                isStart: node.row === startNode.row && node.col === startNode.col,
                isFinish: node.row === finishNode.row && node.col === finishNode.col,
            }))
        );
        for (let row of newGrid) {
            for (let node of row) {
                const element = document.getElementById(`node-${node.row}-${node.col}`);
                if (element) {
                    element.className = 'node';
                    if (node.isStart) {
                        element.classList.add('node-start');
                    } else if (node.isFinish) {
                        element.classList.add('node-finish');
                    } else if (node.isWall) {
                        element.classList.add('node-wall');
                    }
                }
            }
        }

        this.setState({ grid: newGrid });
    }

    animate(visitedNodesInOrder, nodesInShortestPathOrder) {
        for (let i = 0; i <= visitedNodesInOrder.length; i++) {
            if (i === visitedNodesInOrder.length) {
                setTimeout(() => {
                    this.animateShortestPath(nodesInShortestPathOrder);
                }, 10 * i);
                return;
            }
            setTimeout(() => {
                const node = visitedNodesInOrder[i];
                if (!node.isStart && !node.isFinish) {
                    document.getElementById(`node-${node.row}-${node.col}`).className =
                        'node node-visited';
                }
            }, 10 * i);
        }
    }

    animateShortestPath(nodesInShortestPathOrder) {
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
            setTimeout(() => {
                const node = nodesInShortestPathOrder[i];
                if (!node.isStart && !node.isFinish) {
                    document.getElementById(`node-${node.row}-${node.col}`).className =
                        'node node-shortest-path';
                }
            }, 50 * i);
        }
    }

    visualizeAlgorithm() {
        const { grid, algorithm, startNode, finishNode } = this.state;
        const start = grid[startNode.row][startNode.col];
        const finish = grid[finishNode.row][finishNode.col];
        let visitedNodesInOrder;

        if (algorithm === 'dijkstra') {
            visitedNodesInOrder = dijkstra(grid, start, finish);
        } else if (algorithm === 'astar') {
            visitedNodesInOrder = aStar(grid, start, finish);
        } else if (algorithm === 'dfs') {
            visitedNodesInOrder = dfs(grid, start, finish);
        } else if (algorithm === 'bfs') {
            visitedNodesInOrder = bfs(grid, start, finish);
        }
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(finish);
        this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
    }

    restartVisualization() {
        this.resetGrid();
    }

    render() {
        const { grid, mouseIsPressed, algorithm } = this.state;

        return (
            <>
                <div style={{ backgroundColor: 'cyan', height: '100vh'}}>
                    <div>
                        <button onClick={() => this.visualizeAlgorithm()} style={{ marginTop: '25px', marginBottom: '15px' }}>
                            Visualize {algorithm.charAt(0).toUpperCase() + algorithm.slice(1)}'s Algorithm
                        </button>
                        <select value={algorithm} onChange={(event) => this.handleAlgorithmChange(event)} style={{ marginLeft: '10px' }}>
                            <option value="dijkstra">Dijkstra</option>
                            <option value="astar">A*</option>
                            <option value="dfs">DFS</option>
                            <option value="bfs">BFS</option>
                        </select>
                        <button onClick={() => this.setState({ isSettingStartNode: true, isSettingFinishNode: false })} style={{ marginLeft: '10px' }}>
                            Set Start Node
                        </button>
                        <button onClick={() => this.setState({ isSettingStartNode: false, isSettingFinishNode: true })} style={{ marginLeft: '10px' }}>
                            Set Finish Node
                        </button>   
                        <button onClick={() => this.restartVisualization()} style={{ marginLeft: '10px', marginBottom: '15px' }}>
                            Restart
                        </button>
                    </div>
                    <div className="grid">
                        {grid.map((row, rowIdx) => {
                            return (
                                <div key={rowIdx}>
                                    {row.map((node, nodeIdx) => {
                                        const { row, col, isFinish, isStart, isWall } = node;
                                        return (
                                            <Node
                                                key={nodeIdx}
                                                col={col}
                                                isFinish={isFinish}
                                                isStart={isStart}
                                                isWall={isWall}
                                                mouseIsPressed={mouseIsPressed}
                                                onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                                                onMouseEnter={(row, col) =>
                                                    this.handleMouseEnter(row, col)
                                                }
                                                onMouseUp={() => this.handleMouseUp()}
                                                row={row}></Node>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </>
        );
    }
}

const getInitialGrid = (startNode, finishNode) => {
    const grid = [];
    for (let row = 0; row < 20; row++) {
        const currentRow = [];
        for (let col = 0; col < 50; col++) {
            currentRow.push(createNode(col, row, startNode, finishNode));
        }
        grid.push(currentRow);
    }
    return grid;
};

const createNode = (col, row, startNode, finishNode) => {
    return {
        col,
        row,
        isStart: row === startNode.row && col === startNode.col,
        isFinish: row === finishNode.row && col === finishNode.col,
        distance: Infinity,
        heuristicDistance: 0,
        isVisited: false,
        isWall: false,
        previousNode: null,
    };
};

const getNewGridWithWallToggled = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
        ...node,
        isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
    return newGrid;
};

const getNewGridWithStartNode = (grid, row, col) => {
    const newGrid = grid.map(row => row.map(node => ({ ...node, isStart: false })));
    newGrid[row][col].isStart = true;
    return newGrid;
};

const getNewGridWithFinishNode = (grid, row, col) => {
    const newGrid = grid.map(row => row.map(node => ({ ...node, isFinish: false })));
    newGrid[row][col].isFinish = true;
    return newGrid;
};