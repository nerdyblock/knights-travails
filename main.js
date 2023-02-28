function moveUp(src, graph) {
    const [r, c] = src;

    moveUpInboundRow = r - 2 >=0 && r - 2 < 8;
    moveUpRightInboundCol = c + 1 >=0 && c + 1 < 8;
    moveUpLeftInboundCol = c - 1 >=0 && c - 1 < 8;

    if(!(moveUpInboundRow)) return;

    if(moveUpRightInboundCol) {
        graph[src].push([r-2, c+1]);
    }

    if(moveUpLeftInboundCol) {
        graph[src].push([r-2, c-1]);
    }

    return graph;
}

function moveDown(src, graph) {
    const [r, c] = src;

    moveDownInboundRow = r +2 >=0 && r +2 < 8;
    moveDownRightInboundCol = c + 1 >=0 && c + 1 < 8;
    moveDownLeftInboundCol = c - 1 >=0 && c - 1 < 8;

    if(!(moveDownInboundRow)) return;

    if(moveDownRightInboundCol) {
        graph[src].push([r+2, c+1]);
    }

    if(moveDownLeftInboundCol) {
        graph[src].push([r+2, c-1]);
    }

    return graph;
}

function moveLeft(src, graph) {
    const [r, c] = src;

    moveLeftInboundCol = c - 2 >=0 && c - 2 < 8;
    moveleftUpInboundRow = r -1 >=0 && r-1 < 8;
    moveleftDownInboundRow = r+1 >=0 && r+1 < 8;

    if(!(moveLeftInboundCol)) return;

    if(moveleftUpInboundRow) {
        graph[src].push([r-1, c-2]);
    }

    if(moveleftDownInboundRow) {
        graph[src].push([r+1, c-2]);
    }

    return graph;
}

function moveRight(src, graph) {
    const [r, c] = src;

    moveRightInboundCol = c + 2 >=0 && c + 2 < 8;
    moveRightUpInboundRow = r -1 >=0 && r-1 < 8;
    moveRightDownInboundRow = r+1 >=0 && r+1 < 8;

    if(!(moveRightInboundCol)) return;

    if(moveRightUpInboundRow) {
        graph[src].push([r-1, c+2]);
    }

    if(moveRightDownInboundRow) {
        graph[src].push([r+1, c+2]);
    }

    return graph;
}

function buildGraph(src, graph={}) {
    const [r, c] = src;

    if(src  in graph) return;

    const rowInbound = r >=0 && r < 8;
    const colInbound = c >=0 && c < 8;

    if(!rowInbound && !colInbound) return;
    graph[src] = [];

    moveUp(src, graph);
    moveDown(src, graph);
    moveLeft(src, graph);
    moveRight(src, graph);

    for(let item of graph[src]) {
        buildGraph(item, graph);
    }

    return graph;
}

function findShortestPath(src, dst) {
    const graph = buildGraph(src);
    const visited = new Set([src]);
    const [r, c] = dst;
    const destPos = r + ', ' + c
    const queue = [[src, [src]]];

    while(queue.length > 0) {
        const [node, path] = queue.shift();
        const [r , c] = node;
        const pos = r + ', ' + c;

        if(pos === destPos) return path;   

        for(let neighbor of graph[node]) {
            if(!visited.has(neighbor)) {
                visited.add((neighbor));
                queue.push([neighbor, [...path, [...neighbor]]]);
            }
        }
    }

    return -1;
}

console.log(findShortestPath([4,3], [1,5]))
