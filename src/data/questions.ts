import { Question } from '../lib/types';

export const QUESTIONS: Question[] = [
    // СЛАЙД 1: Информация о компании (группа)
    {
        id: 'company_info',
        type: 'group',
        title: 'Информация о компании',
        description: 'Расскажите о вашей компании',
        fields: [
            {
                id: 'company_name',
                type: 'text',
                title: 'Название компании',
                description: 'Например: "ООО Ромашка", "Ромашка", "Ромашка", "Ромашка"',
                required: true,
            },
            {
                id: 'company_name_variants',
                type: 'checkbox',
                title: 'В каком виде допустимо написание?',
                required: true,
                options: [
                    { label: 'только строчные буквы', description: 'например "ромашка"' },
                    { label: 'только прописные буквы', description: 'например "РОМАШКА"' },
                    { label: 'первая прописная, остальные строчные', description: 'например "Ромашка"' },
                ],
                allowOther: true,
            },
            {
                id: 'name_meaning',
                type: 'textarea',
                title: 'Что означает ваше название?',
            },
            {
                id: 'current_site',
                type: 'text',
                title: 'Адрес текущего сайта (если есть)',
                placeholder: 'https://...',
            },
        ],
    },

    // СЛАЙД 2: Продукты и услуги
    {
        id: 'products_services',
        type: 'textarea',
        title: 'Основные продукты и оказываемые услуги',
        description: 'Опишите, чем занимается ваша компания',
        required: true,
    },

    // СЛАЙД 3: Целевая аудитория
    {
        id: 'target_audience',
        type: 'textarea',
        title: 'Целевая аудитория',
        description: 'География, демография (возраст, пол), психография (образ жизни, ценности)',
        required: true,
    },

    // СЛАЙД 4: Позиционирование (объединение 7+8)
    {
        id: 'brand_promise',
        type: 'textarea',
        title: 'Что должен нести ваш бренд?',
        description: 'Какое главное сообщение и какие проблемы клиентов вы решаете?',
        required: true,
    },

    // СЛАЙД 5: Конкуренты + преимущества (объединение 9+10)
    {
        id: 'competition_info',
        type: 'group',
        title: 'Конкурентное окружение',
        fields: [
            {
                id: 'competitors',
                type: 'textarea',
                title: 'Ваши конкуренты',
                description: 'Прямые и непрямые. Можно указать ссылки на сайты.',
            },
            {
                id: 'advantages',
                type: 'textarea',
                title: 'Преимущества перед конкурентами',
                description: 'Почему потребители выбирают именно вас?',
            },
        ],
    },

    // СЛАЙД 6: Носители стиля с вложенными опциями
    {
        id: 'deliverables',
        type: 'checkbox',
        title: 'Необходимые носители стиля',
        description: 'Выберите элементы, которые нужно разработать',
        options: [
            { label: 'Логотип, цвета, шрифты' },
            { label: 'Паттерн (фирменный узор)' },
            { label: 'Сертификаты' },
            {
                label: 'Упаковка / Этикетка',
                children: [
                    {
                        label: 'Пакет', children: [
                            { label: 'текстильный (шоппер)' },
                            { label: 'пластиковый (c ручками)' },
                            { label: 'пластиковый (без ручек)' },
                            { label: 'крафтовый (c ручками)' },
                            { label: 'крафтовый (без ручек)' },
                            { label: 'подарочный' },
                        ]
                    },
                    { label: 'Банка' },
                    { label: 'Бутылка' },
                    { label: 'Контейнер' },
                    { label: 'Коробка' },
                    { label: 'Тетрапак' },
                    { label: 'Дойпак' },
                    { label: 'Тюбик' },
                    { label: 'Обёртка' },
                ],
            },
            {
                label: 'Оформление соцсетей',
                children: [
                    { label: 'ВКонтакте' },
                    { label: 'Instagram' },
                    { label: 'Facebook' },
                    { label: 'YouTube' },
                    { label: 'Telegram' },
                ],
            },
            {
                label: 'Брендирование одежды',
                children: [
                    { label: 'Футболки' },
                    { label: 'Толстовки' },
                    { label: 'Поло' },
                    { label: 'Куртки' },
                    { label: 'Жилеты' },
                    { label: 'Спецодежда' },
                    { label: 'Головные уборы' },
                    { label: 'Аксессуары' },
                ]
            },
            { label: 'Вывеска' },
            { label: 'Навигация' },
            { label: 'Презентация' },
        ],
        required: true,
        allowOther: true,
    },

    // СЛАЙД 7: Тип логотипа с картинками
    {
        id: 'logo_type',
        type: 'radio',
        title: 'Какой вид логотипа предпочтителен?',
        options: [
            { label: 'Шрифтовой (только название)', image: '/images/logo-types/text.png' },
            { label: 'Комбинированный (знак + текст)', image: '/images/logo-types/combined.png' },
            { label: 'Эмблема', image: '/images/logo-types/emblem.png' },
            { label: 'Только знак', image: '/images/logo-types/symbol.png' },
            { label: 'Монограмма', image: '/images/logo-types/monogram.png' },
        ],
    },

    // СЛАЙД 8: Тип проекта
    {
        id: 'project_type',
        type: 'radio',
        title: 'Тип проекта',
        options: ['Разработка с нуля', 'Переработка прежнего стиля'],
        required: true,
    },

    // СЛАЙД 9: Логотип = сфера деятельности (оставляем)
    {
        id: 'logo_meaning',
        type: 'radio',
        title: 'Должен ли логотип отражать сферу деятельности?',
        options: ['Да, обязательно', 'Нет, это не важно', 'На усмотрение дизайнера'],
    },

    // СЛАЙД 10: Визуальные идеи
    {
        id: 'visual_ideas',
        type: 'group',
        title: 'Визуальные предпочтения',
        fields: [
            {
                id: 'visual_imagery',
                type: 'textarea',
                title: 'Визуальные образы',
                description: 'Какие образы СТОИТ использовать, а каких СТОИТ ИЗБЕГАТЬ?',
            },
            {
                id: 'preferred_colors',
                type: 'text',
                title: 'Предпочтительные цвета',
                description: 'Есть ли любимые или нежелательные оттенки?',
            },
        ],
    },

    // СЛАЙД 11: Ваши идеи
    {
        id: 'design_ideas',
        type: 'textarea',
        title: 'Ваши идеи и пожелания',
        description: 'Есть ли что-то конкретное, что вы хотите воплотить?',
    },

    // СЛАЙД 12: Референсы (загрузка файлов)
    {
        id: 'references',
        type: 'file',
        title: 'Референсы и примеры',
        description: 'Загрузите примеры логотипов или стилей, которые вам нравятся',
    },

    // СЛАЙД 13: Бюджет и сроки (оставляем #21)
    {
        id: 'project_details',
        type: 'group',
        title: 'Детали проекта',
        fields: [
            {
                id: 'budget',
                type: 'text',
                title: 'Ваши бюджетные рамки на проект',
            },
            {
                id: 'timeline',
                type: 'text',
                title: 'Желаемые сроки готовности',
            },
        ],
    },

    // СЛАЙД 14: Контакт
    {
        id: 'contact_email',
        type: 'group',
        title: 'Контактная информация',
        fields: [
            {
                id: 'name',
                type: 'text',
                required: true,
                title: 'Ваше имя',
            },
            {
                id: 'phone',
                type: 'text',
                required: true,
                title: 'Ваш телефон | Telegram | WhatsApp',
            },
            {
                id: 'email',
                type: 'text',
                title: 'Ваш Email',
            },
        ],
    },
];
