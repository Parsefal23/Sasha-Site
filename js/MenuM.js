document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const menu = document.getElementById('mobileMenu');
    const body = document.body;
    
    // Создаем оверлей
    const overlay = document.createElement('div');
    overlay.className = 'mobile-overlay';
    document.body.appendChild(overlay);
    
    // Открытие/закрытие меню
    menuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        menu.classList.toggle('active');
        overlay.classList.toggle('active');
        body.classList.toggle('menu-open');
    });
    
    // Закрытие по оверлею
    overlay.addEventListener('click', function() {
        menuBtn.classList.remove('active');
        menu.classList.remove('active');
        overlay.classList.remove('active');
        body.classList.remove('menu-open');
        
        // Закрываем все дропдауны
        document.querySelectorAll('.mobile-dropdown').forEach(d => {
            d.classList.remove('active');
        });
    });
    
    // Дропдауны
    const dropdownBtns = document.querySelectorAll('.mobile-dropdown-btn');
    
    dropdownBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const dropdown = this.closest('.mobile-dropdown');
            
            // Закрываем другие дропдауны
            document.querySelectorAll('.mobile-dropdown').forEach(d => {
                if (d !== dropdown) {
                    d.classList.remove('active');
                }
            });
            
            // Открываем/закрываем текущий
            dropdown.classList.toggle('active');
        });
    });
    
    // Закрытие при клике на ссылку
    document.querySelectorAll('.mobile-nav-link, .mobile-dropdown-content a').forEach(link => {
        link.addEventListener('click', function() {
            menuBtn.classList.remove('active');
            menu.classList.remove('active');
            overlay.classList.remove('active');
            body.classList.remove('menu-open');
            
            // Закрываем все дропдауны
            document.querySelectorAll('.mobile-dropdown').forEach(d => {
                d.classList.remove('active');
            });
        });
    });
    
    // Закрытие по свайпу влево
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    document.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);
    
    function handleSwipe() {
        const swipeDistance = touchEndX - touchStartX;
        
        // Если свайп влево больше 100px и меню открыто
        if (swipeDistance < -100 && menu.classList.contains('active')) {
            menuBtn.classList.remove('active');
            menu.classList.remove('active');
            overlay.classList.remove('active');
            body.classList.remove('menu-open');
            
            document.querySelectorAll('.mobile-dropdown').forEach(d => {
                d.classList.remove('active');
            });
        }
    }
});
