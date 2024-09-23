document.addEventListener('DOMContentLoaded', function() {
    // Function to fetch CSV data from URL
    function fetchCSV(url, callback) {
        fetch(url)
            .then(response => response.text())
            .then(text => {
                const data = text.split('\n').map(row => row.split(','));
                callback(data);
            });
    }

    // Function to generate HTML for each product
// Function to generate HTML for each product
    function generateProductHTML(index, image_path, title, sub_title, date, desc_short, desc_long, item_A, item_B, item_C) {
        let itemA_HTML = ''; // Initialize the HTML for item A
        if (item_A.trim() !== '') {
            // If item A has a value, create the HTML for the link and image
            itemA_HTML = `<a href="${item_A}" target="_blank"><img src="media/icons/linkedin.png" style="width: 25px" alt="LinkedIn"></a>`;
        }

        return `
         <div class="product_cell">
            <div class="img_container">
             <img src="${image_path}" alt="$">
              
            </div>
                        
            <div class="d-flex">
                <span class="fs-2">${title}</span>
                <span class="fs-6 ms-auto">${date}</span>
            </div>
            
            <div class="fs-6"></div>
            <div class="d-flex">
                <span> ${sub_title} </span>
                <span class="px-2 hover">${itemA_HTML}  </span> 
                <span class="hover"><a href="project_details.html?index=${index}" target="_blank"><img style="width: 20px" src="media/icons/share.png" alt="Share"></a></span>
            </div>
            <p>${desc_short} </p>
        </div>
    `;
    }

// Function to populate the grid with products

    function populateGrid(data) {
        const gridContainer = document.getElementById('gridContainer');
        // Skip the first row (headers)
        for (let i = 1; i < data.length; i++) {
            const row = data[i];
            // Check if row is not empty and has enough data for each col
            if (row.length >= 9) {
                const index = i; // Unique identifier for each product

                // Construct image path relative to the CSV file's location
                const image_path = `data/catalogue/images/${row[1]}`;
                const title = row[2];
                const sub_title = row[3];
                const date = row[4];
                const desc_short = row[5];
                const desc_long = row[6];
                const item_A = row[7]; // New col for discount date
                const item_B = row[8];
                const item_C = row[9];

                const productHTML = generateProductHTML(index,image_path, title,sub_title, date, desc_short, desc_long, item_A, item_B, item_C);
                const col = document.createElement('div');
                col.classList.add('col');
                col.innerHTML = productHTML;
                gridContainer.appendChild(col);
            }
        }

        // Add event listeners to product detail buttons
        const detailButtons = document.querySelectorAll('.product_details_button');
        detailButtons.forEach((button, index) => {
            button.addEventListener('click', () => {
                // Redirect to the product details page with the corresponding index in the query string
                window.location.href = `project_details.html?index=${index}`;
            });
        });
    }


    // URL of your CSV file relative to the HTML file's location
    const csvURL = 'data/catalogue/catalogue.csv';

    // Fetch and populate grid with products
    fetchCSV(csvURL, populateGrid);







});
