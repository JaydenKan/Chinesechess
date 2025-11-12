// 增加迭代加深搜索
AI.iterativeSearch = function (map, my) {
    var timeOut = 3000; // 3秒超时
    var initDepth = 1;
    var maxDepth = 8;
    AI.treeDepth = 0;
    var initTime = new Date().getTime();
    var bestMove = null;
    
    for (var i = initDepth; i <= maxDepth; i++) {
        var nowTime = new Date().getTime();
        if (nowTime - initTime > timeOut) {
            break; // 超时退出
        }
        
        AI.treeDepth = i;
        var val = AI.getAlphaBeta(-99999, 99999, AI.treeDepth, map, my);
        
        if (val && val.value != -8888) {
            bestMove = val;
        } else {
            break; // 搜索失败，使用上一深度的结果
        }
    }
    return bestMove;
};

// 优化Alpha-Beta搜索，增加着法排序
AI.getAlphaBeta = function (A, B, depth, map, my) {
    if (depth == 0) {
        return {"value": AI.evaluate(map, my)};
    }
    
    var moves = AI.getMoves(map, my);
    
    // 着法排序：吃子着法优先
    moves = AI.sortMoves(moves, map);
    
    for (var i = 0; i < moves.length; i++) {
        // ... 原有移动逻辑
        
        // 静态搜索优化：在叶子节点进行浅层搜索吃子序列
        if (depth == 1 && Math.abs(val.value) < 9000) {
            var quiesceVal = AI.quiescenceSearch(A, B, map, -my);
            if (quiesceVal) val.value = quiesceVal.value;
        }
    }
    return bestMove;
};

// 静态搜索（Quiescence Search）
AI.quiescenceSearch = function (A, B, map, my) {
    var standPat = AI.evaluate(map, my);
    
    if (standPat >= B) return {"value": B};
    if (standPat > A) A = standPat;
    
    var captures = AI.getCaptureMoves(map, my);
    captures = AI.sortMoves(captures, map);
    
    for (var i = 0; i < captures.length; i++) {
        // 只搜索吃子着法
        var move = captures[i];
        // ... 执行移动和递归搜索
    }
    
    return {"value": A};
};
