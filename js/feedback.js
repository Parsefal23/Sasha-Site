document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('feedbackForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Валидация телефона (простая)
            const phone = document.getElementById('phone').value;
            const phoneRegex = /^\+?[0-9\s\-\(\)]{10,}$/;
            
            if (!phoneRegex.test(phone)) {
                alert('Пожалуйста, введите корректный номер телефона');
                return;
            }
            
            // Валидация email
            const email = document.getElementById('email').value;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (!emailRegex.test(email)) {
                alert('Пожалуйста, введите корректный email');
                return;
            }
            
            // Собираем данные
            const formData = {
                name: document.getElementById('name').value,
                phone: phone,
                email: email,
                message: document.getElementById('message').value
            };
            
            // Показываем, что форма отправляется
            const submitBtn = form.querySelector('.feedback-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Отправка...';
            submitBtn.disabled = true;
            
            // Имитация отправки (замените на реальный AJAX запрос)
            setTimeout(function() {
                // Скрываем форму
                form.style.display = 'none';
                
                // Показываем сообщение об успехе
                const successMessage = document.createElement('div');
                successMessage.className = 'feedback-success';
                successMessage.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <h3>Спасибо за заявку!</h3>
                    <p>Мы свяжемся с вами в ближайшее время</p>
                    <button class="feedback-success-btn" onclick="location.reload()">Отправить еще</button>
                `;
                
                form.parentNode.appendChild(successMessage);
                
                // Здесь реальная отправка данных
                console.log('Отправка данных:', formData);
                
                // Для реальной отправки раскомментируйте:
                /*
                fetch('ваш-url-для-отправки', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Успех:', data);
                })
                .catch(error => {
                    console.error('Ошибка:', error);
                });
                */
            }, 1500);
        });
    }
});
