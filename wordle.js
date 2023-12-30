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

function handleKey(key) {
    // 处理按键逻辑
    console.log(`Key pressed: ${key}`);

    // 处理特殊按键逻辑
    if (key === 'BACKSPACE') {
        console.log("Backspace pressed");
    } else if (key === 'ENTER') {
        console.log("Enter pressed");
    } else if (key === 'ESCAPE') {
        console.log("New Game pressed");
    }
}

const enterButton = document.querySelector('#row4 button:nth-child(2)');

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
updateEnterButton();

// 添加Enter按钮点击事件监听器
enterButton.addEventListener('click', function () {
    if (targetWord !== "") {
        handleKey('ENTER');
    }
});

// 获取目标单词
async function getTargetWord() {
    const response = await fetch('https://words.trex-sandwich.com/api/words', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        // 设置查询参数，length指定单词长度为6
        // 如果请求失败，使用默认单词"TARGET"
        // 注意：在实际应用中，需要处理网络请求失败的情况
        // 另外，这个API可能会有使用限制，请查看文档了解详情
        // 在实际应用中，可能需要注册API密钥
        // https://words.trex-sandwich.com/api/docs
        // 这里我们仅用于演示目的，不考虑API密钥和错误处理
        url: `https://words.trex-sandwich.com/api/words?count=1&length=6`,
    });

    if (response.ok) {
        const data = await response.json();
        targetWord = data[0];
        console.log(`Target word: ${targetWord}`);
        // 更新Enter按钮状态
        updateEnterButton();
    } else {
        console.log('Failed to fetch target word. Using default word "TARGET".');
        targetWord = "TARGET";
    }
}

// 更新Enter按钮状态
function updateEnterButton() {
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

// 初始化目标单词
getTargetWord();