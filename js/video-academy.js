// Video Academy Filter JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.category-filter');
    const videoCards = document.querySelectorAll('.video-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter videos
            videoCards.forEach(card => {
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

    // Add click handlers to video cards (for demo purposes)
    videoCards.forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', function() {
            const title = this.querySelector('h3').textContent;
            alert(`Video: "${title}"\n\nThis would open the video player. In a production environment, this would play the actual video content.`);
        });
    });
});
