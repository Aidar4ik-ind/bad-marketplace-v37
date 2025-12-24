// products.js с локальными картинками
const productsData = [
    {
        id: 1,
        name: "Магний B6 Extra Pure",
        description: "Хелатный магний для снижения стресса и улучшения сна",
        price: 1290,
        tags: ["магний", "стресс", "сон", "нервы"],
        category: "stress",
        image: "assets/images/1.png"
    },
    {
        id: 2,
        name: "Мелатонин Экстра",
        description: "Для глубокого сна и легкого пробуждения",
        price: 890,
        tags: ["сон", "мелатонин", "релаксация"],
        category: "sleep",
        image: "assets/images/2.png"
    },
    {
        id: 3,
        name: "Энерджи Буст",
        description: "Мгновенный заряд бодрости и энергии",
        price: 1500,
        tags: ["энергия", "бодрость", "витамины"],
        category: "energy",
        image: "assets/images/3.png"
    },
    {
        id: 4,
        name: "Иммуно Гуард",
        description: "Максимальная защита иммунитета",
        price: 1100,
        tags: ["иммунитет", "витамин C", "цинк"],
        category: "immunity",
        image: "assets/images/4.png"
    },
    {
        id: 5,
        name: "Детокс Комплекс",
        description: "Глубокое очищение организма",
        price: 950,
        tags: ["детокс", "очищение", "печень"],
        category: "detox",
        image: "assets/images/5.png"
    },
    {
        id: 6,
        name: "Ашваганда Премиум",
        description: "Адаптоген для устойчивости к стрессу",
        price: 1300,
        tags: ["стресс", "адаптоген"],
        category: "stress",
        image: "assets/images/6.png"
    },
    {
        id: 7,
        name: "L-Теанин Про",
        description: "Для ясности ума и спокойствия",
        price: 950,
        tags: ["стресс", "концентрация"],
        category: "stress",
        image: "assets/images/7.png"
    },
    {
        id: 8,
        name: "Коэнзим Q10 Ultra",
        description: "Для клеточной энергии",
        price: 1800,
        tags: ["энергия", "антиоксидант"],
        category: "energy",
        image: "assets/images/8.png"
    },
    {
        id: 9,
        name: "Женьшень Корейский",
        description: "Природный тоник",
        price: 1400,
        tags: ["энергия", "женьшень"],
        category: "energy",
        image: "assets/images/9.png"
    },
    {
        id: 10,
        name: "Витамин B-Комплекс",
        description: "12 витаминов группы B",
        price: 890,
        tags: ["энергия", "витамины"],
        category: "energy",
        image: "assets/images/10.png"
    },
    {
        id: 11,
        name: "Витамин C 1000",
        description: "Высокодозированный",
        price: 650,
        tags: ["иммунитет", "антиоксидант"],
        category: "immunity",
        image: "assets/images/11.png"
    },
    {
        id: 12,
        name: "Цинк + Витамин D",
        description: "Дуэт для иммунитета",
        price: 820,
        tags: ["иммунитет", "цинк"],
        category: "immunity",
        image: "assets/images/12.png"
    },
    {
        id: 13,
        name: "Пробиотик Иммуно",
        description: "Для иммунитета и микрофлоры",
        price: 1350,
        tags: ["иммунитет", "пробиотик"],
        category: "immunity",
        image: "assets/images/13.png"
    },
    {
        id: 14,
        name: "Суставы Флекс",
        description: "Для подвижности суставов",
        price: 1600,
        tags: ["суставы", "хондроитин"],
        category: "joints",
        image: "assets/images/14.png"
    },
    {
        id: 15,
        name: "Коллаген Морской",
        description: "Для суставов и кожи",
        price: 1750,
        tags: ["суставы", "коллаген"],
        category: "joints",
        image: "assets/images/15.png"
    },
    {
        id: 16,
        name: "Омега-3 Ультра",
        description: "Высокая концентрация",
        price: 1250,
        tags: ["омега-3", "сердце"],
        category: "joints",
        image: "assets/images/16.png"
    },
    {
        id: 17,
        name: "Клетчатка Актив",
        description: "Для здорового пищеварения",
        price: 480,
        tags: ["пищеварение", "клетчатка"],
        category: "digestion",
        image: "assets/images/17.png"
    },
    {
        id: 18,
        name: "Ферментный Комплекс",
        description: "Для усвоения пищи",
        price: 890,
        tags: ["пищеварение", "ферменты"],
        category: "digestion",
        image: "assets/images/18.png"
    },
    {
        id: 19,
        name: "Куркумин Экстра",
        description: "Противовоспалительное",
        price: 980,
        tags: ["суставы", "куркумин"],
        category: "joints",
        image: "assets/images/19.png"
    },
    {
        id: 20,
        name: "Глюкозамин+МСМ",
        description: "Восстановление хрящей",
        price: 1450,
        tags: ["суставы", "глюкозамин"],
        category: "joints",
        image: "assets/images/20.png"
    },
    {
        id: 21,
        name: "Эхинацея Форте",
        description: "Поддержка иммунитета",
        price: 590,
        tags: ["иммунитет", "эхинацея"],
        category: "immunity",
        image: "assets/images/21.png"
    },
    {
        id: 22,
        name: "Печень Протектор",
        description: "Защита печени",
        price: 1100,
        tags: ["детокс", "печень"],
        category: "detox",
        image: "assets/images/22.png"
    },
    {
        id: 23,
        name: "Имбирь+Куркума",
        description: "Противовоспалительный дуэт",
        price: 720,
        tags: ["пищеварение", "имбирь"],
        category: "digestion",
        image: "assets/images/23.png"
    },
    {
        id: 24,
        name: "Ацетил-L-Карнитин",
        description: "Для мозга и энергии",
        price: 1250,
        tags: ["энергия", "мозг"],
        category: "energy",
        image: "assets/images/24.png"
    },
    {
        id: 25,
        name: "НейроБаланс",
        description: "Для эмоционального равновесия",
        price: 1050,
        tags: ["стресс", "настроение"],
        category: "stress",
        image: "assets/images/25.png"
    },
    {
        id: 26,
        name: "Сонный Лотос",
        description: "Травяной комплекс для сна",
        price: 750,
        tags: ["сон", "травы"],
        category: "sleep",
        image: "assets/images/26.png"
    },
    {
        id: 27,
        name: "Ночной Покой",
        description: "Магний + валериана",
        price: 920,
        tags: ["сон", "магний"],
        category: "sleep",
        image: "assets/images/27.png"
    },
    {
        id: 28,
        name: "АнтиСтресс Макс",
        description: "Мощная формула",
        price: 1200,
        tags: ["стресс", "нервы"],
        category: "stress",
        image: "assets/images/28.png"
    },
    {
        id: 29,
        name: "Магний Хелат",
        description: "Высокая биодоступность",
        price: 850,
        tags: ["стресс", "магний"],
        category: "stress",
        image: "assets/images/29.png"
    },
    {
        id: 30,
        name: "Dream Perfect",
        description: "Мелатонин продленного действия",
        price: 1100,
        tags: ["сон", "качество сна"],
        category: "sleep",
        image: "assets/images/30.png"
    }
];

// Функции
const Products = {
    getAll: () => productsData,
    getById: (id) => productsData.find(p => p.id === id),
    getFeatured: (count = 8) => productsData.slice(0, count),
    getByTag: (tag) => productsData.filter(p => p.tags.includes(tag)),
    search: (query) => {
        const q = query.toLowerCase();
        return productsData.filter(p => 
            p.name.toLowerCase().includes(q) || 
            p.description.toLowerCase().includes(q) ||
            p.tags.some(tag => tag.toLowerCase().includes(q))
        );
    },
    // Новый метод для получения всех уникальных тегов
    getAllTags: () => {
        const allTags = new Set();
        productsData.forEach(product => {
            product.tags.forEach(tag => allTags.add(tag));
        });
        return Array.from(allTags);
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = Products;
} else {
    window.Products = Products;
}