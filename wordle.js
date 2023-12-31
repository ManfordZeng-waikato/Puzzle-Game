window.addEventListener("load", function () {
    let currentGuess = [];
    let guesses = []; // 存储玩家猜测的数组

    function handleKey(key) {
        // 处理按键逻辑
        // console.log(`Key pressed: ${key}`);

        // 处理特殊按键逻辑
        if (key === 'BACKSPACE') {
            handleBackspace();
            // console.log("Backspace pressed");
        } else if (key === 'ENTER') {
            submitGuess();

            guesses.push(currentGuess);
            currentGuess = [];
            console.log("Enter pressed");
        } else if (key === 'NEW GAME') {
            console.log("New Game pressed");
        } else if (currentGuess.length < 6 && (key >= 'A' && key <= 'Z')) {
            // 添加字符到当前猜测
            currentGuess.push(key);
            updateEnterButton();
            console.log(currentGuess);
        }
        updateCurrentGuess();
    }

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

    // 添加物理键盘事件监听器
    document.addEventListener('keydown', function (event) {
        const key = event.key.toUpperCase();

        const physicalKeyValue = event.key;
        const correspondingVirtualKey = getCorrespondingVirtualKey(physicalKeyValue);
        if (correspondingVirtualKey) {
            addVisualIndication(correspondingVirtualKey);
        }

        if ((key.length === 1 && key >= 'A' && key <= 'Z') || key === 'ENTER' || key === 'BACKSPACE' || key === 'ESCAPE') {
            handleKey(key);
        }
    });


    function getCorrespondingVirtualKey(physicalKeyValue) {
        return physicalKeyValue; //全部大写
    }


    function addVisualIndication(keyValue) {
        // 选择具有特定数据属性的元素
        const keyElement = document.querySelector(`[data-key="${keyValue}"]`);


        // 检查元素是否存在
        if (keyElement) {
            // 定义颜色常量
            const indicationColor = "#256"; // 可以根据需要调整颜色

            // console.log("Element found:", keyElement); // 添加这一行控制台检查

            // 添加视觉指示
            keyElement.style.backgroundColor = indicationColor;

            // 在200毫秒后恢复背景颜色
            setTimeout(() => {
                // 在闭包中使用 keyElement
                keyElement.style.backgroundColor = "";
            }, 200);
        } else {
            console.error(`Can NOT find ${keyValue} element`);
        }
    }


    // 初始化目标单词
    let targetWord = "";

    // 更新Enter按钮状态
    updateEnterButton();


    getTargetWord();
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
        if (targetWord === "" || currentGuess.length != 6) {

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


    function handleBackspace() {
        // 处理退格键逻辑
        if (currentGuess.length > 0) {
            // 移除最后一个字符
            currentGuess.pop();
        }
        updateEnterButton();
    }

    function updateCurrentGuess() {
        let rowIndex = guesses.length + 1;
        const currentGuessDisplay = document.getElementById("guess-row" + rowIndex);
        const charList = currentGuessDisplay.querySelectorAll(".guess-char");
        charList.forEach((charEle, index) => {
            charEle.innerText = currentGuess[index] || "";
        })

    }


    function submitGuess() {

        validateGuess(currentGuess).then(isValid => {

            if (isValid) {
                console.log('Valid guess:', currentGuess.join(''));
                displayGuess(currentGuess);
                currentGuess = [];
            } else {
                shakeAnimation();
            }

        });
    }

    async function validateGuess(guess) {
        let guessCopy = guess.slice();
        const guessString = guessCopy.join('');

        try {
            const response = await fetch(`https://words.trex-sandwich.com/${guessString}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log('Response data:', data); // 用于调试

            return data.valid;
        } catch (error) {
            console.error('Error fetching word validation:', error);
            return false;
        }
    }

    function shakeAnimation() {
        const guessArea = document.querySelector('#guess-row1'); // 替换为您的猜测显示区域的选择器
        // console.log(guessArea);
        guessArea.classList.add('shake-animation');

        // 动画完成后移除类，以便将来可以再次触发动画
        setTimeout(() => {
            guessArea.classList.remove('shake-animation');
        }, 300); // 500毫秒是动画持续时间
    }


    function displayGuess(guess) {
        console.log(guess);
        console.log(guesses);
        let index = guesses.length - 1;
        console.log(index);
        let rows = document.getElementsByClassName("guess-row");
        let row = rows[index];
        let chars = row.getElementsByClassName("guess-char");
        let guessCopy = guess.slice();
        for (let i = 0; i < chars.length; i++) {
            let char = chars[i];
            char.classList.add(getLetterClass(guessCopy[i], i));
        }

        // updateKeyboardKeyColor();

    }


    function getLetterClass(letter, index) {
        if (targetWord[index] === letter) {
            return 'correct-letter'; // 字母正确且位置正确
        } else if (targetWord.includes(letter)) {
            return 'present-letter'; // 字母正确但位置不正确
        } else {
            return 'absent-letter'; // 字母不在目标单词中
        }
    }





})