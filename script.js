document.addEventListener("DOMContentLoaded", () => {
    // === Приветственное окно ===
    const welcomeModal = document.getElementById("welcome-modal");
    const startButton = document.getElementById("start-button");

    // Показываем окно только при первом заходе
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
            imageURL: "./image/комплект_нижнего_белья_1.jpg"
        },
        {
            id: 2,
            name: "Футболка оверсайз с сакурой",
            description: "Футболка оверсайз из хлопка, светящийся принт сакура.",
            imageURL: "./image/Футболка_1.jpg"
        },
        {
            id: 3,
            name: "Браслет с ракушкой и звездами y2k безмоаморный",
            description: "Украшение, содердащее эластичную резинку, которая позволит украшению подходить на размер руки от 16 до 21 см.",
            imageURL: "./image/браслет.jpg"
        },
        {
            id: 4,
            name: "Кольцо аниме манга Евангелион",
            description: "Кольцо Копьё Лонгина Евангелион, аниме манга, серебристый цвет, бижутерный сплав.",
            imageURL: "./image/кольцо.jpg"
        },
        {
            id: 5,
            name: "Ночник Геймпад (джостик)",
            description: "Светящийся ночник в форме геймпада, USB-питание.",
            imageURL: "./image/ночник.jpg"
        },
        {
            id: 6,
            name: "Спортивные штаны женские",
            description: "Спортивные широкие штаны бежевого цвета с карманами. Идеально подходят для прогулки летом.",
            imageURL: "./image/штаны_жен.jpg"
        }
    ];

    products.forEach((product, index) => {
        const li = document.createElement("li");
        li.className = "product-item";
        li.innerHTML = `
            <img class="product-img" src="${product.imageURL}" alt="${product.name}">
            <h3>${product.name}</h3>
        `;
        productList.appendChild(li);
        li.style.animationDelay = `${index * 0.1}s`;

        li.addEventListener("click", () => {
            modal.querySelector("h2").innerText = product.name;
            modal.querySelector("p").innerText = product.description;
            modal.style.display = "flex";
        });
    });

    // Закрытие модального окна
    closeButton.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // === PWA Установка ===
    let deferredPrompt;

    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;

        const installButton = document.createElement('button');
        installButton.textContent = 'Установить как приложение';
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
                    console.log('Пользователь установил приложение Pink Elephant');
                }
                deferredPrompt = null;
            });
        });
        document.body.appendChild(installButton);
    });
});