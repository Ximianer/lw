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

            const firstMarkerRect = timelineItems[0].getBoundingClientRect();
            const lastMarkerRect = timelineItems[timelineItems.length - 1].getBoundingClientRect();

            // The absolute top of the first circle and last circle in the viewport
            // padding-top + markerCenter gives the vertical center of the circle within the li
            const firstMarkerCenter = firstMarkerRect.top + parseFloat(getComputedStyle(timelineItems[0]).paddingTop) + markerCenter;
            const lastMarkerCenter = lastMarkerRect.top + parseFloat(getComputedStyle(timelineItems[timelineItems.length - 1]).paddingTop) + markerCenter;

            const viewHeight = window.innerHeight;
            const centerPoint = viewHeight * 0.5;

            // scrollStart: when first marker center is at viewport center
            const startY = firstMarkerCenter;
            // scrollEnd: when last marker center is at viewport center
            const endY = lastMarkerCenter;

            // The total length of the track is from the center of the first marker to the center of the last marker
            const totalTrackLength = endY - startY;
            
            // The progress of the bar should be exactly how far the centerPoint has traveled past startY
            let progressPixels = centerPoint - startY;
            progressPixels = Math.max(0, Math.min(totalTrackLength, progressPixels));

            timelineList.style.setProperty('--timeline-total-length', `${totalTrackLength}px`);
            timelineList.style.setProperty('--timeline-progress', `${progressPixels}px`);

            // Activate markers based on their relative progress
            // A marker should activate the moment the line (which moves with scroll) reaches its center
            timelineItems.forEach((item, index) => {
                const itemRect = item.getBoundingClientRect();
                const itemCenter = itemRect.top + parseFloat(getComputedStyle(item).paddingTop) + markerCenter;

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
