document.addEventListener("DOMContentLoaded", () => {
    const productList = document.getElementById("product-list");
    const modal = document.getElementById("modal");
    const closeButton = modal.querySelector(".close-button");

    // Перечень товаров (можно дополнять новыми позициями)
    const products = [
        {
            id: 1,
            name: "Комплект нижнего белья",
            description: "Красивый и современый комплект из хлопка.",
            imageURL: "./image/комплект_нижнего_белья.jpg"
        },
        {
            id: 2,
            name: "Сумка",
            description: "Прочная сумка из натуральной кожи.",
            imageURL: "https://via.placeholder.com/150"
        },
        // Можете добавлять ещё товары аналогичным способом
    ];

    // Генерация карточек товаров
    products.forEach(product => {
        const li = document.createElement("li");
        li.className = "product-item";
        li.innerHTML = `<img class="product-img" src="${product.imageURL}" alt="${product.name}"><h3>${product.name}</h3>`;
        productList.appendChild(li);

        // Обработка клика по товару
        li.addEventListener("click", () => {
            modal.style.display = "flex"; // Показываем модальное окно
            modal.querySelector("h2").innerText = product.name;
            modal.querySelector("p").innerText = product.description;
        });
    });

    // Закрытие модального окна
    closeButton.addEventListener("click", () => {
        modal.style.display = "none";
    });
});
// Проверка, можно ли установить PWA
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    
    // Можно показать кнопку "Установить приложение"
    // Например, добавить кнопку в header
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