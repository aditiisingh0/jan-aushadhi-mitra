let medicines = [];

fetch('medicines.json')
.then(response => response.json())
.then(data => {
    medicines = data;
});

function searchMedicine() {
    let input = document.getElementById("medicineInput").value.toLowerCase();
    let resultDiv = document.getElementById("result");

    let found = medicines.find(med => med.brand.toLowerCase().includes(input));

    if (found) {
        let savings = found.brand_price - found.generic_price;
        resultDiv.innerHTML = `
            <p><b>${found.brand}</b></p>
            <p>Generic: ${found.generic}</p>
            <p>You Save ₹${savings}</p>
        `;
    } else {
        resultDiv.innerHTML = "Medicine not found";
    }
}

function findStore() {
    window.open("https://www.google.com/maps/search/Jan+Aushadhi+Store+near+me");
}
