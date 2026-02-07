import { Question, Answers } from '../lib/types';

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
                title: 'Название компании / бренда',
                required: true,
            },
            {
                id: 'name_meaning',
                type: 'textarea',
                title: 'Что означает название вашей компании / бренда?',
            },
            {
                id: 'products_services',
                type: 'textarea',
                title: 'Чем занимается ваша компания? Основные продукты и оказываемые услуги',
                description: 'Опишите ваш продукт или услугу простыми словами',
                required: true,
            },

        ],
    },

    // СЛАЙД 2: Информация о компании (продолжение)
    {
        id: 'company_info2',
        type: 'group',
        title: 'Дополнительная информация о компании',
        description: 'Расскажите о вашей компании',
        fields: [
            {
                id: 'company_age',
                type: 'text',
                title: 'Как давно существует ваша компания?',
                description: '',
            },
            {
                id: 'company_geography',
                type: 'text',
                title: 'В каком городе/регионе вы работаете? Планируете ли вы выход на другие рынки?',
            },
            {
                id: 'brand_idea',
                type: 'textarea',
                title: 'Есть ли у бренда идея, миссия, ценности? Если да - расскажите о них.',
            },
        ],
    },

    // СЛАЙД 3: Цели и задачи проекта
    {
        id: 'project_goals_group',
        type: 'group',
        title: 'Цели и задачи проекта',
        fields: [
            {
                id: 'project_type',
                type: 'radio',
                title: 'Какая стоит задача?',
                options: [
                    { label: 'Разработать логотип и фирменный стиль с нуля', id: 'new' },
                    { label: 'Доработать уже существующий логотип и фирменный стиль', id: 'redesign' }
                ],
                required: true,
            },
            {
                id: 'current_logo_feedback',
                type: 'textarea',
                title: 'Что в текущем варианте нравится, а что нет? Какие возникли проблемы с существующим вариантом?',
                showIf: (answers: Answers) => answers.project_type === 'redesign',
            },
            {
                id: 'urgency_reason',
                type: 'textarea',
                title: 'Почему возникла резкая необходимость создать/переделать логотип и фирменный стиль именно сейчас?',
                required: true,
            },
            {
                id: 'branding_tasks',
                type: 'checkbox',
                title: 'Опишите какие задачи должен решить фирменный стиль',
                options: [
                    { label: 'Привлечь новых клиентов и аудиторию' },
                    { label: 'Выделиться среди конкурентов' },
                    { label: 'Выглядеть более профессионально' },
                    { label: 'Повысить узнаваемость' },
                    { label: 'Выйти на новый рынок' },
                    { label: 'Выглядеть «дороже»' },
                ],
                allowOther: true,
            },
            {
                id: 'deliverables',
                type: 'checkbox',
                title: 'Выберите элементы, которые нужно разработать:',
                options: [
                    { label: 'Бренд-нейминг' },
                    { label: 'Логотип' },
                    { label: 'Цветовая палитра' },
                    { label: 'Шрифты' },
                    { label: 'Графические элементы (паттерны, иллюстрации, фотостиль)' },
                    { label: 'Брендбук / гайдлайн' },
                    { label: 'Слоган' },
                    { label: 'Позиционирование' },
                ],
                allowOther: true,
            },
        ],
    },

    // СЛАЙД 4: Ваша аудитория
    {
        id: 'audience_group',
        type: 'group',
        title: 'Ваша аудитория',
        fields: [
            {
                id: 'business_sector',
                type: 'radio',
                title: 'Ваш сектор:',
                options: [
                    { label: 'B2B', id: 'B2B' },
                    { label: 'B2C', id: 'B2C' }
                ],
                required: true,
            },
            {
                id: 'client_profile_age_gender',
                type: 'text',
                title: 'Кто ваш основной клиент? (возраст и пол)',
                showIf: (answers: Answers) => answers.business_sector === 'B2C',
            },
            {
                id: 'client_profile_profession_income',
                type: 'text',
                title: 'Профессия и доход',
                showIf: (answers: Answers) => answers.business_sector === 'B2C',
            },
            {
                id: 'client_profile_lifestyle',
                type: 'text',
                title: 'Общественный класс, стиль жизни, тип личности',
                showIf: (answers: Answers) => answers.business_sector === 'B2C',
            },
            {
                id: 'client_profile_b2b',
                type: 'text',
                title: 'Кто ваш основной клиент? (чем занимается, размер компании, сфера деятельности)',
                showIf: (answers: Answers) => answers.business_sector === 'B2B',
            },
            {
                id: 'client_profile_geography',
                type: 'text',
                title: 'География (город, страна)',
            },
            {
                id: 'audience_pains',
                type: 'textarea',
                title: 'Какие основные потребности или «боли» у вашей аудитории?',
            },
            {
                id: 'choice_factors',
                type: 'textarea',
                title: 'Что для этой аудитории важно при выборе вашего продукта/услуги?',
            },
            {
                id: 'brand_feelings',
                type: 'textarea',
                title: 'Как аудитория должна чувствовать себя при взаимодействии с брендом?',
            },
        ],
    },

    // СЛАЙД 5: Образ и характер бренда
    {
        id: 'brand_character_group',
        type: 'group',
        title: 'Образ и характер бренда',
        fields: [
            {
                id: 'brand_traits',
                type: 'checkbox',
                title: 'Как вы сами описали бы характер бренда?',
                options: [
                    { label: 'Смелый' },
                    { label: 'Надёжный' },
                    { label: 'Дружелюбный' },
                    { label: 'Современный' },
                    { label: 'Технологичный' },
                    { label: 'Премиальный' },
                ],
                allowOther: true,
            },
            {
                id: 'associations_positive',
                type: 'textarea',
                title: 'Какие ассоциации должен вызывать бренд?',
            },
            {
                id: 'associations_negative',
                type: 'textarea',
                title: 'Какие ассоциации категорически не подходят?',
            },
            {
                id: 'visual_avoid',
                type: 'textarea',
                title: 'Какие негативные визуальные образы стоит избегать?',
                description: 'Например: нельзя использовать образы животных по религиозным причинам',
            },
            {
                id: 'visual_use',
                type: 'textarea',
                title: 'Какие положительные визуальные образы стоит использовать?',
                description: 'Укажите причину (Например: собака вызывает прямую ассоциацию с дружбой)',
            },
            {
                id: 'limitations',
                type: 'textarea',
                title: 'Есть ли какие-то ограничения при работе над логотипом и фирменным стилем?',
            },
        ],
    },

    // СЛАЙД 6: Конкуренты
    {
        id: 'competitors_group',
        type: 'group',
        title: 'Конкуренты',
        fields: [
            {
                id: 'competitors_list',
                type: 'textarea',
                title: 'Назовите 3 и более основных ваших конкурентов',
                description: 'Можно ссылками на сайты/соцсети',
            },
            {
                id: 'liked_companies',
                type: 'textarea',
                title: 'Какие компании из вашей сферы вам нравятся. Почему?',
            },
            {
                id: 'disliked_companies',
                type: 'textarea',
                title: 'Какие компании из вашей сферы вам не нравятся. Почему?',
            },
            {
                id: 'differentiation',
                type: 'textarea',
                title: 'Чем вы принципиально отличаетесь от конкурентов?',
                description: 'Почему потребители выбирают вас, почему им бы стоило выбирать вас',
            },
        ],
    },

    // СЛАЙД 7: Визуальные предпочтения
    {
        id: 'visual_preferences_group',
        type: 'group',
        title: 'Визуальные предпочтения',
        fields: [
            {
                id: 'name_casing',
                type: 'checkbox',
                title: 'В каком виде допустимо написание компании?',
                options: [
                    { label: 'Только строчные' },
                    { label: 'Только прописные' },
                    { label: 'Первая прописная, остальные строчные' },
                    { label: 'На усмотрение дизайнера' },
                ],
                allowOther: true,
            },
            {
                id: 'logo_style_pref',
                type: 'checkbox',
                title: 'Какой вариант логотипа для вас наиболее предпочтителен?',
                options: [
                    { label: 'Шрифтовой', id: 'text', image: '/images/logo-types/text.png' },
                    { label: 'Комбинированный', id: 'combined', image: '/images/logo-types/combined.png' },
                    { label: 'Эмблема', id: 'emblem', image: '/images/logo-types/emblem.png' },
                    { label: 'Интегрированный', id: 'integrated', image: '/images/logo-types/symbol.png' },
                    { label: 'Монограмма', id: 'monogram', image: '/images/logo-types/monogram.png' },
                ],
            },
            {
                id: 'color_preferences',
                type: 'textarea',
                title: 'Есть ли предпочтения по цветам/стилю / приемам? Почему?',
                description: 'Прикрепите примеры ниже в разделе файлов',
            },
            {
                id: 'forbidden_elements',
                type: 'textarea',
                title: 'Есть ли цвета / стили / приёмы, которые нельзя использовать? Почему?',
            },
            {
                id: 'style_direction',
                type: 'checkbox',
                title: 'Какой стиль вам ближе?',
                options: [
                    { label: 'Минималистичный' },
                    { label: 'Яркий' },
                    { label: 'Строгий' },
                    { label: 'Премиальный' },
                    { label: 'Технологичный' },
                ],
                allowOther: true,
            },
        ],
    },

    // СЛАЙД 8: Референсы
    {
        id: 'references_group',
        type: 'group',
        title: 'Примеры и референсы',
        fields: [
            {
                id: 'liked_files',
                type: 'file',
                title: 'Примеры того, что нравится',
                description: 'Загрузите файлы или вставьте ссылки на дизайны, которые вам близки',
            },
            {
                id: 'disliked_files',
                type: 'file',
                title: 'Примеры того, что не нравится',
                description: 'Загрузите файлы или вставьте ссылки на стили, которые вам категорически не нравятся',
            },
        ],
    },

    // СЛАЙД 9: Использование фирменного стиля
    {
        id: 'deliverables',
        type: 'checkbox',
        title: 'Где логотип и фирменный стиль будет использоваться?',
        description: 'Выберите необходимые носители фирменного стиля из списка',
        options: [
            {
                label: 'Упаковка и этикетка',
                children: [
                    { label: 'Этикетка' },
                    {
                        label: 'Пакет', children: [
                            { label: 'Текстильный (шоппер)' },
                            { label: 'Пластиковый (с ручками)' },
                            { label: 'Пластиковый (без ручек)' },
                            { label: 'Крафтовый (с ручками)' },
                            { label: 'Крафтовый (без ручек)' },
                        ]
                    },
                    { label: 'Пакет подарочный' },
                    { label: 'Коробка' },
                    {
                        label: 'Дизайн упаковки', children: [
                            { label: 'Бутылка' },
                            { label: 'Банка' },
                            { label: 'Коробка' },
                            { label: 'Пакет' },
                            { label: 'Контейнер' },
                            { label: 'Тетрапак' },
                            { label: 'Дойпак' },
                            { label: 'Тюбик' },
                        ]
                    },
                    { label: 'Обертка' },
                ],
            },
            {
                label: 'Корпоративная документация',
                children: [
                    { label: 'Визитка' },
                    { label: 'Бейдж' },
                    { label: 'Корпоративный бланк' },
                    { label: 'Конверт' },
                    { label: 'Папка' },
                    { label: 'Сертификаты' },
                ],
            },
            { label: 'Шаблоны соцсетей' },
            { label: 'Корпоративная презентация' },
            {
                label: 'Брендирование одежды',
                children: [
                    { label: 'Майка' },
                    { label: 'Байка' },
                    { label: 'Фартук' },
                    { label: 'Кепка' },
                ]
            },
            {
                label: 'Брендирование техники',
                children: [
                    { label: 'Машина' },
                    { label: 'Велосипед' },
                    { label: 'Мопед' },
                ]
            },
            { label: 'Вывеска' },
            { label: 'Навигация (указатели)' },
        ],
        allowOther: true,
    },

    // СЛАЙД 10: Организационные моменты
    {
        id: 'org_details_group',
        type: 'group',
        title: 'Организационные моменты',
        fields: [
            {
                id: 'deadline',
                type: 'text',
                title: 'Есть ли дедлайн? К какой дате проект должен быть готов?',
            },
            {
                id: 'constraints',
                type: 'textarea',
                title: 'Есть ли ограничения или требования, которые важно учитывать?',
            },
            {
                id: 'budget_range',
                type: 'text',
                title: 'Есть ли ориентир по бюджету?',
            },
        ],
    },

    // СЛАЙД 11: Дополнительно
    {
        id: 'additional_info_group',
        type: 'group',
        title: 'Дополнительно',
        fields: [
            {
                id: 'additional_notes',
                type: 'textarea',
                title: 'Есть ли что-то важное, что вы хотите добавить?',
            },
            {
                id: 'designer_info_needed',
                type: 'textarea',
                title: 'Есть ли информация, которую дизайнеру важно знать заранее?',
            },
            {
                id: 'past_experience',
                type: 'textarea',
                title: 'Был ли у вас опыт работы с дизайнерами раньше? Что понравилось / не понравилось?',
            },
            {
                id: 'project_priority',
                type: 'textarea',
                title: 'Что для вас самое главное в этом проекте?',
            },
        ],
    },

    // СЛАЙД 12: Контактная информация
    {
        id: 'contact_info_slide',
        type: 'group',
        title: 'Контактная информация',
        description: 'Оставьте свои контактные данные для связи',
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
                title: 'Ваш телефон | Telegram | Viber',
            },
            {
                id: 'email',
                type: 'text',
                title: 'Ваш Email',
            },
        ],
    },
];

export const THANK_YOU_MESSAGE = "В течение 3 рабочих дней я свяжусь с вами, чтобы обсудить проект. До встречи!";
