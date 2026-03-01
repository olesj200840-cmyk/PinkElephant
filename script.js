document.addEventListener("DOMContentLoaded", () => {
    // === Приветственное окно ===
    const welcomeModal = document.getElementById("welcome-modal");
    const startButton = document.getElementById("start-button");

    // Показываем окно только при первом заходе в сессии
    if (!sessionStorage.getItem("visited")) {
        welcomeModal.style.display = "flex";
        sessionStorage.setItem("visited", "true");
    }

    startButton.addEventListener("click", () => {
        welcomeModal.style.display = "none";
    });

    // === Список товаров и модальное окно ===
    const productList = document.getElementById("product-list");
    const modal = document.getElementById("modal");
    const closeButton = modal.querySelector(".close-button");

    const products = [
        {
            id: 1,
            name: "Комплект нижнего белья",
            description: "Красивый и современный комплект из хлопка.",
            imageURL: "./image/комплект_нижнего_белья.jpg"
        },
        {
            id: 2,
            name: "Сумка",
            description: "Прочная сумка из натуральной кожи.",
            imageURL: "https://via.placeholder.com/150"
        }
    ];

    // Генерация карточек товаров
    products.forEach(product => {
        const li = document.createElement("li");
        li.className = "product-item";
        li.innerHTML = `
            <img class="product-img" src="${product.imageURL}" alt="${product.name}">
            <h3>${product.name}</h3>
        `;
        productList.appendChild(li);

        li.addEventListener("click", () => {
            modal.style.display = "flex";
            modal.querySelector("h2").innerText = product.name;
            modal.querySelector("p").innerText = product.description;
        });
    });

    // Закрытие модального окна с товаром
    closeButton.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // === PWA Установка ===
    let deferredPrompt;

    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;

        const installButton = document.createElement('button');
        installButton.textContent = 'Установить приложение';
        installButton.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            padding: 10px 20px;
            background: #ff69b4;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            z-index: 100;
        `;
        installButton.addEventListener('click', () => {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('Пользователь установил приложение');
                }
                deferredPrompt = null;
            });
        });
        document.body.appendChild(installButton);
    });
});