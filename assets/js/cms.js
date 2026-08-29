/* ==========================================================================
   WATERMAN CMS ENGINE — Applies stored content from localStorage
   Include this script on every public page before </body>
   ========================================================================== */
(function () {
    'use strict';

    const STORAGE_KEY = 'waterman_cms_data';

    /**
     * Get all CMS data from localStorage
     */
    function getCMSData() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            return raw ? JSON.parse(raw) : {};
        } catch (e) {
            console.warn('[WatermanCMS] Failed to parse CMS data:', e);
            return {};
        }
    }

    /**
     * Apply stored content to the current page (server API first, localStorage fallback)
     */
    function applyContent() {
        // First try fetching from Server API /api/cms
        fetch('/api/cms')
            .then(function (res) { return res.json(); })
            .then(function (resData) {
                if (resData && resData.success && resData.data) {
                    // Update localStorage cache with server database
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(resData.data));
                    patchElements(resData.data);
                } else {
                    patchElements(getCMSData());
                }
            })
            .catch(function (err) {
                // Offline fallback
                patchElements(getCMSData());
            });
    }

    function patchElements(data) {
        if (!data || Object.keys(data).length === 0) return;

        // Find all elements with data-cms-id
        const elements = document.querySelectorAll('[data-cms-id]');
        elements.forEach(function (el) {
            const id = el.getAttribute('data-cms-id');
            if (!data[id]) return;

            const entry = data[id];

            // Apply text content
            if (entry.text !== undefined && entry.text !== null && entry.text !== '') {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.value = entry.text;
                } else {
                    el.innerHTML = entry.text;
                }
            }

            // Apply image source
            if (entry.img && (el.tagName === 'IMG')) {
                el.src = entry.img;
            }

            // Apply background image
            if (entry.bgImg) {
                el.style.backgroundImage = 'url(' + entry.bgImg + ')';
            }

            // Apply video source
            if (entry.video && el.tagName === 'VIDEO') {
                var source = el.querySelector('source');
                if (source) {
                    source.src = entry.video;
                } else {
                    source = document.createElement('source');
                    source.src = entry.video;
                    source.type = 'video/mp4';
                    el.appendChild(source);
                }
                el.load();
            }

            // Apply link href
            if (entry.href && el.tagName === 'A') {
                el.href = entry.href;
            }
        });
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', applyContent);
    } else {
        applyContent();
    }

    // Expose utility for admin panel
    window.WatermanCMS = {
        getData: getCMSData,
        apply: applyContent,
        STORAGE_KEY: STORAGE_KEY
    };
})();
