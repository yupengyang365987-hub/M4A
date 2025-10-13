// Collegiate Showcase JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.category-filter');
    const showcaseCards = document.querySelectorAll('#showcaseGrid .video-card');

    // Category filtering
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter performances
            showcaseCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'block';
                    // Trigger animation
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Add click handlers to video cards
    showcaseCards.forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', function() {
            const title = this.querySelector('h3').textContent;
            const description = this.querySelector('p').textContent;
            alert(`Performance: "${title}"\n\n${description}\n\nIn a production environment, this would play the championship performance video with expert commentary.`);
        });
    });

    // Featured video play button
    const featuredButton = document.querySelector('.button');
    if (featuredButton) {
        featuredButton.addEventListener('click', function() {
            alert('Opening 2024 National Championship Finals...\n\nIn a production environment, this would play the full championship trial with expert analysis and commentary.');
        });
    }
});
