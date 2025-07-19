export function footer() {
    const footer = document.createElement('footer');
    footer.className = 'site-footer';

    const p = document.createElement('p');
    p.textContent = '© 2023 Prime Global Trading. All rights reserved.';

    const socialLinks = document.createElement('div');
    socialLinks.className = 'social-links';

    const links = [
        { href: 'https://www.facebook.com', icon: '../pictures/f.png', alt: 'Facebook' },
        { href: 'https://www.twitter.com', icon: '../pictures/x.png', alt: 'X' },
        { href: 'https://www.instagram.com', icon: '../pictures/i.png', alt: 'Instagram' }
    ];

    links.forEach(link => {
        const a = document.createElement('a');
        a.href = link.href;
        a.target = '_blank';
        const img = document.createElement('img');
        img.src = link.icon;
        img.alt = link.alt;
        a.appendChild(img);
        socialLinks.appendChild(a);
    });

    footer.appendChild(p);
    footer.appendChild(socialLinks);
    
    document.body.appendChild(footer);
}