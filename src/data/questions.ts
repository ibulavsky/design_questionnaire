import { Question } from '../lib/types';

export const QUESTIONS: Question[] = [
    {
        id: 'project_name',
        type: 'text',
        title: 'Название компании / проекта',
        description: 'Как называется ваш бренд или проект?',
        required: true,
        placeholder: 'Например: Design Studio X',
    },
    {
        id: 'activity',
        type: 'textarea',
        title: 'Чем занимается ваша компания?',
        description: 'Опишите кратко вашу деятельность и продукты.',
        required: true,
        placeholder: 'Мы создаем...',
    },
    {
        id: 'services',
        type: 'checkbox',
        title: 'Какие услуги вам нужны?',
        options: ['Логотип', 'Фирменный стиль', 'Брендбук', 'Визитки', 'Оформление соцсетей'],
        required: true,
    },
    {
        id: 'logo_status',
        type: 'radio',
        title: 'Есть ли существующий логотип?',
        options: ['Да, нужен редизайн', 'Нет, создаём с нуля'],
        required: true,
    },
    {
        id: 'audience',
        type: 'textarea',
        title: 'Опишите вашу целевую аудиторию',
        description: 'Кто ваши клиенты? Возраст, интересы, география.',
        placeholder: 'Наши клиенты это...',
    },
    {
        id: 'emotions',
        type: 'textarea',
        title: 'Какие эмоции должен вызывать бренд?',
        description: 'Например: доверие, инновации, премиальность.',
        placeholder: 'Бренд должен чувствоваться как...',
    },
    {
        id: 'references',
        type: 'text',
        title: 'Примеры брендов, которые вам нравятся',
        description: 'Ссылки на сайты или названия брендов.',
        placeholder: 'Apple, Nike...',
    },
    {
        id: 'budget',
        type: 'radio',
        title: 'Бюджет проекта',
        options: ['до $500', '$500-1500', '$1500-3000', 'от $3000'],
    },
    {
        id: 'timeline',
        type: 'text',
        title: 'Желаемые сроки',
        placeholder: 'Например: 1 месяц',
    },
    {
        id: 'email',
        type: 'text',
        title: 'Email для связи',
        required: true,
        placeholder: 'your@email.com',
    },
];
