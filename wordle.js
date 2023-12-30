// 获取所有按钮元素
const buttons = document.querySelectorAll('button');

// 添加按钮点击事件监听器
buttons.forEach(button => {
    button.addEventListener('click', function () {
        handleKey(button.innerText);
        // 添加可视化指示
        button.classList.add('active');
        setTimeout(() => {
            button.classList.remove('active');
        }, 200);
    });
});




let currentGuess = [];


function handleKey(key) {
    // 处理按键逻辑
    console.log(`Key pressed: ${key}`);

    // 处理特殊按键逻辑
    if (key === 'Backspace') {
        handleBackspace();
        console.log("Backspace pressed");
    } else if (key === 'ENTER') {


        console.log("Enter pressed");
    } else if (key === 'ESCAPE') {
        console.log("New Game pressed");
    } else if (currentGuess.length < 6 && key !== 'Backspace' && key !== 'Enter' && key !== 'New Game') {
        // 添加字符到当前猜测
        currentGuess.push(key);
        console.log(currentGuess);
    }
    updateCurrentGuess();
}


function handleBackspace() {
    // 处理退格键逻辑
    if (currentGuess.length > 0) {
        // 移除最后一个字符
        currentGuess.pop();
    }

    // 更新显示的当前猜测
    updateCurrentGuess();
}






// 添加物理键盘事件监听器
document.addEventListener('keydown', function (event) {
    const key = event.key.toUpperCase();

    if ((key >= 'A' && key <= 'Z') || key === 'ENTER' || key === 'BACKSPACE' || key === 'ESCAPE') {
        handleKey(key);

        // 添加可视化指示
        const matchingButton = Array.from(buttons).find(button => button.innerText === key);
        if (matchingButton) {
            matchingButton.classList.add('active');
            setTimeout(() => {
                matchingButton.classList.remove('active');
            }, 200);
        }
    }
});

// 初始化目标单词
let targetWord = "";

// 更新Enter按钮状态


// 添加Enter按钮点击事件监听器
enterButton.addEventListener('click', function () {
    if (targetWord !== "") {
        handleKey('Enter');
    }
});

function updateCurrentGuess() {
    let rowIndex = 1;
    const currentGuessDisplay = document.getElementById("guess-row" + rowIndex);
    const charList = currentGuessDisplay.querySelectorAll(".guess-char");
    charList.forEach((charEle, index) => {
        charEle.innerText = currentGuess[index] || "";
    })
}