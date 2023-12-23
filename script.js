document.addEventListener('DOMContentLoaded', function () {
    const cardContainer = document.getElementById('cardContainer');
    const showPerPageSelect = document.getElementById('showPerPage');
    const sortBySelect = document.getElementById('sortBy');
    const paginationInfo = document.getElementById('paginationInfo');

    let currentPage = 1;
    let cardsPerPage = parseInt(showPerPageSelect.value);

    // Function to render cards based on current page and cards per page
    function renderCards(data) {
        cardContainer.innerHTML = '';

        const startIndex = (currentPage - 1) * cardsPerPage;
        const endIndex = startIndex + cardsPerPage;

        data.slice(startIndex, endIndex).forEach(item => {
            const card = document.createElement('div');
            card.classList.add('card');

            const img = document.createElement('img');
            img.src = "https://miro.medium.com/v2/resize:fit:720/format:webp/1*n_cDzqy9UTrWfCkW1kIcng.png"; // Replace 'imageURL' with the actual property name in your data
            img.alt = item.title;

            const cardContent = document.createElement('div');
            cardContent.classList.add('card-content');

            const title = document.createElement('h3');
            title.textContent = item.title;

            const description = document.createElement('p');
            description.textContent = item.description; // Replace 'description' with the actual property name in your data

            cardContent.appendChild(title);
            cardContent.appendChild(description);

            card.appendChild(img);
            card.appendChild(cardContent);

            cardContainer.appendChild(card);
        });

        // Update pagination information
        const totalData = data.length;
        const totalPages = Math.ceil(totalData / cardsPerPage);

        paginationInfo.textContent = `Showing 1-${cardsPerPage} of ${totalData}`;
    }

    // Fetch data from your API
    fetch('http://localhost:3000/api/ideas')
        .then(response => response.json())
        .then(data => {
            console.log('Data from API:', data);

            if (Array.isArray(data.data)) {
                renderCards(data.data); // Initial render

                // Event listener for showPerPage change
                showPerPageSelect.addEventListener('change', function () {
                    cardsPerPage = parseInt(this.value);
                    currentPage = 1; // Reset to the first page
                    renderCards(data.data);
                });

                // Event listener for sortBy change
                sortBySelect.addEventListener('change', function () {
                    const sortByValue = this.value;

                    // Implement sorting logic here based on sortByValue
                    // For example, if sortByValue is 'newest', you can sort the data by date

                    // After sorting, render the cards
                    renderCards(data.data);
                });
            } else {
                console.error('Data is not an array:', data);
            }
        })
        .catch(error => console.error('Error fetching data:', error));
});
