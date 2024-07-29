export function bfs(grid, startNode, finishNode) {
    const visitedNodesInOrder = [];
    const queue = [];
    queue.push(startNode);
    startNode.isVisited = true;

    while (queue.length > 0) {
        const currentNode = queue.shift();
        visitedNodesInOrder.push(currentNode);

        if (currentNode === finishNode) return visitedNodesInOrder;

        const neighbors = getNeighbors(currentNode, grid);
        for (const neighbor of neighbors) {
            if (!neighbor.isVisited && !neighbor.isWall) {
                neighbor.isVisited = true;
                neighbor.previousNode = currentNode;
                queue.push(neighbor);
            }
        }
    }

    return visitedNodesInOrder;
}

function getNeighbors(node, grid) {
    const neighbors = [];
    const { row, col } = node;

    if (row > 0) neighbors.push(grid[row - 1][col]); // Top
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]); // Bottom
    if (col > 0) neighbors.push(grid[row][col - 1]); // Left
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]); // Right

    return neighbors;
}
