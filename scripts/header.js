export function header() {
    
    const header = document.createElement('header');
    header.className = 'site-header';

   
    const nav = document.createElement('nav');
    nav.className = 'navbar';

    
    const logo = document.createElement('div');
    logo.className = 'logo';
    logo.textContent = 'Prime Global Trading ';
    logo.addEventListener('click', () => {
        console.log('Logo clicked');
    });
   
    const ul = document.createElement('ul');
    ul.className = 'nav-links';

    const links = ['Home', 'Stock', 'Tax', 'Contact Us'];
    links.forEach(linkText => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `#${linkText.toLowerCase().replace(/\s+/g, '-')}`;
        a.textContent = linkText;
        li.appendChild(a);
        ul.appendChild(li);
        
  a.addEventListener('click', (e) => {
        e.preventDefault();
        switch (linkText) {
            case 'Home':	window.location.reload();
                            
                break;
       case 'Stock':
    import('./stock.js')
        .then(module => {
            module.renderStockPage();
        })
        .catch(error => {
            console.error('Error loading stock module:', error);
            // Fallback content if module fails to load
            const main = document.createElement('main');
            main.innerHTML = '<p>Error loading stock page. Please try again.</p>';
            document.body.appendChild(main);
        });
    break;
            case 'Tax':
                import('./tax.js')
        .then(module => {
            module.renderTaxPage();
        })
        .catch(error => {
            console.error('Error loading stock module:', error);
            // Fallback content if module fails to load
            const main = document.createElement('main');
            main.innerHTML = '<p>Error loading stock page. Please try again.</p>';
            document.body.appendChild(main);
        });
    break;
            case 'Contact Us':
                    import('./contact.js')
        .then(module => {
            module.renderContactPage();
        })
        .catch(error => {
            console.error('Error loading stock module:', error);
            // Fallback content if module fails to load
            const main = document.createElement('main');
            main.innerHTML = '<p>Error loading stock page. Please try again.</p>';
            document.body.appendChild(main);
        });
    break;
        }
    });
    });
    
const hamburger = document.createElement("div");
hamburger.className = "hamburger";
hamburger.id = "hamburger";
["", "", ""].forEach(() => {
  const span = document.createElement("span");
  hamburger.appendChild(span);
});

hamburger.addEventListener("click", () => {
  ul.classList.toggle("active");
});


    nav.appendChild(logo);
    nav.appendChild(ul);
    header.appendChild(nav);
    nav.appendChild(hamburger);
    header.classList.add('header');
    document.body.prepend(header); 

   
}
