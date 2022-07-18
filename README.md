# 8queen-puzzle
八皇后解法

-- 以4皇后做解說：
-- [0,0,0,0],
-- [0,0,0,0],
-- [0,0,0,0],
-- [0,0,0,0]


以下是4皇后的其中解法
[-,Q,-,-],
[-,-,-,Q],
[Q,-,-,-],
[-,-,Q,-]

每一行基本上可以存在一個皇后所以可以寫成
[-,Q,-,-]|  F[0] = 1;
[-,-,-,Q]|  F[1] = 3;
[Q,-,-,-]|  F[2] = 0;
[-,-,Q,-]|  F[3] = 2;

所以可以得到一個陣列 F = [1,3,0,2];

F的index 可以代表行(Y軸)
F的value 可以代表列(X軸)

定義len為輸入長度 陣列為 len x len

// 所以我們可以很簡單的宣告一個陣列來代表最終皇后放置的位置
```
cosnt board = Array(len).fill(0);
```

然後現在要開始枚舉可能可以放置的位置：
1. 下一個皇后，不能出現在同一行，因為現在。 F index 已經定義了每行，所以行不會有重複的情形
2. 下一個皇后，不能出現在同一列。 所以 F[curIdx] !== F[i]
3. 下一個皇后，不在同一對左角線：a[curIdx]-a[i] != ni
4. 下一個皇后，不在同一右對角線：a[curIdx]-a[i] != -(ni)
約束條件三和四可以合併為abs(a[curIdx]-a[i]) != abs(curIdx - i)


// 所以只要能確定目前F[curIdx]，是否可以被放置，這樣依序確認則可得到解法
```
  function isCorrectPlace(curIdx) {
    for (let i = 0; i < curIdx; ++i) {
      if (
        board[i] === board[curIdx] ||
        Math.abs(i - curIdx) === Math.abs(board[i] - board[curIdx])
      ) return false;
    }
    return true;
  }

```


