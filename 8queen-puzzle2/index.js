const output = document.getElementById('output');

// 棋盤八皇后姊姊解法
function solveNQueens(len) {
  // len = 1 時,返回[Q]
  if (len === 1) return [['Q']];
  // len = 2,3 時, 無解
  if (len < 4) return [];

  const solutions = [];

  // 紀錄棋盤上最後每行只有一個皇后的位置, 一開始先預設從0開始
  const board = Array(len).fill(0);
  let rowIdx = 0;

  // 如果 board[0] 超出 len，表示用盡了所有可能性
  while (board[0] < len) {

    // 若是該行都已經找到等於len時，代表已經找不到皇后可以放置的位置
    if (board[rowIdx] === len) {
      board[rowIdx] = 0; // 該行回復為0
      rowIdx -= 1; // 退回前一行
      board[rowIdx] += 1; // 並該行 +1 d繼續查找
      continue;
    }

    if (isCorrectPlace(rowIdx)) {
      rowIdx += 1; // 如果是可放置位置就找到正確的皇后位置，rowInx 可繼續往下走
    } else {
      board[rowIdx] += 1; // 如果該位置皇后不可以放置，則皇后位置在+1
    }

    // 如果我們的 rowIdx 達到 len，我們就有一個有效的解決方案。
    if (rowIdx === len) {
      solutions.push(JSON.stringify(board));

      // 重置最後一行，然後向後移動 2 行並增加該列的值。
      board[rowIdx - 1] = 0;
      rowIdx -= 2;
      board[rowIdx] +=1;
    }
  }

  return solutions;

  /**
   * 判斷是否為可放置位置
   * 1.不在同一列：a[curIdx]!=a[i]
   * 2.不在同一行：因為現在是每一行求一個皇后的位置，所以同一行不會有衝突，不需要考慮。
   * 3.不在同一對左角線：a[curIdx]-a[i] != ni
   * 4.不在同一右對角線：a[curIdx]-a[i] != -(ni)
   * 約束條件三和四可以合併為abs(a[curIdx]-a[i]) != abs(curIdx - i)
   */
  function isCorrectPlace(curIdx) {
    for (let i = 0; i < curIdx; ++i) {
      if (
        board[i] === board[curIdx] ||
        Math.abs(i - curIdx) === Math.abs(board[i] - board[curIdx])
      ) return false;
    }
    return true;
  }

  function createSolution(board) {
    const solution = Array(len); 
    for (let i = 0; i < board.length; ++i) {
      solution[i] = '.'.repeat(board[i]) + 'Q' + '.'.repeat(len - board[i] - 1);
    }
    return solution;
  }
}

const eightQueen = solveNQueens(8);
console.log('Ans:', eightQueen);

output.innerHTML = eightQueen.map((item, idx) => {
  const board = JSON.parse(item);
  const solution = Array(8); 
    for (let i = 0; i < board.length; ++i) {
      solution[i] = '<span>.</span>'.repeat(board[i]) + '<span>Q</span>' + '<span>.</span>'.repeat(8 - board[i] - 1);
    }
    return 'Asn:' + (idx + 1) + '</br>' + solution.join('</br>');
}).join('</br></br></br>');
