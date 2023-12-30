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