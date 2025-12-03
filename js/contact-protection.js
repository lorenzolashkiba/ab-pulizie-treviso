// Anti-bot protection for email and phone numbers
// Decodes obfuscated contact information on page load

document.addEventListener('DOMContentLoaded', function() {
    // Obfuscated data (reversed strings)
    const emailReversed = 'ti.liamtoh@okiob';
    const phoneReversed = '0165014723+93';
    const phoneDisplayReversed = '0165 014 723 93+';

    // Decode function
    function decode(str) {
        return str.split('').reverse().join('');
    }

    const email = decode(emailReversed);
    const phone = decode(phoneReversed);
    const phoneDisplay = decode(phoneDisplayReversed);

    // Update all email links
    document.querySelectorAll('.protected-email').forEach(element => {
        if (element.tagName === 'A') {
            element.href = 'mailto:' + email;
            element.textContent = email;
            element.classList.add('loaded');
        } else {
            element.textContent = email;
            element.classList.add('loaded');
        }
    });

    // Update all phone links
    document.querySelectorAll('.protected-phone').forEach(element => {
        if (element.tagName === 'A') {
            element.href = 'tel:' + phone;
            element.textContent = phoneDisplay;
            element.classList.add('loaded');
        } else {
            element.textContent = phoneDisplay;
            element.classList.add('loaded');
        }
    });

    // Update Schema.org data (for SEO, but after page load to avoid bots)
    // Note: This won't help with structured data crawlers, but protects visible content
    const schemas = document.querySelectorAll('script[type="application/ld+json"]');
    schemas.forEach(schema => {
        let content = schema.textContent;
        if (content.includes('PROTECTED_PHONE')) {
            content = content.replace(/PROTECTED_PHONE/g, phone);
        }
        if (content.includes('PROTECTED_EMAIL')) {
            content = content.replace(/PROTECTED_EMAIL/g, email);
        }
        schema.textContent = content;
    });
});
