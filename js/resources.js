// Resources Library JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.category-filter');
    const resourceCards = document.querySelectorAll('.resource-card');
    const searchInput = document.getElementById('searchInput');

    // Category filtering
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Clear search when filtering by category
            searchInput.value = '';
            
            // Filter resources
            filterResources(category, '');
        });
    });

    // Search functionality
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const activeCategory = document.querySelector('.category-filter.active').getAttribute('data-category');
        
        filterResources(activeCategory, searchTerm);
    });

    function filterResources(category, searchTerm) {
        resourceCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            const cardText = card.textContent.toLowerCase();
            
            const matchesCategory = category === 'all' || cardCategory === category;
            const matchesSearch = searchTerm === '' || cardText.includes(searchTerm);
            
            if (matchesCategory && matchesSearch) {
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

        // Show message if no results
        const visibleCards = Array.from(resourceCards).filter(card => 
            card.style.display !== 'none'
        );
        
        const grid = document.getElementById('resourcesGrid');
        let noResultsMsg = document.getElementById('noResults');
        
        if (visibleCards.length === 0) {
            if (!noResultsMsg) {
                noResultsMsg = document.createElement('div');
                noResultsMsg.id = 'noResults';
                noResultsMsg.style.gridColumn = '1 / -1';
                noResultsMsg.style.textAlign = 'center';
                noResultsMsg.style.padding = '3rem';
                noResultsMsg.style.color = 'var(--text-secondary)';
                noResultsMsg.innerHTML = `
                    <h3>No resources found</h3>
                    <p>Try adjusting your search or filter criteria.</p>
                `;
                grid.appendChild(noResultsMsg);
            }
        } else {
            if (noResultsMsg) {
                noResultsMsg.remove();
            }
        }
    }

    // Add click handlers to resource links
    const resourceLinks = document.querySelectorAll('.card-link');
    resourceLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const resourceTitle = this.closest('.card').querySelector('h3').textContent;
            alert(`Opening: "${resourceTitle}"\n\nIn a production environment, this would download or display the actual resource.`);
        });
    });
});
