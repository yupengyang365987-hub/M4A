// Community Forum JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.category-filter');
    const forumPosts = document.querySelectorAll('.forum-post');
    const newPostBtn = document.getElementById('newPostBtn');

    // Category filtering
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter posts
            forumPosts.forEach(post => {
                const postCategory = post.getAttribute('data-category');
                
                if (category === 'all' || postCategory === category) {
                    post.style.display = 'block';
                } else {
                    post.style.display = 'none';
                }
            });
        });
    });

    // Post interaction handlers
    forumPosts.forEach(post => {
        const actions = post.querySelectorAll('.post-action');
        
        actions.forEach(action => {
            action.addEventListener('click', function(e) {
                e.stopPropagation();
                const actionText = this.textContent.trim();
                
                if (actionText.includes('Helpful') || actionText.includes('Congratulations') || actionText.includes('Interested')) {
                    // Toggle helpful/like
                    const currentCount = parseInt(this.textContent.match(/\d+/)[0]);
                    const newCount = this.classList.contains('active') ? currentCount - 1 : currentCount + 1;
                    this.textContent = this.textContent.replace(/\d+/, newCount);
                    this.classList.toggle('active');
                    this.style.color = this.classList.contains('active') ? 'var(--primary-color)' : '';
                    this.style.fontWeight = this.classList.contains('active') ? '600' : '';
                } else if (actionText.includes('Replies')) {
                    alert('Opening discussion thread...\n\nIn a production environment, this would show all replies and allow you to add your own comment.');
                } else if (actionText.includes('Save')) {
                    const isSaved = this.classList.toggle('saved');
                    this.textContent = isSaved ? 'Saved' : 'Save';
                    this.style.color = isSaved ? 'var(--primary-color)' : '';
                    this.style.fontWeight = isSaved ? '600' : '';
                }
            });
        });

        // Make post clickable to view full discussion
        post.style.cursor = 'pointer';
        post.addEventListener('click', function() {
            const title = this.querySelector('h3').textContent;
            alert(`Opening discussion: "${title}"\n\nIn a production environment, this would open the full discussion thread with all replies.`);
        });
    });

    // New post button
    if (newPostBtn) {
        newPostBtn.addEventListener('click', function() {
            const categories = ['Question', 'Strategy', 'Success Story', 'Events & Tournaments', 'General Discussion'];
            const categoryList = categories.map((cat, i) => `${i + 1}. ${cat}`).join('\n');
            
            alert(`Start a New Discussion\n\nChoose a category:\n${categoryList}\n\nIn a production environment, this would open a form to create a new discussion post.`);
        });
    }

    // Popular topic tags
    const topicTags = document.querySelectorAll('[style*="border-radius: 2rem"]');
    topicTags.forEach(tag => {
        tag.addEventListener('click', function() {
            const topic = this.textContent;
            alert(`Filtering by topic: ${topic}\n\nIn a production environment, this would show all discussions tagged with ${topic}.`);
        });
    });
});
