let medicines = [];

fetch('medicines.json')
    .then(response => response.json())
    .then(data => {
        medicines = data;
    });

function searchMedicine() {
    let input = document.getElementById("medicineInput").value.toLowerCase();
    let resultDiv = document.getElementById("result");

    let found = medicines.find(med => med.brand.toLowerCase() === input);

    if (found) {
        let savings = found.brand_price - found.generic_price;
        resultDiv.innerHTML = `
            <p><b>Generic Name:</b> ${found.generic}</p>
            <p><b>Brand Price:</b> ₹${found.brand_price}</p>
            <p><b>Generic Price:</b> ₹${found.generic_price}</p>
            <p><b>You Save:</b> ₹${savings}</p>
            <p><b>Use:</b> ${found.use}</p>
        `;
    } else {
        resultDiv.innerHTML = "Medicine not found in database";
    }
}

function findStore() {
    window.open("https://www.google.com/maps/search/Jan+Aushadhi+Store+near+me");
}
