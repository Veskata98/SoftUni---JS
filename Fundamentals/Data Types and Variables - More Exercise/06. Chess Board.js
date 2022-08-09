function chessBoard(size) {
    let chess = '<div class="chessboard">';
    for (let i = 1; i <= size; i++) {
        let index = 1;
        chess += `\n  <div>`;
        if (i % 2 !== 0) {
            while (index <= size) {
                if (index % 2 !== 0) {
                    chess += `\n    <span class="black"></span>`;
                } else {
                    chess += `\n    <span class="white"></span>`;
                }
                index++;
            }
        } else {
            while (index <= size) {
                if (index % 2 !== 0) {
                    chess += `\n    <span class="white"></span>`;
                } else {
                    chess += `\n    <span class="black"></span>`;
                }
                index++;
            }
        }
        chess += `\n  </div>`;
    }
    chess += '\n</div>';
    console.log(chess);
}
