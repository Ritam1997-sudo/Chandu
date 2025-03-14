document.addEventListener('DOMContentLoaded', () => {
    // ✅ Existing button click event logic
    const buttons = document.querySelectorAll('.tools-buttons button');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const href = button.getAttribute('data-href');
            if (href) {
                window.location.href = href;
            }
        });
    });

    // ✅ Delay third-party content after LCP/FCP (3s delay)
    setTimeout(() => {
        console.log("Lazy loading third-party fonts & iframe...");

        // ✅ Load Google Fonts
        let fontLink = document.createElement("link");
        fontLink.rel = "stylesheet";
        fontLink.href = "https://fonts.googleapis.com/css2?family=YourFont";
        document.head.appendChild(fontLink);

        // ✅ Load Google Form iframe lazily
        let iframeContainer = document.getElementById("iframe-container");
        if (iframeContainer) {
            let iframe = document.createElement("iframe");
            iframe.src = "https://docs.google.com/forms/d/e/1FAIpQLSeQCs8RR3DhpH92vRmsYMIsnxs-Ghsn01gDYgIm1CuPsCGZOw/viewform?embedded=true";
            iframe.width = "640";
            iframe.height = "688";
            iframe.frameBorder = "0";
            iframe.marginHeight = "0";
            iframe.marginWidth = "0";
            iframeContainer.innerHTML = ""; // Remove placeholder text
            iframeContainer.appendChild(iframe);
        }

        // ✅ Load Other Third-Party Scripts (Analytics, Ads, Chat, etc.)
        let script = document.createElement("script");
        script.src = "https://example.com/third-party.js"; // Replace with actual script
        script.async = true;
        document.body.appendChild(script);

    }, 3000); // 3-second delay to prioritize LCP/FCP
});
