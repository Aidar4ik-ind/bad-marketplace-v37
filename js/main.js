// Общие функции для всего сайта
document.addEventListener('DOMContentLoaded', function() {
    // Обновляем счетчик корзины
    updateCartCounter();
    
    // Инициализируем поиск если есть
    if (document.getElementById('searchInput')) {
        initSearch();
    }
    
    // Инициализируем фильтры если есть
    if (document.getElementById('filterTags')) {
        initFilters();
    }
    
    // Добавляем обработчики для кнопок добавления в корзину
    document.addEventListener('click', function(e) {
        if (e.target.closest('.add-to-cart-btn')) {
            const button = e.target.closest('.add-to-cart-btn');
            const productId = parseInt(button.getAttribute('data-id'));
            if (productId && window.cart) {
                window.cart.add(productId);
                e.preventDefault();
                e.stopPropagation();
            }
        }
    });
});

// Инициализация поиска
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const query = e.target.value.trim();
            if (query.length >= 2 || query.length === 0) {
                filterProducts(query);
            }
        });
    }
}

// Инициализация фильтров
function initFilters() {
    const allProducts = Products.getAll();
    
    // Собираем все уникальные теги из всех продуктов
    const allTags = new Set();
    allProducts.forEach(product => {
        product.tags.forEach(tag => allTags.add(tag));
    });
    
    const container = document.getElementById('filterTags');
    
    if (!container) return;
    
    // Очищаем контейнер
    container.innerHTML = '';
    
    // Создаем кнопки для каждого тега
    Array.from(allTags).forEach(tag => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'btn btn-outline-secondary btn-sm me-2 mb-2';
        button.textContent = tag;
        button.onclick = () => filterByTag(tag);
        container.appendChild(button);
    });
    
    // Кнопка сброса
    const resetBtn = document.createElement('button');
    resetBtn.type = 'button';
    resetBtn.className = 'btn btn-outline-danger btn-sm mb-2';
    resetBtn.textContent = 'Сбросить все';
    resetBtn.onclick = () => {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) searchInput.value = '';
        displayAllProducts();
        
        // Сбрасываем активные кнопки
        document.querySelectorAll('#filterTags .btn').forEach(btn => {
            btn.classList.remove('active');
        });
    };
    container.appendChild(resetBtn);
}

// Фильтрация продуктов
function filterProducts(query) {
    const products = Products.getAll();
    const container = document.getElementById('catalogContainer');
    
    if (!container) return;
    
    if (!query) {
        displayAllProducts();
        return;
    }
    
    const filtered = Products.search(query);
    renderProducts(filtered, container);
}

// Фильтрация по тегу
function filterByTag(tag) {
    const products = Products.getByTag(tag);
    const container = document.getElementById('catalogContainer');
    
    if (container) {
        renderProducts(products, container);
        
        // Показываем активный тег
        document.querySelectorAll('#filterTags .btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.textContent === tag) {
                btn.classList.add('active');
            }
        });
    }
}

// Показать все продукты
function displayAllProducts() {
    const products = Products.getAll();
    const container = document.getElementById('catalogContainer');
    
    if (container) {
        renderProducts(products, container);
        
        // Обновляем счетчик товаров
        const productsCount = document.getElementById('productsCount');
        if (productsCount) {
            productsCount.textContent = products.length;
        }
        
        // Сбрасываем активные кнопки
        document.querySelectorAll('#filterTags .btn').forEach(btn => {
            btn.classList.remove('active');
        });
    }
}

// Рендер продуктов
function renderProducts(products, container) {
    if (!container) return;
    
    if (products.length === 0) {
        container.innerHTML = `
            <div class="col-12 text-center py-5">
                <div class="alert alert-info">
                    <i class="bi bi-info-circle"></i>
                    <h5>Товары не найдены</h5>
                    <p>Попробуйте изменить поисковый запрос или выберите другой фильтр</p>
                </div>
            </div>
        `;
        // Обновляем счетчик товаров
        const productsCount = document.getElementById('productsCount');
        if (productsCount) {
            productsCount.textContent = '0';
        }
        return;
    }
    
    // Обновляем счетчик товаров
    const productsCount = document.getElementById('productsCount');
    if (productsCount) {
        productsCount.textContent = products.length;
    }
    
    container.innerHTML = products.map(product => `
        <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
            <div class="product-card h-100">
                <a href="product-details.html?id=${product.id}" class="text-decoration-none text-dark">
                    <div class="position-relative">
                        <img src="${product.image}" 
                             class="card-img-top" 
                             alt="${product.name}"
                             style="height: 200px; object-fit: cover;">
                    </div>
                    <div class="p-3">
                        <h6 class="card-title fw-bold mb-2">${product.name}</h6>
                        <p class="card-text text-muted small mb-3">${product.description}</p>
                        
                        <!-- ТЕГИ ЧЕРЕЗ ПРОБЕЛЫ -->
                        <div class="mb-3">
                            ${product.tags.slice(0, 3).map(tag => 
                                `<span class="badge-tag">${tag}</span>`
                            ).join('')}
                        </div>
                    </div>
                </a>
                <div class="px-3 pb-3">
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="fw-bold text-primary h5 mb-0">${product.price} ₽</span>
                        <button class="btn btn-sm btn-primary add-to-cart-btn" 
                                data-id="${product.id}">
                            <i class="bi bi-cart-plus"></i> В корзину
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Делаем функции глобальными
window.filterProducts = filterProducts;
window.filterByTag = filterByTag;
window.displayAllProducts = displayAllProducts;
window.renderProducts = renderProducts;

// Обновление счетчика корзины
window.updateCartCounter = function() {
    if (window.cart && cart.updateCounter) {
        cart.updateCounter();
    }
};