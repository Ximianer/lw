document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // Timeline Progress Logic
    const timeline = document.querySelector('.preset-timeline');
    const timelineList = document.querySelector('.preset-timeline ol');
    const timelineItems = document.querySelectorAll('.preset-timeline li');

    if (timeline && timelineList) {
        // Set initial --timeline-progress to 0
        timelineList.style.setProperty('--timeline-progress', '0%');

        window.addEventListener('scroll', () => {
            if (timelineItems.length < 2) return;

            const markerSize = parseInt(getComputedStyle(timeline).getPropertyValue('--timeline-marker-size')) || 46;
            const markerCenter = markerSize / 2;
            const topOffset = parseFloat(getComputedStyle(timelineItems[0]).paddingTop) + markerCenter;

            const firstMarkerRect = timelineItems[0].getBoundingClientRect();
            const lastMarkerRect = timelineItems[timelineItems.length - 1].getBoundingClientRect();

            const viewHeight = window.innerHeight;
            const centerPoint = viewHeight * 0.5;

            // scrollStart: when first marker center is at viewport center
            const startY = firstMarkerRect.top + topOffset;
            // scrollEnd: when last marker center is at viewport center
            const endY = lastMarkerRect.top + topOffset;

            let progress = (centerPoint - startY) / (endY - startY);
            progress = Math.max(0, Math.min(1, progress));

            // Set total length for the track to stop exactly at the last circle center
            const totalPixels = endY - startY;
            timelineList.style.setProperty('--timeline-total-length', `${totalPixels}px`);
            timelineList.style.setProperty('--timeline-progress', `${progress * 100}%`);

            // Activate markers based on their relative progress
            // A marker should activate the moment the line (which moves with scroll) reaches its center
            timelineItems.forEach((item, index) => {
                const itemRect = item.getBoundingClientRect();
                const itemCenter = itemRect.top + topOffset;

                // If the viewport center is at or below the item's center, it's "reached"
                if (centerPoint >= itemCenter) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
        });
    }
});
