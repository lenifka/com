// Массив названий месяцев
const months = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
];

// Функция для извлечения даты из имени файла и форматирования
function extractDateFromFilename(filename) {
    // Формат 1: YYYYMMDD_HHMMSS (например: 20240909_194352.jpg)
    let match = filename.match(/(\d{4})(\d{2})(\d{2})_(\d{2})(\d{2})(\d{2})/);
    
    // Формат 2: IMG_YYYYMMDD_HHMMSS_XXX (например: IMG_20241017_094955_741.jpg)
    if (!match) {
        match = filename.match(/IMG_(\d{4})(\d{2})(\d{2})_(\d{2})(\d{2})(\d{2})/);
    }
    
    // Формат 3: YYYYMMDD_HHMMSS_XXX (например: 20250628_204759_156.jpg)
    if (!match) {
        match = filename.match(/(\d{4})(\d{2})(\d{2})_(\d{2})(\d{2})(\d{2})_\d+/);
    }
    
    // Формат 4: photo_YYYY-MM-DD_HH-MM-SS.jpg (например: photo_2024-10-15_23-08-50.jpg)
    if (!match) {
        match = filename.match(/photo_(\d{4})-(\d{2})-(\d{2})_(\d{2})-(\d{2})-(\d{2})/);
    }
    
    // Формат 5: YYYYMMDD (например: 20240830.mp4)
    if (!match) {
        match = filename.match(/(\d{4})(\d{2})(\d{2})\.(jpg|mp4)/);
        if (match) {
            // Для формата без времени используем начало дня
            match = [match[0], match[1], match[2], match[3], '00', '00', '00'];
        }
    }
    
    if (!match) return null;
    
    const year = parseInt(match[1]);
    const month = parseInt(match[2]) - 1; // месяцы в JS начинаются с 0
    const day = parseInt(match[3]);
    const hour = match[4] ? parseInt(match[4]) : 0;
    const minute = match[5] ? parseInt(match[5]) : 0;
    const second = match[6] ? parseInt(match[6]) : 0;
    
    const date = new Date(year, month, day, hour, minute, second);
    const formatted = `${day} ${months[month]} ${year}`;
    
    return {
        date: date,
        formatted: formatted
    };
}

// Массив всех медиафайлов с индивидуальными подписями
// Если подпись не указана, будет использована подпись по умолчанию из массива captions
const allPhotos = [
    { src: 'img/20240717_213142.jpg', caption: 'Незабываемый балкончик, не помню что за фильм был, но всё остальное отчтливо помню🙃' },
    { src: 'img/20240817_234319.jpg', caption: 'С тобой самые долгие, но при этом самые быстротечные свидания😞' },
    { src: 'img/20240824_155745.jpg', caption: 'Хоть и в кусты заехали, зато вместе💕' },
    { src: 'img/20240824_170216.jpg', caption: 'Хорошо тогда забрались на холмик🤭' },
    { src: 'img/20240829_222438.mp4', caption: 'Классый был вечер, вкусный блинчик и от ёжика спаслись🦔🤣' },
    { src: 'img/20240830.mp4', caption: 'Я улетаю в твоих объятиях💕' },
    { src: 'img/20240909_194352.jpg', caption: 'Для тебя и Геры я буду сыщиком, когда нужно🕵️‍♀️' },
    { src: 'img/20240921_153847.jpg', caption: 'Жарко, красиво, классно🔥' },
    { src: 'img/20240921_162941.jpg', caption: 'Сердечек много не бывает❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️' },
    { src: 'img/20240922_183247.jpg', caption: 'Ты наша лучшая подушка!😴' },
    { src: 'img/20241012_170755.jpg', caption: 'Ты самая вкусная🍰' },
    { src: 'img/20241012_170756.jpg', caption: 'Опять вкусный блинчик🍳<br>и ещё много вкусного🍜' },
    { src: 'img/photo_2024-10-15_23-08-50.jpg', caption: 'Ты самая красивая👸' },
    { src: 'img/IMG_20241017_094955_741.jpg', caption: 'Мы с тобой всех раскатаем!💪' },
    { src: 'img/photo_2024-10-31_20-39-19.jpg', caption: 'Ты очень трудолюбивая🤗' },
    { src: 'img/20241108_194830.jpg', caption: 'Два пряника' },
    { src: 'img/photo_2024-11-15_13-58-38.jpg', caption: 'Масте Иван вас быстро уложит на диван' },
    { src: 'img/20241125_193429.jpg', caption: 'Нам здорово везде, ведь мы вместе💕' },
    { src: 'img/20241130_145705.jpg', caption: 'Джесси тебя любит💕🐶' },
    { src: 'img/20241205_210149.jpg', caption: 'Хинкальни с тобой вкуснее😋' },
    { src: 'img/photo_2024-12-15_20-40-05.jpg', caption: 'Красивые виды, все в тебя!' },
    { src: 'img/20241223_192748.jpg', caption: 'Мы смефняфки' },
    { src: 'img/20241228_200622.jpg', caption: 'Мы крутые!🤩' },
    { src: 'img/20241228_203306.jpg', caption: 'Я защищу тебя от любого щелкунчика!' },
    { src: 'img/20241228_203523 (1).jpg', caption: 'Укрепляем предновогоднее настроения друг друга🎄' },
    { src: 'img/20250108_201706.jpg', caption: 'Бродим по лабиринтам для удовольствия' },
    { src: 'img/20250108_211121.jpg', caption: 'Нас окружают огни' },
    { src: 'img/20250130_203808.jpg', caption: 'Ты мой комфортик' },
    { src: 'img/20250228_195809.jpg', caption: 'Подсадил тебя на вкусный чай' },
    { src: 'img/photo_2025-02-16_21-19-28.jpg', caption: 'Моя красотка' },
    { src: 'img/photo_2025-02-18_21-46-58.jpg', caption: 'Ты как этот букет: вроде простая, но при этом такая классная и многогранная🌺' },
    { src: 'img/photo_2025-02-28_22-19-44 (2).jpg', caption: '"ууу", этот дух символизирует нас' },
    { src: 'img/IMG_20250309_141811_496.jpg', caption: 'Моя ведьмочка' },
    { src: 'img/20250412_140354.jpg', caption: 'Белая дача, не важно почему она белая, главное что красуется перед нами' },
    { src: 'img/photo_2025-04-19_20-52-51.jpg', caption: 'Нас не остановит даже солнце🌞' },
    { src: 'img/photo_2025-04-19_20-52-57.jpg', caption: 'Мы повидаем ещё множество кравивых видов' },
    { src: 'img/20250429_201715.jpg', caption: 'Мы в сердечке, и сердечко в нас' },
    { src: 'img/20250510_171323.jpg', caption: 'Мы любим пиццку' },
    { src: 'img/20250628_111342.jpg', caption: 'Комментарии не нужны☺️' },
    { src: 'img/20250628_204759_156.jpg', caption: 'Это мы взади на картинах в прошлых жизнях!' },
    { src: 'img/20250702_215710.jpg', caption: 'Подуставшие, но вместе!' },
    { src: 'img/20250719_171605.jpg', caption: 'Байка за байкой😁' },
    { src: 'img/photo_2025-08-10_20-07-42.jpg', caption: 'Фоточка, а на ней ну такая уже красоточка😍' },
    { src: 'img/photo_2025-08-20_11-17-21.jpg', caption: 'Ты дополняешь прекрасные виды' },
    { src: 'img/20250911_190907.mp4', caption: 'Ты всегда хочешь обниматься, а я всегда рад обнимать тебя😘' },
    { src: 'img/20250911_191033.jpg', caption: 'Вместе мы на высоте😎' },
    { src: 'img/20250911_192257.mp4', caption: 'Качеликии! ухуахуаху' },
    { src: 'img/20250920_174009.jpg', caption: 'Наш любищий нос🐽' },
    { src: 'img/20250921_145236.jpg'},
    { src: 'img/photo_2025-09-30_21-51-17.jpg', caption: 'Кусный чай - наше всё🫖😋' },
    { src: 'img/photo_2025-10-12_13-36-44.jpg', caption: 'Рядом с тобой нужны часы🕒<br>Время летит, как Джесси бежит гулять' },
    { src: 'img/20251019_153004.jpg', caption: 'Люблю тебя радовать😚' },
    { src: 'img/20251019_153808.jpg', caption: 'Ты всегда останешься для меня малышкой🤗' },
    { src: 'img/photo_2025-10-19_16-23-23.jpg', caption: '🙃' },
    { src: 'img/20251029.mp4', caption: 'Я люблю тебя☺️' },
    { src: 'img/photo_2025-11-05_17-54-03.jpg', caption: 'Даже у роботов моторчик начинает работать быстрее при виде тебя!🖤' },
    { src: 'img/20251119_213305.mp4', caption: 'Ты везучая!🍀' },
    { src: 'img/20251219_203351.jpg', caption: 'Культурно окультуриваемся😇' },
    { src: 'img/photo_2025-12-14_01-31-24.jpg', caption: 'Солнышки для солнышка🌞' },
    { src: 'img/20251227_192630.jpg', caption: 'Окутаны теплом и живой грелкой💞🐶' },
    { src: 'img/photo_2026-01-02_20-10-50.jpg', caption: 'У тебя классные друзья!<br>А ты классная у них😊' },
    { src: 'img/photo_2026-01-04_22-13-05.jpg', caption: 'Моя соска🤭' },
    { src: 'img/2026-01-04_22-16-16.mp4', caption: 'Баловница-рукавица🙃' }
];

// Массив подписей по умолчанию (используется если подпись не указана)
const defaultCaptions = [
    'Наши прекрасные моменты ✨',
    'Каждое воспоминание дорого 💕',
    'Вместе мы создаём историю 🌟',
    'Любовь в каждом кадре ❤️',
    'Счастье в простых моментах 🎄',
    'Время остановилось ⏰',
    'Улыбки, которые согревают ☀️',
    'Дни, которые мы помним 🌈',
    'Мгновения счастья 🎈',
    'Наша история продолжается 📖',
    'Кадр за кадром 📸',
    'Эмоции, которые остаются 💫',
    'Лучшие моменты жизни 🌟',
    'Сердца бьются в унисон 💓',
    'Каждый день - подарок 🎀',
    'Счастье рядом с тобой 🌺'
];

// Создаём массив медиафайлов с датами
let photos = allPhotos.map((photo, index) => {
    const src = typeof photo === 'string' ? photo : photo.src;
    const dateInfo = extractDateFromFilename(src);
    // Используем индивидуальную подпись или подпись по умолчанию
    const caption = (typeof photo === 'object' && photo.caption) 
        ? photo.caption 
        : (defaultCaptions[index % defaultCaptions.length]);
    const isVideo = src.toLowerCase().endsWith('.mp4');
    
    let dateString = '';
    if (dateInfo) {
        dateString = dateInfo.formatted;
    }
    
    return {
        src: src,
        caption: caption,
        date: dateInfo ? dateInfo.date : new Date(),
        dateString: dateString,
        isVideo: isVideo,
        fullCaption: dateString ? `${caption}\n${dateString}` : caption
    };
});

// Сортируем по дате и времени: новые сверху (по убыванию)
photos.sort((a, b) => {
    // Сравниваем по полной дате и времени (новые сверху)
    const dateDiff = b.date.getTime() - a.date.getTime();
    if (dateDiff !== 0) return dateDiff;
    
    // Если дата и время одинаковые, сортируем по имени файла (для порядка)
    return b.src.localeCompare(a.src);
});

// Текущий индекс для lightbox
let currentPhotoIndex = 0;

// Глобальные переменные для синхронизации аудио
let globalAudio = null;
let galleryPlayIcon = null;
let lightboxPlayIcon = null;

// Массив для хранения всех видео элементов
let allVideos = [];

// Функция для обновления иконок во всех местах
function updateAudioIcons() {
    if (globalAudio) {
        const iconSrc = globalAudio.paused ? 'img/play-button.svg' : 'img/pause.svg';
        if (galleryPlayIcon) galleryPlayIcon.src = iconSrc;
        if (lightboxPlayIcon) lightboxPlayIcon.src = iconSrc;
    }
}

// Функция для переключения аудио
function toggleAudio() {
    if (!globalAudio) {
        globalAudio = document.createElement('audio');
        globalAudio.src = 'img/МыИдеальнаяПара.mp3';
        globalAudio.preload = 'auto';
        
        globalAudio.addEventListener('play', () => {
            updateAudioIcons();
        });
        
        globalAudio.addEventListener('pause', () => {
            updateAudioIcons();
        });
        
        globalAudio.addEventListener('ended', () => {
            updateAudioIcons();
        });
    }
    
    if (globalAudio.paused) {
        globalAudio.play();
    } else {
        globalAudio.pause();
    }
}

// Функция для генерации случайного поворота
function getRandomRotation() {
    return (Math.random() - 0.5) * 16; // От -8 до +8 градусов
}

// Создание галереи
function createGallery() {
    const gallery = document.getElementById('gallery');
    
    photos.forEach((photo, index) => {
        const photoItem = document.createElement('div');
        photoItem.className = 'photo-item';
        photoItem.style.animationDelay = `${index * 0.1}s`;
        
        const polaroid = document.createElement('div');
        polaroid.className = 'polaroid';
        const rotation = getRandomRotation();
        polaroid.style.transform = `rotate(${rotation}deg)`;
        
        const frameInner = document.createElement('div');
        frameInner.className = 'frame-inner';
        frameInner.style.position = 'relative';
        
        // Создаём спиннер загрузки
        const photoSpinner = document.createElement('div');
        photoSpinner.className = 'photo-spinner';
        photoSpinner.innerHTML = '<div class="heart-loader-small">❤️</div>';
        frameInner.appendChild(photoSpinner);
        
        if (photo.isVideo) {
            // Для видео создаём video элемент с poster
            const video = document.createElement('video');
            video.src = photo.src;
            video.className = 'photo-image';
            video.preload = 'metadata';
            video.muted = false; // Включаем звук для ручного воспроизведения
            video.style.opacity = '0';
            video.style.position = 'relative';
            video.style.zIndex = '1';
            
            // Скрываем спиннер и показываем видео когда метаданные загрузились
            video.addEventListener('loadedmetadata', () => {
                photoSpinner.style.display = 'none';
                video.style.opacity = '1';
                video.style.transition = 'opacity 0.3s ease';
            });
            
            video.addEventListener('error', () => {
                photoSpinner.style.display = 'none';
                video.style.opacity = '1';
            });
            
            // Создаём play кнопку с SVG
            const playButton = document.createElement('div');
            playButton.className = 'video-play-button';
            const playIcon = document.createElement('img');
            playIcon.src = 'img/play-button.svg';
            playIcon.alt = 'Play';
            playIcon.className = 'play-icon';
            playButton.appendChild(playIcon);
            
            // Добавляем видео в массив
            allVideos.push(video);
            
            // Обработчик клика на кнопку play - воспроизводим видео
            playButton.addEventListener('click', (e) => {
                e.stopPropagation();
                if (video.paused) {
                    // Останавливаем все остальные видео
                    allVideos.forEach(v => {
                        if (v !== video && !v.paused) {
                            v.pause();
                            // Показываем кнопку play для остановленных видео
                            const btn = v.parentElement.querySelector('.video-play-button');
                            if (btn) btn.style.display = 'flex';
                        }
                    });
                    // Включаем звук и воспроизводим видео
                    video.muted = false;
                    video.play();
                    playButton.style.display = 'none';
                } else {
                    video.pause();
                    playButton.style.display = 'flex';
                }
            });
            
            // Скрываем кнопку play когда видео играет
            video.addEventListener('play', () => {
                // Останавливаем все остальные видео при запуске этого
                allVideos.forEach(v => {
                    if (v !== video && !v.paused) {
                        v.pause();
                        // Показываем кнопку play для остановленных видео
                        const btn = v.parentElement.querySelector('.video-play-button');
                        if (btn) btn.style.display = 'flex';
                    }
                });
                playButton.style.display = 'none';
            });
            
            // Показываем кнопку play когда видео на паузе или закончилось
            video.addEventListener('pause', () => {
                playButton.style.display = 'flex';
            });
            
            video.addEventListener('ended', () => {
                playButton.style.display = 'flex';
            });
            
            frameInner.appendChild(video);
            frameInner.appendChild(playButton);
            
            // При клике на видео (но не на кнопку play) открываем lightbox
            frameInner.addEventListener('click', (e) => {
                // Если клик был на кнопке play, не открываем lightbox
                if (e.target.closest('.video-play-button')) {
                    return;
                }
                e.stopPropagation();
                openLightbox(index);
            });
        } else {
            // Для фото создаём img элемент
            const img = document.createElement('img');
            img.src = photo.src;
            img.alt = photo.caption;
            img.className = 'photo-image';
            img.loading = 'lazy';
            img.style.opacity = '0';
            img.style.position = 'relative';
            img.style.zIndex = '1';
            
            // Скрываем спиннер и показываем фото когда изображение загрузилось
            img.addEventListener('load', () => {
                photoSpinner.style.display = 'none';
                img.style.opacity = '1';
                img.style.transition = 'opacity 0.3s ease';
            });
            
            img.addEventListener('error', () => {
                photoSpinner.style.display = 'none';
                img.style.opacity = '1';
            });
            
            frameInner.appendChild(img);
        }
        
        let caption;
        
        if (photo.src === 'img/20250921_145236.jpg') {
            // Специальная подпись с аудиоплеером
            caption = document.createElement('div');
            caption.className = 'photo-caption';
            caption.style.display = 'flex';
            caption.style.flexDirection = 'column';
            caption.style.padding = '10px 15px';
            
            // Контейнер для аудиоплеера (flex row)
            const audioContainer = document.createElement('div');
            audioContainer.style.display = 'flex';
            audioContainer.style.alignItems = 'center';
            audioContainer.style.justifyContent = 'flex-start';
            
            // Создаём кнопку play/pause слева
            const audioButton = document.createElement('div');
            audioButton.className = 'audio-play-button';
            audioButton.style.cursor = 'pointer';
            audioButton.style.width = '30px';
            audioButton.style.height = '40px';
            audioButton.style.display = 'flex';
            audioButton.style.alignItems = 'center';
            audioButton.style.justifyContent = 'center';
            audioButton.style.flexShrink = '0';
            
            const playIcon = document.createElement('img');
            playIcon.src = 'img/play-button.svg';
            playIcon.alt = 'Play';
            playIcon.className = 'audio-play-icon';
            playIcon.style.width = '30px';
            audioButton.appendChild(playIcon);
            
            // Создаём gif справа
            const voiceGif = document.createElement('img');
            voiceGif.src = 'img/voice.gif';
            voiceGif.alt = 'Voice';
            voiceGif.style.width = '100px';
            voiceGif.style.height = '50px';
            voiceGif.style.flexShrink = '0';
            
            // Сохраняем ссылку на иконку для синхронизации
            galleryPlayIcon = playIcon;
            
            // Обновляем иконку при загрузке
            if (globalAudio) {
                updateAudioIcons();
            }
            
            // Обработчик клика на кнопку
            audioButton.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleAudio();
            });
            
            audioContainer.appendChild(audioButton);
            audioContainer.appendChild(voiceGif);
            
            caption.appendChild(audioContainer);
            
            // Добавляем дату под аудиоплеером
            if (photo.dateString) {
                const dateSpan = document.createElement('span');
                dateSpan.style.fontSize = '0.85em';
                dateSpan.style.opacity = '0.8';
                dateSpan.style.marginTop = '5px';
                dateSpan.textContent = photo.dateString;
                caption.appendChild(dateSpan);
            }
        } else {
            // Обычная подпись
            caption = document.createElement('p');
            caption.className = 'photo-caption';
            // Добавляем дату в подпись
            if (photo.dateString) {
                caption.innerHTML = `${photo.caption}<br><span style="font-size: 0.85em; opacity: 0.8;">${photo.dateString}</span>`;
            } else {
                caption.textContent = photo.caption;
            }
        }
        
        polaroid.appendChild(frameInner);
        polaroid.appendChild(caption);
        photoItem.appendChild(polaroid);
        
        // Обработчик клика для открытия lightbox (для фото)
        if (!photo.isVideo) {
            photoItem.addEventListener('click', () => {
                openLightbox(index);
            });
        }
        
        gallery.appendChild(photoItem);
        
        // Анимация появления при загрузке
        setTimeout(() => {
            photoItem.classList.add('visible');
        }, index * 100);
    });
}

// Открытие lightbox
function openLightbox(index) {
    currentPhotoIndex = index;
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const photo = photos[index];
    
    // Очищаем предыдущий контент
    lightboxImage.innerHTML = '';
    
    // Показываем спиннер
    const spinner = document.createElement('div');
    spinner.className = 'lightbox-spinner';
    spinner.innerHTML = '<div class="heart-loader">❤️</div>';
    lightboxImage.appendChild(spinner);
    
    if (photo.isVideo) {
        // Останавливаем все видео в галерее
        allVideos.forEach(v => {
            if (!v.paused) {
                v.pause();
                // Показываем кнопку play для остановленных видео
                const btn = v.parentElement.querySelector('.video-play-button');
                if (btn) btn.style.display = 'flex';
            }
        });
        
        // Создаём video элемент
        const video = document.createElement('video');
        video.src = photo.src;
        video.controls = true;
        video.autoplay = true;
        video.className = 'lightbox-image';
        video.style.maxWidth = '90%';
        video.style.maxHeight = '90%';
        video.style.objectFit = 'contain';
        video.style.display = 'none';
        
        video.addEventListener('loadeddata', () => {
            spinner.remove();
            video.style.display = 'block';
        });
        
        video.addEventListener('error', () => {
            spinner.remove();
        });
        
        lightboxImage.appendChild(video);
    } else {
        // Используем img элемент
        const img = document.createElement('img');
        img.src = photo.src;
        img.alt = photo.caption;
        img.className = 'lightbox-image';
        img.style.display = 'none';
        
        // Добавляем обработчики событий
        img.addEventListener('load', () => {
            spinner.remove();
            img.style.display = 'block';
        });
        
        img.addEventListener('error', () => {
            spinner.remove();
            // Если изображение не загрузилось, показываем сообщение
            const errorMsg = document.createElement('div');
            errorMsg.className = 'lightbox-error';
            errorMsg.textContent = 'Не удалось загрузить изображение';
            lightboxImage.appendChild(errorMsg);
        });
        
        lightboxImage.appendChild(img);
    }
    
    // В lightbox показываем полную подпись с датой или аудиоплеер
    if (photo.src === 'img/20250921_145236.jpg') {
        // Специальная подпись с аудиоплеером для lightbox
        lightboxCaption.innerHTML = '';
        lightboxCaption.style.display = 'flex';
        lightboxCaption.style.flexDirection = 'column';
        lightboxCaption.style.alignItems = 'center';
        lightboxCaption.style.padding = '15px 30px';
        
        // Контейнер для аудиоплеера (flex row)
        const audioContainer = document.createElement('div');
        audioContainer.style.display = 'flex';
        audioContainer.style.alignItems = 'center';
        audioContainer.style.justifyContent = 'center';
        audioContainer.style.gap = '15px';
        
        // Создаём кнопку play/pause
        const audioButton = document.createElement('div');
        audioButton.className = 'audio-play-button';
        audioButton.style.cursor = 'pointer';
        audioButton.style.width = '50px';
        audioButton.style.height = '50px';
        audioButton.style.display = 'flex';
        audioButton.style.alignItems = 'center';
        audioButton.style.justifyContent = 'center';
        audioButton.style.flexShrink = '0';
        
        const playIcon = document.createElement('img');
        playIcon.src = 'img/play-button.svg';
        playIcon.alt = 'Play';
        playIcon.className = 'audio-play-icon';
        playIcon.style.width = '100%';
        playIcon.style.height = '100%';
        audioButton.appendChild(playIcon);
        
        // Создаём gif
        const voiceGif = document.createElement('img');
        voiceGif.src = 'img/voice.gif';
        voiceGif.alt = 'Voice';
        voiceGif.style.width = '150px';
        voiceGif.style.height = '75px';
        voiceGif.style.flexShrink = '0';
        
        // Сохраняем ссылку на иконку для синхронизации
        lightboxPlayIcon = playIcon;
        
        // Обновляем иконку при загрузке
        if (globalAudio) {
            updateAudioIcons();
        }
        
        // Обработчик клика на кнопку
        audioButton.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleAudio();
        });
        
        audioContainer.appendChild(audioButton);
        audioContainer.appendChild(voiceGif);
        
        lightboxCaption.appendChild(audioContainer);
        
        // Добавляем дату под аудиоплеером
        if (photo.dateString) {
            const dateSpan = document.createElement('span');
            dateSpan.style.fontSize = '0.9em';
            dateSpan.style.opacity = '0.9';
            dateSpan.style.marginTop = '15px';
            dateSpan.style.display = 'block';
            dateSpan.textContent = photo.dateString;
            lightboxCaption.appendChild(dateSpan);
        }
    } else if (photo.dateString) {
        lightboxCaption.style.display = 'block';
        lightboxCaption.innerHTML = `${photo.caption}<br><span style="font-size: 0.9em; opacity: 0.9; margin-top: 10px; display: block;">${photo.dateString}</span>`;
    } else {
        lightboxCaption.style.display = 'block';
        lightboxCaption.textContent = photo.caption;
    }
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Закрытие lightbox
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    
    // Останавливаем видео, если оно играет
    const video = lightboxImage.querySelector('video');
    if (video) {
        video.pause();
        video.currentTime = 0;
    }
    
    // Аудио продолжает играть при закрытии lightbox (синхронизация)
    
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

// Переключение фотографий в lightbox
function showNextPhoto() {
    currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
    updateLightboxImage();
}

function showPrevPhoto() {
    currentPhotoIndex = (currentPhotoIndex - 1 + photos.length) % photos.length;
    updateLightboxImage();
}

function updateLightboxImage() {
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const photo = photos[currentPhotoIndex];
    
    // Аудио продолжает играть при переключении (синхронизация)
    
    lightboxImage.style.opacity = '0';
    
    setTimeout(() => {
        // Очищаем предыдущий контент
        lightboxImage.innerHTML = '';
        
        // Показываем спиннер
        const spinner = document.createElement('div');
        spinner.className = 'lightbox-spinner';
        spinner.innerHTML = '<div class="heart-loader">❤️</div>';
        lightboxImage.appendChild(spinner);
        
        if (photo.isVideo) {
            // Останавливаем все видео в галерее
            allVideos.forEach(v => {
                if (!v.paused) {
                    v.pause();
                    // Показываем кнопку play для остановленных видео
                    const btn = v.parentElement.querySelector('.video-play-button');
                    if (btn) btn.style.display = 'flex';
                }
            });
            
            // Создаём video элемент
            const video = document.createElement('video');
            video.src = photo.src;
            video.controls = true;
            video.autoplay = true;
            video.className = 'lightbox-image';
            video.style.maxWidth = '90%';
            video.style.maxHeight = '90%';
            video.style.objectFit = 'contain';
            video.style.display = 'none';
            
            video.addEventListener('loadeddata', () => {
                spinner.remove();
                video.style.display = 'block';
                lightboxImage.style.opacity = '1';
            });
            
            video.addEventListener('error', () => {
                spinner.remove();
                lightboxImage.style.opacity = '1';
            });
            
            lightboxImage.appendChild(video);
        } else {
            // Используем img элемент
            const img = document.createElement('img');
            img.src = photo.src;
            img.alt = photo.caption;
            img.className = 'lightbox-image';
            img.style.display = 'none';
            
            // Добавляем обработчики событий
            img.addEventListener('load', () => {
                spinner.remove();
                img.style.display = 'block';
                lightboxImage.style.opacity = '1';
            });
            
            img.addEventListener('error', () => {
                spinner.remove();
                const errorMsg = document.createElement('div');
                errorMsg.className = 'lightbox-error';
                errorMsg.textContent = 'Не удалось загрузить изображение';
                lightboxImage.appendChild(errorMsg);
                lightboxImage.style.opacity = '1';
            });
            
            lightboxImage.appendChild(img);
        }
        
        // В lightbox показываем полную подпись с датой или аудиоплеер
        if (photo.src === 'img/20250921_145236.jpg') {
            // Специальная подпись с аудиоплеером для lightbox
            lightboxCaption.innerHTML = '';
            lightboxCaption.style.display = 'flex';
            lightboxCaption.style.flexDirection = 'column';
            lightboxCaption.style.alignItems = 'center';
            lightboxCaption.style.padding = '15px 30px';
            
            // Контейнер для аудиоплеера (flex row)
            const audioContainer = document.createElement('div');
            audioContainer.style.display = 'flex';
            audioContainer.style.alignItems = 'center';
            audioContainer.style.justifyContent = 'center';
            audioContainer.style.gap = '15px';
            
            // Создаём кнопку play/pause
            const audioButton = document.createElement('div');
            audioButton.className = 'audio-play-button';
            audioButton.style.cursor = 'pointer';
            audioButton.style.width = '50px';
            audioButton.style.height = '50px';
            audioButton.style.display = 'flex';
            audioButton.style.alignItems = 'center';
            audioButton.style.justifyContent = 'center';
            audioButton.style.flexShrink = '0';
            
            const playIcon = document.createElement('img');
            playIcon.src = 'img/play-button.svg';
            playIcon.alt = 'Play';
            playIcon.className = 'audio-play-icon';
            playIcon.style.width = '100%';
            playIcon.style.height = '100%';
            audioButton.appendChild(playIcon);
            
            // Создаём gif
            const voiceGif = document.createElement('img');
            voiceGif.src = 'img/voice.gif';
            voiceGif.alt = 'Voice';
            voiceGif.style.width = '150px';
            voiceGif.style.height = '75px';
            voiceGif.style.flexShrink = '0';
            
            // Сохраняем ссылку на иконку для синхронизации
            lightboxPlayIcon = playIcon;
            
            // Обновляем иконку при загрузке
            if (globalAudio) {
                updateAudioIcons();
            }
            
            // Обработчик клика на кнопку
            audioButton.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleAudio();
            });
            
            audioContainer.appendChild(audioButton);
            audioContainer.appendChild(voiceGif);
            
            lightboxCaption.appendChild(audioContainer);
            
            // Добавляем дату под аудиоплеером
            if (photo.dateString) {
                const dateSpan = document.createElement('span');
                dateSpan.style.fontSize = '0.9em';
                dateSpan.style.opacity = '0.9';
                dateSpan.style.marginTop = '15px';
                dateSpan.style.display = 'block';
                dateSpan.textContent = photo.dateString;
                lightboxCaption.appendChild(dateSpan);
            }
        } else if (photo.dateString) {
            lightboxCaption.style.display = 'block';
            lightboxCaption.innerHTML = `${photo.caption}<br><span style="font-size: 0.9em; opacity: 0.9; margin-top: 10px; display: block;">${photo.dateString}</span>`;
        } else {
            lightboxCaption.style.display = 'block';
            lightboxCaption.textContent = photo.caption;
        }
    }, 150);
}

// Анимация при скролле (Intersection Observer)
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    const photoItems = document.querySelectorAll('.photo-item');
    photoItems.forEach(item => {
        observer.observe(item);
    });
}

// Инициализация экрана входа
function initEntryScreen() {
    const entryScreen = document.getElementById('entryScreen');
    const hearts = document.querySelectorAll('.heart-item');
    const entryError = document.getElementById('entryError');
    
    // Правильный порядок: справа налево (4, 3, 2, 1)
    const correctOrder = [4, 3, 2, 1];
    let clickedOrder = [];
    let isChecking = false;
    
    // Скрываем основной контент
    document.querySelector('.header').style.display = 'none';
    document.querySelector('.main').style.display = 'none';
    document.body.style.overflow = 'hidden';
    
    hearts.forEach((heart, index) => {
        heart.addEventListener('click', () => {
            if (isChecking) return;
            
            const heartIndex = parseInt(heart.getAttribute('data-index'));
            clickedOrder.push(heartIndex);
            
            // Анимация клика
            heart.classList.add('clicked');
            setTimeout(() => {
                heart.classList.remove('clicked');
            }, 500);
            
            // Проверяем правильность после каждого клика
            if (clickedOrder.length === correctOrder.length) {
                isChecking = true;
                
                // Проверяем совпадение
                const isCorrect = clickedOrder.every((val, idx) => val === correctOrder[idx]);
                
                if (isCorrect) {
                    // Правильная комбинация
                    hearts.forEach((h, i) => {
                        setTimeout(() => {
                            h.classList.add('correct');
                        }, i * 100);
                    });
                    
                    setTimeout(() => {
                        entryScreen.classList.add('hidden');
                        document.querySelector('.header').style.display = 'block';
                        document.querySelector('.main').style.display = 'block';
                        document.body.style.overflow = '';
                        createGallery();
                        initScrollAnimations();
                    }, 1500);
                } else {
                    // Неправильная комбинация
                    entryError.textContent = 'Неверная комбинация. Попробуйте ещё раз 💕';
                    clickedOrder = [];
                    
                    // Сбрасываем все сердечки
                    hearts.forEach(h => {
                        h.classList.remove('clicked', 'correct');
                    });
                    
                    setTimeout(() => {
                        entryError.textContent = '';
                        isChecking = false;
                    }, 2000);
                }
            } else if (clickedOrder.length > correctOrder.length) {
                // Слишком много кликов
                entryError.textContent = 'Слишком много кликов. Начните заново 💕';
                clickedOrder = [];
                hearts.forEach(h => {
                    h.classList.remove('clicked', 'correct');
                });
                
                setTimeout(() => {
                    entryError.textContent = '';
                    isChecking = false;
                }, 2000);
            }
        });
    });
}

// Обработчики событий
document.addEventListener('DOMContentLoaded', () => {
    initEntryScreen();
    
    // Lightbox элементы
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxNext = document.getElementById('lightboxNext');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightbox = document.getElementById('lightbox');
    
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxNext.addEventListener('click', (e) => {
        e.stopPropagation();
        showNextPhoto();
    });
    lightboxPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        showPrevPhoto();
    });
    
    // Закрытие по клику на фон
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Навигация клавиатурой
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowRight') {
            showNextPhoto();
        } else if (e.key === 'ArrowLeft') {
            showPrevPhoto();
        }
    });
    
    // Обработчики свайпа для мобильных устройств
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;
    const minSwipeDistance = 50; // Минимальное расстояние для свайпа
    
    lightbox.addEventListener('touchstart', (e) => {
        if (!lightbox.classList.contains('active')) return;
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });
    
    lightbox.addEventListener('touchend', (e) => {
        if (!lightbox.classList.contains('active')) return;
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        
        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;
        const absDeltaX = Math.abs(deltaX);
        const absDeltaY = Math.abs(deltaY);
        
        // Проверяем, что это горизонтальный свайп (не вертикальный)
        if (absDeltaX > absDeltaY && absDeltaX > minSwipeDistance) {
            if (deltaX > 0) {
                // Свайп вправо - предыдущее фото
                showPrevPhoto();
            } else {
                // Свайп влево - следующее фото
                showNextPhoto();
            }
        }
    }, { passive: true });
    
    // Плавная прокрутка для лучшего UX
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Добавление эффекта параллакса для заголовка при скролле
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    const scrolled = window.pageYOffset;
    header.style.transform = `translateY(${scrolled * 0.3}px)`;
    header.style.opacity = 1 - scrolled / 300;
});

// Скрипт для генерации сердечек, следующих за мышкой
(function() {
    'use strict';

    // Массив для хранения сердечек
    const hearts = [];
    let lastTime = 0;

    // Массив цветов для сердечек
    const heartColors = [
        '#ff1744', // красный
        '#e91e63', // розовый
        '#f06292', // светло-розовый
        '#ec407a', // розовый
        '#ff4081', // ярко-розовый
        '#c2185b', // темно-розовый
        '#ad1457', // малиновый
        '#f50057', // пурпурно-розовый
        '#ff6ec7', // светло-розовый
        '#ff1493'  // глубокий розовый
    ];

    // Создаём контейнер для сердечек
    const container = document.createElement('div');
    container.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9999;
    `;
    document.body.appendChild(container);

    // Функция создания SVG сердечка
    function createHeartSVG(size, color) {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', size);
        svg.setAttribute('height', size);
        svg.setAttribute('viewBox', '0 0 24 24');
        svg.style.cssText = `
            position: absolute;
            pointer-events: none;
            filter: drop-shadow(0 0 4px ${color});
        `;

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        // SVG путь для сердечка
        path.setAttribute('d', 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z');
        path.setAttribute('fill', color);
        svg.appendChild(path);

        return svg;
    }

    // Функция создания сердечка
    function createHeart(x, y) {
        const now = Date.now();
        
        // Определяем, мобильное ли устройство
        const isMobile = window.innerWidth <= 768 || 'ontouchstart' in window;
        
        // На мобильных создаем сердечки чаще (каждые 15ms), на десктопе каждые 20ms
        const minDelay = isMobile ? 15 : 20;
        
        // Создаём сердечко с минимальной задержкой для плавности
        if (now - lastTime < minDelay) return;
        
        lastTime = now;

        // Создаем сердечки за раз
        const heartCount = isMobile 
            ? Math.floor(Math.random() * 3) + 2  // от 2 до 4 сердечек на мобильных
            : Math.floor(Math.random() * 3) + 2;  // от 2 до 4 сердечек на десктопе
        
        const baseSize = isMobile ? 16 : 8; // На мобильных в 2 раза больше
        const sizeRange = isMobile ? 16 : 8;
        
        for (let i = 0; i < heartCount; i++) {
            const heart = {
                id: now + i,
                x: x,
                y: y,
                size: Math.random() * sizeRange + baseSize, // Размер от baseSize до baseSize+sizeRange
                offsetX: (Math.random() - 0.5) * 50, // Смещение по X
                offsetY: (Math.random() - 0.5) * 50, // Смещение по Y
                rotation: (Math.random() - 0.5) * 60, // Поворот от -30 до 30 градусов
                opacity: 0.8,
                scale: 1,
                element: null
            };

            // Случайный цвет из массива
            const color = heartColors[Math.floor(Math.random() * heartColors.length)];

            // Создаём DOM элемент
            const heartElement = document.createElement('div');
            heartElement.style.cssText = `
                position: absolute;
                left: ${x - heart.size / 2 + heart.offsetX}px;
                top: ${y - heart.size / 2 + heart.offsetY}px;
                transform: rotate(${heart.rotation}deg) scale(${heart.scale});
                opacity: ${heart.opacity};
                transition: all 1s ease-out;
            `;

            const svg = createHeartSVG(heart.size, color);
            heartElement.appendChild(svg);
            container.appendChild(heartElement);

            heart.element = heartElement;
            hearts.push(heart);

            // Анимация исчезновения
            requestAnimationFrame(() => {
                heartElement.style.cssText = `
                    position: absolute;
                    left: ${x - heart.size / 2 + heart.offsetX}px;
                    top: ${y - heart.size / 2 + heart.offsetY - 40}px;
                    transform: rotate(${heart.rotation + (Math.random() - 0.5) * 40}deg) scale(0.5);
                    opacity: 0;
                    transition: all 1s ease-out;
                `;
            });

            // Удаляем сердечко через 1 секунду
            setTimeout(() => {
                if (heartElement.parentNode) {
                    heartElement.parentNode.removeChild(heartElement);
                }
                const index = hearts.findIndex(h => h.id === heart.id);
                if (index > -1) {
                    hearts.splice(index, 1);
                }
            }, 1000);
        }
    }

    // Обработчик движения мыши
    function handleMouseMove(e) {
        createHeart(e.clientX, e.clientY);
    }

    // Обработчик для touch устройств
    function handleTouchMove(e) {
        // Обрабатываем все измененные точки касания (changedTouches более надежен для touchmove)
        for (let i = 0; i < e.changedTouches.length; i++) {
            const touch = e.changedTouches[i];
            createHeart(touch.clientX, touch.clientY);
        }
    }
    
    // Обработчик начала касания
    function handleTouchStart(e) {
        // Создаем сердечко в точке начала касания
        for (let i = 0; i < e.touches.length; i++) {
            const touch = e.touches[i];
            createHeart(touch.clientX, touch.clientY);
        }
    }

    // Добавляем обработчики событий
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
})();

