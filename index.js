const pageContainer = document.createElement('div');
pageContainer.className = 'page-container';
document.body.appendChild(pageContainer);

// Load and insert header
import('./scripts/header.js')
  .then(module => {
    const headerFn = module.header || module.default;
    headerFn(pageContainer);
  })
  .catch(err => console.error("Header Error:", err));

// Load and insert main content
import('./scripts/main.js')
  .then(module => {
    const mainFn = module.mainContent || module.default;
    
    if (typeof mainFn !== 'function') {
      throw new Error('mainContent is not a function');
    }

    const mainContent = mainFn();
    mainContent.classList.add('site-main');
    pageContainer.appendChild(mainContent);

    // Handle search functionality
    const searchButton = mainContent.querySelector('#search-button');
    searchButton.addEventListener('click', async () => {
      const make = mainContent.querySelector('#car-make').value;
      const model = mainContent.querySelector('#car-model').value;
      const keyword = mainContent.querySelector('#search-term').value.trim();
      
      if (!make && !keyword) {
        alert("Please select a make or enter a search term");
        return;
      }

      mainContent.remove();

      try {
        const modelModule = await import('./scripts/model.js');
        const modelFn = modelModule.modelPage || modelModule.default;
        const modelContent = modelFn({ 
          make: make.toLowerCase(), 
          model: model.toLowerCase(), 
          keyword: keyword.toLowerCase() 
        });
        modelContent.classList.add('site-main');
        pageContainer.appendChild(modelContent);
      } catch (error) {
        console.error("Model Loading Error:", error);
        // Fallback to showing main content again
        pageContainer.appendChild(mainContent);
      }
    });
  })
  .catch(err => {
    console.error("Main Content Error:", err);
    // Fallback content if main fails to load
    const fallback = document.createElement('div');
    fallback.textContent = "Failed to load content. Please refresh the page.";
    pageContainer.appendChild(fallback);
  });

// Load and insert footer
import('./scripts/footer.js')
  .then(module => {
    const footerFn = module.footer || module.default;
    footerFn(pageContainer);
  })
  .catch(err => console.error("Footer Error:", err));