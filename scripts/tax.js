// tax.js - Responsive table version
import { taxData } from './taxdata.js';

function clearPageContent() {
  const header = document.querySelector('header');
  document.body.innerHTML = '';
  if (header) {
    document.body.appendChild(header);
  }
}

function renderTaxPage() {
  clearPageContent();
  
  const main = document.createElement('main');
  main.className = 'tax-page';
  
  // Title
  const title = document.createElement('h1');
  title.textContent = 'Vehicle Tax Amounts';
  main.appendChild(title);
  
  // Table container for responsiveness
  const tableContainer = document.createElement('div');
  tableContainer.className = 'table-container';
  
  // Create table
  const table = document.createElement('table');
  table.className = 'tax-table';
  
  // Table header
  const thead = document.createElement('thead');
  thead.innerHTML = `
    <tr>
      <th>Vehicle Name</th>
      <th>Tax Amount</th>
    </tr>
  `;
  table.appendChild(thead);
  
  // Table body
  const tbody = document.createElement('tbody');
  
  if (!taxData || taxData.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="2">No tax data available</td>
      </tr>
    `;
  } else {
    taxData.forEach(item => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.carName}</td>
        <td>$${item.taxAmount.toLocaleString()}</td>
      `;
      tbody.appendChild(row);
    });
  }
  
  table.appendChild(tbody);
  tableContainer.appendChild(table);
  main.appendChild(tableContainer);
  document.body.appendChild(main);
}

export { renderTaxPage };