// Управление корзиной с синхронизацией между вкладками
class Cart {
    constructor() {
        this.storageKey = 'bad_marketplace_cart';
        this.load();
        
        // Слушаем события синхронизации от других вкладок
        window.addEventListener('storage', (e) => {
            if (e.key === this.storageKey) {
                this.load();
                this.updateCounter();
                // Обновляем отображение если на странице корзины
                if (window.location.pathname.includes('cart.html')) {
                    this.renderCart();
                }
            }
        });
    }
    
    // Загрузить из localStorage
    load() {
        try {
            const data = localStorage.getItem(this.storageKey);
            this.items = data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Ошибка загрузки корзины:', error);
            this.items = [];
        }
    }
    
    // Сохранить в localStorage и оповестить другие вкладки
    save() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.items));
        localStorage.setItem('cart_updated', Date.now().toString()); // Триггер для других вкладок
        
        // Обновляем счетчик сразу
        this.updateCounter();
    }
    
    // Добавить товар
    add(productId, quantity = 1) {
        const product = Products.getById(productId);
        if (!product) {
            this.showNotification('Товар не найден', 'danger');
            return;
        }
        
        const existing = this.items.find(item => item.id === productId);
        
        if (existing) {
            existing.quantity += quantity;
            this.showNotification(`Количество "${product.name}" увеличено`, 'info');
        } else {
            this.items.push({
                id: productId,
                quantity: quantity,
                addedAt: new Date().toISOString()
            });
            this.showNotification(`"${product.name}" добавлен в корзину`, 'success');
        }
        
        this.save();
        return this.items;
    }
    
    // Удалить товар
    remove(productId) {
        const product = Products.getById(productId);
        this.items = this.items.filter(item => item.id !== productId);
        this.save();
        
        if (product) {
            this.showNotification(`"${product.name}" удален из корзины`, 'info');
        }
        return this.items;
    }
    
    // Изменить количество
    update(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            if (quantity <= 0) {
                this.remove(productId);
            } else {
                item.quantity = quantity;
                this.save();
            }
        }
        return this.items;
    }
    
    // Очистить корзину
    clear() {
        this.items = [];
        this.save();
        this.showNotification('Корзина очищена', 'info');
        return this.items;
    }
    
    // Получить все товары с деталями
    getItemsWithDetails() {
        const products = Products.getAll();
        return this.items.map(item => {
            const product = products.find(p => p.id === item.id);
            return {
                ...item,
                product: product || null,
                total: product ? product.price * item.quantity : 0
            };
        }).filter(item => item.product !== null);
    }
    
    // Получить количество товаров
    getCount() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }
    
    // Получить итоговую сумму
    getTotal() {
        const items = this.getItemsWithDetails();
        return items.reduce((total, item) => total + item.total, 0);
    }
    
    // Обновить счетчик в UI
    updateCounter() {
        const counters = document.querySelectorAll('#cartCounter, .cart-counter');
        const count = this.getCount();
        
        counters.forEach(counter => {
            counter.textContent = count;
            // Показываем бейдж только если есть товары
            if (counter.id === 'cartCounter') {
                counter.style.display = count > 0 ? 'inline-block' : 'none';
            }
        });
        
        // Обновляем общее количество на странице корзины
        const totalItemsEl = document.getElementById('totalItems');
        if (totalItemsEl) {
            totalItemsEl.textContent = count;
        }
    }
    
    // Рендер корзины (для cart.html)
    renderCart() {
        if (!document.getElementById('cartContainer')) return;
        
        const items = this.getItemsWithDetails();
        
        if (items.length === 0) {
            document.getElementById('cartContainer').style.display = 'none';
            document.getElementById('emptyCart').style.display = 'flex';
            return;
        }
        
        document.getElementById('cartContainer').style.display = 'block';
        document.getElementById('emptyCart').style.display = 'none';
        
        let total = this.getTotal();
        let html = `
            <div class="row">
                <div class="col-lg-8">
                    <div class="card border-0 shadow-sm mb-4">
                        <div class="card-body">
                            <h4 class="card-title mb-4">
                                <i class="bi bi-bag-check me-2"></i>Товары в корзине
                            </h4>
        `;
        
        items.forEach(item => {
            html += `
                <div class="cart-item mb-4 pb-4 border-bottom">
                    <div class="row align-items-center">
                        <div class="col-md-2 col-4">
                            <a href="product-details.html?id=${item.product.id}">
                                <img src="${item.product.image}" 
                                     class="img-fluid rounded" 
                                     alt="${item.product.name}"
                                     style="height: 80px; width: 80px; object-fit: cover;">
                            </a>
                        </div>
                        <div class="col-md-4 col-8">
                            <h6 class="mb-1">
                                <a href="product-details.html?id=${item.product.id}" class="text-decoration-none text-dark">
                                    ${item.product.name}
                                </a>
                            </h6>
                            <p class="text-muted small mb-0">${item.product.description}</p>
                        </div>
                        <div class="col-md-3 col-6 mt-3 mt-md-0">
                            <div class="input-group" style="width: 140px;">
                                <button class="btn btn-outline-secondary" 
                                        type="button"
                                        onclick="window.cart.update(${item.product.id}, ${item.quantity - 1}); window.cart.renderCart();">
                                    <i class="bi bi-dash"></i>
                                </button>
                                <input type="text" 
                                       class="form-control text-center" 
                                       value="${item.quantity}"
                                       readonly>
                                <button class="btn btn-outline-secondary" 
                                        type="button"
                                        onclick="window.cart.update(${item.product.id}, ${item.quantity + 1}); window.cart.renderCart();">
                                    <i class="bi bi-plus"></i>
                                </button>
                            </div>
                        </div>
                        <div class="col-md-2 col-3 mt-3 mt-md-0 text-center">
                            <span class="fw-bold">${item.product.price} ₽</span>
                        </div>
                        <div class="col-md-1 col-3 mt-3 mt-md-0 text-center">
                            <button class="btn btn-outline-danger btn-sm" 
                                    onclick="window.cart.remove(${item.product.id}); window.cart.renderCart();">
                                <i class="bi bi-trash"></i>
                            </button>
                        </div>
                    </div>
                    <div class="row mt-2">
                        <div class="col-12 text-end">
                            <span class="text-muted">Сумма: </span>
                            <span class="fw-bold">${item.total} ₽</span>
                        </div>
                    </div>
                </div>
            `;
        });
        
        html += `
                        </div>
                    </div>
                </div>
                
                <div class="col-lg-4">
                    <div class="card border-0 shadow-sm sticky-top" style="top: 100px;">
                        <div class="card-body">
                            <h4 class="card-title mb-4">
                                <i class="bi bi-receipt me-2"></i>Итог заказа
                            </h4>
                            
                            <div class="mb-3">
                                <div class="d-flex justify-content-between mb-2">
                                    <span class="text-muted">Товары (${this.getCount()})</span>
                                    <span>${total} ₽</span>
                                </div>
                                <div class="d-flex justify-content-between mb-2">
                                    <span class="text-muted">Доставка</span>
                                    <span class="${total >= 3000 ? 'text-success' : ''}">
                                        ${total >= 3000 ? 'Бесплатно' : '300 ₽'}
                                    </span>
                                </div>
                                ${total < 3000 ? `
                                <div class="d-flex justify-content-between mb-2">
                                    <span class="text-muted">До бесплатной доставки</span>
                                    <span class="text-warning">${3000 - total} ₽</span>
                                </div>
                                ` : ''}
                                <hr>
                                <div class="d-flex justify-content-between">
                                    <span class="fw-bold">Итого</span>
                                    <span class="fw-bold fs-5">${total + (total >= 3000 ? 0 : 300)} ₽</span>
                                </div>
                            </div>
                            
                            ${total < 3000 ? `
                            <div class="alert alert-info small">
                                <i class="bi bi-info-circle me-2"></i>
                                Добавьте товаров на ${3000 - total} ₽ для бесплатной доставки
                            </div>
                            ` : `
                            <div class="alert alert-success small">
                                <i class="bi bi-check-circle me-2"></i>
                                Бесплатная доставка активирована
                            </div>
                            `}
                            
                            <button class="btn btn-primary w-100 btn-lg mb-3" onclick="window.cart.checkout()">
                                <i class="bi bi-lock me-2"></i>Перейти к оформлению
                            </button>
                            
                            <button class="btn btn-outline-danger w-100" onclick="window.cart.clear(); window.cart.renderCart();">
                                <i class="bi bi-trash me-2"></i>Очистить корзину
                            </button>
                            
                            <div class="text-center mt-4">
                                <a href="catalog.html" class="text-decoration-none">
                                    <i class="bi bi-arrow-left me-2"></i>Продолжить покупки
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.getElementById('cartContainer').innerHTML = html;
        this.updateCounter();
    }
    
    // Оформление заказа
    checkout() {
        if (this.items.length === 0) {
            this.showNotification('Корзина пуста', 'warning');
            return;
        }
        
        this.showNotification(`
            <strong>Оформление заказа!</strong><br>
            Товаров: ${this.getCount()} шт.<br>
            Сумма: ${this.getTotal()} ₽<br><br>
            В демо-версии заказ сохраняется в корзине.<br>
            В реальной системе здесь был бы переход к оплате.
        `, 'info');
    }
    
    // Показать уведомление
    showNotification(message, type = 'success') {
        // Удаляем старые уведомления
        const oldNotifications = document.querySelectorAll('.cart-notification');
        oldNotifications.forEach(notification => {
            if (notification.parentNode) {
                notification.remove();
            }
        });
        
        const notification = document.createElement('div');
        notification.className = `alert alert-${type} alert-dismissible fade show position-fixed cart-notification`;
        notification.style.cssText = `
            top: 20px;
            right: 20px;
            z-index: 9999;
            min-width: 300px;
            max-width: 400px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        `;
        notification.innerHTML = `
            <i class="bi ${type === 'success' ? 'bi-check-circle' : 
                          type === 'info' ? 'bi-info-circle' : 
                          type === 'warning' ? 'bi-exclamation-triangle' : 
                          'bi-x-circle'} me-2"></i>
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }
}

// Создаем глобальный экземпляр
const cart = new Cart();

// Глобальные функции
window.addToCart = function(productId, quantity = 1) {
    return cart.add(productId, quantity);
};

window.removeFromCart = function(productId) {
    return cart.remove(productId);
};

window.getCart = function() {
    return cart.getAll();
};

window.clearCart = function() {
    return cart.clear();
};

window.updateCartCounter = function() {
    return cart.updateCounter();
};

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    cart.updateCounter();
    
    // Если мы на странице корзины, рендерим ее
    if (window.location.pathname.includes('cart.html')) {
        cart.renderCart();
    }
});

// Экспорт для Node.js (если нужно)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { cart };
}