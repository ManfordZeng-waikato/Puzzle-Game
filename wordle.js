window.addEventListener("load", function () {

    // 获取所有按钮元素
    const buttons = document.querySelectorAll('button');

    // 添加按钮点击事件监听器
    buttons.forEach(button => {
        button.addEventListener('click', function () {
            handleKey(button.innerText.toUpperCase());
            // 添加可视化指示
            button.classList.add('active');
            setTimeout(() => {
                button.classList.remove('active');
            }, 200);
        });
    });


    let currentGuess = [];
    // 初始化目标单词
    let targetWord = "";

    // 更新Enter按钮状态
    updateEnterButton();

    // 添加Enter按钮点击事件监听器


    // 获取目标单词
    async function getTargetWord() {
        try {
            const response = await fetch('https://words.trex-sandwich.com/?count=1&length=6');

            if (response.ok) {
                const data = await response.json();
                targetWord = data[0].toUpperCase();
                console.log(`Target word: ${targetWord}`);
                // 更新Enter按钮状态
                updateEnterButton();
            } else {
                console.log(`Failed to fetch target word. Status code: ${response.status}`);
                // 使用默认单词
                targetWord = "TARGET";
            }
        } catch (error) {
            console.error('Error fetching target word:', error);
            targetWord = "TARGET";
        }
    }

    // 更新Enter按钮状态
    function updateEnterButton() {
        const enterButton = document.getElementById("enterButton");
        if (targetWord === "") {
            // 如果目标单词未选择，禁用Enter按钮
            enterButton.disabled = true;
            enterButton.classList.add('disabled');
        } else {
            // 目标单词选择后启用Enter按钮
            enterButton.disabled = false;
            enterButton.classList.remove('disabled');
        }
    }

    // 调用获取目标单词的函数
    getTargetWord();

    function handleKey(key) {
        // 处理按键逻辑
        console.log(`Key pressed: ${key}`);

        // 处理特殊按键逻辑
        if (key === 'BACKSPACE') {
            handleBackspace();
            console.log("Backspace pressed");
        } else if (key === 'ENTER') {


            console.log("Enter pressed");
        } else if (key === 'NEW GAME') {
            console.log("New Game pressed");
        } else if (currentGuess.length < 6 && key !== 'Enter') {
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



    function updateCurrentGuess() {
        let rowIndex = 1;
        const currentGuessDisplay = document.getElementById("guess-row" + rowIndex);
        const charList = currentGuessDisplay.querySelectorAll(".guess-char");
        charList.forEach((charEle, index) => {
            charEle.innerText = currentGuess[index] || "";
        })
    }

})