// Performs A* algorithm; returns all nodes in the order they were visited.
// Also makes nodes point back to their previous node, allowing for path reconstruction.
export function aStar(grid, startNode, finishNode) {
    const visitedNodesInOrder = [];
    startNode.distance = 0;
    startNode.heuristicDistance = calculateHeuristicDistance(startNode, finishNode);
    const unvisitedNodes = getAllNodes(grid);
    while (!!unvisitedNodes.length) {
        sortNodesByEstimatedDistance(unvisitedNodes);
        const closestNode = unvisitedNodes.shift();
        // If we encounter a wall, we skip it.
        if (closestNode.isWall) continue;
        // If the closest node is at a distance of infinity,
        // we must be trapped and should therefore stop.
        if (closestNode.distance === Infinity) return visitedNodesInOrder;
        closestNode.isVisited = true;
        visitedNodesInOrder.push(closestNode);
        if (closestNode === finishNode) return visitedNodesInOrder;
        updateUnvisitedNeighbors(closestNode, grid, finishNode);
    }
}

function sortNodesByEstimatedDistance(unvisitedNodes) {
    unvisitedNodes.sort((nodeA, nodeB) => {
        const fA = nodeA.distance + nodeA.heuristicDistance;
        const fB = nodeB.distance + nodeB.heuristicDistance;
        return fA - fB;
    });
}

function updateUnvisitedNeighbors(node, grid, finishNode) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
        const distance = node.distance + 1;
        if (distance < neighbor.distance) {
            neighbor.distance = distance;
            neighbor.heuristicDistance = calculateHeuristicDistance(neighbor, finishNode);
            neighbor.previousNode = node;
        }
    }
}

function calculateHeuristicDistance(node, finishNode) {
    const dx = Math.abs(node.row - finishNode.row);
    const dy = Math.abs(node.col - finishNode.col);
    return dx + dy; // Manhattan distance
}

function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const { col, row } = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isVisited);
}

function getAllNodes(grid) {
    const nodes = [];
    for (const row of grid) {
        for (const node of row) {
            nodes.push(node);
        }
    }
    return nodes;
}

// Backtracks from the finishNode to find the shortest path.
// Only works when called *after* the A* method above.
export function getNodesInShortestPathOrder(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
        nodesInShortestPathOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
}
