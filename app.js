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
            <h3>${found.brand}</h3>
            <p><b>Generic:</b> ${found.generic}</p>
            <p>Brand Price: ₹${found.brand_price}</p>
            <p>Generic Price: ₹${found.generic_price}</p>
            <p style="color:green;"><b>You Save ₹${savings}</b></p>
            <p>Use: ${found.use}</p>
            <p style="color:blue;"><b>Available at Jan Aushadhi Store</b></p>
        `;
    } else {
        resultDiv.innerHTML = "Medicine not found";
    }
}

function findStore() {
    window.open("https://www.google.com/maps/search/Jan+Aushadhi+Store+near+me");
}
