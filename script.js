// =====================================
// THE ROYAL DRAPE
// VIRTUAL SAREE EXPERIENCE
// =====================================

// Replace with the boutique's real WhatsApp number.
// Include country code without the + symbol.

const WHATSAPP_NUMBER = "919876543210";


// PRODUCT DATABASE

const products = {

    burgundy: {
        name: "Royal Burgundy Banarasi",
        price: 8499,
        color: "Royal Burgundy",
        image: "images/burgundy.jpg",
        detail: "images/burgundy-detail.jpg",
        model: "images/model-burgundy.jpg"
    },

    emerald: {
        name: "Emerald Heritage Silk",
        price: 9299,
        color: "Emerald Green",
        image: "images/emerald.jpg",
        detail: "images/emerald-detail.jpg",
        model: "images/model-emerald.jpg"
    },

    blue: {
        name: "Midnight Royal Silk",
        price: 7999,
        color: "Royal Blue",
        image: "images/royal-blue.jpg",
        detail: "images/royal-blue-detail.jpg",
        model: "images/model-blue.jpg"
    }

};


// CURRENT STATE

let currentStep = 1;

let selectedProduct = "burgundy";

let bag = JSON.parse(
    localStorage.getItem("royalDrapeBag") || "[]"
);


// HTML ELEMENTS

const sareeImage = document.getElementById("sareeImage");

const stepLabel = document.getElementById("stepLabel");

const experienceTitle =
    document.getElementById("experienceTitle");

const experienceDescription =
    document.getElementById("experienceDescription");

const previousButton =
    document.getElementById("previousButton");

const nextButton =
    document.getElementById("nextButton");


// STEP INFORMATION

const stepInformation = {

    1: {
        title: "Discover Your Saree",
        description:
            "Begin your journey with a timeless masterpiece."
    },

    2: {
        title: "Find Your Perfect Shade",
        description:
            "Explore beautiful colours inspired by Indian royalty."
    },

    3: {
        title: "The Art of Every Thread",
        description:
            "Discover the intricate details of our craftsmanship."
    },

    4: {
        title: "Experience The Complete Look",
        description:
            "Visualize the elegance of your selected saree."
    },

    5: {
        title: "Make It Yours",
        description:
            "Your perfect drape is just one step away."
    }

};


// IMAGE TRANSITION

function updateImage(source, altText) {

    sareeImage.style.opacity = "0";

    sareeImage.classList.remove("zoomed");

    sareeImage.style.transformOrigin = "center";

    setTimeout(() => {

        sareeImage.src = source;

        sareeImage.alt = altText;

        sareeImage.style.opacity = "1";

    }, 250);

}


// STEP NAVIGATION

function updateStep() {

    // Hide all panels

    document.querySelectorAll(".step-panel")
        .forEach(panel => {

            panel.classList.remove("active");

        });


    // Show selected panel

    document.getElementById("panel" + currentStep)
        .classList.add("active");


    // Update progress indicators

    document.querySelectorAll(".step")
        .forEach(step => {

            step.classList.toggle(
                "active",
                Number(step.dataset.step) === currentStep
            );

        });


    // Update heading

    const information = stepInformation[currentStep];

    experienceTitle.textContent = information.title;

    experienceDescription.textContent =
        information.description;

    stepLabel.textContent =
        `STEP 0${currentStep} / 05`;


    // Update buttons

    previousButton.disabled = currentStep === 1;

    nextButton.style.display =
        currentStep === 5 ? "none" : "block";


    // Restore appropriate image

    const product = products[selectedProduct];

    if (currentStep === 3) {

        updateImage(
            product.detail,
            `${product.name} fabric details`
        );

    } else if (currentStep === 4) {

        updateImage(
            product.model,
            `Model wearing ${product.name}`
        );

    } else {

        updateImage(
            product.image,
            product.name
        );

    }


    // Update shopping information

    document.getElementById("finalProduct").textContent =
        product.name;

    document.getElementById("finalPrice").textContent =
        formatPrice(product.price);

}


// NEXT STEP

function nextStep() {

    if (currentStep < 5) {

        currentStep++;

        updateStep();

    }

}


// PREVIOUS STEP

function previousStep() {

    if (currentStep > 1) {

        currentStep--;

        updateStep();

    }

}


// OPEN PRODUCT EXPERIENCE

function openExperience(productId) {

    if (!products[productId]) return;

    selectedProduct = productId;

    currentStep = 1;

    updateProductDetails();

    updateStep();

    document.getElementById("experience")
        .scrollIntoView({
            behavior: "smooth"
        });

}


// UPDATE PRODUCT INFORMATION

function updateProductDetails() {

    const product = products[selectedProduct];

    document.getElementById("productName").textContent =
        product.name;

    document.getElementById("productPrice").textContent =
        formatPrice(product.price);

    document.getElementById("selectedColor").textContent =
        "Selected: " + product.color;

    document.querySelectorAll(".color")
        .forEach(button => {

            button.classList.toggle(
                "selected",
                button.classList.contains(selectedProduct)
            );

        });

}


// STEP 2: COLOUR SELECTION

function changeColor(color) {

    if (!products[color]) return;

    selectedProduct = color;

    updateProductDetails();

    updateImage(
        products[color].image,
        products[color].name
    );

}


// STEP 3: FABRIC EXPLORATION

function zoomFabric() {

    const product = products[selectedProduct];

    updateImage(
        product.detail,
        `${product.name} embroidery and fabric details`
    );

    setTimeout(() => {

        sareeImage.classList.add("zoomed");

    }, 350);

}


// INTERACTIVE FABRIC ZOOM

const visualContainer =
    document.querySelector(".experience-visual");

visualContainer.addEventListener("mousemove", event => {

    if (currentStep !== 3) return;

    if (!sareeImage.classList.contains("zoomed")) return;

    const rectangle =
        visualContainer.getBoundingClientRect();

    const x =
        ((event.clientX - rectangle.left) /
            rectangle.width) * 100;

    const y =
        ((event.clientY - rectangle.top) /
            rectangle.height) * 100;

    sareeImage.style.transformOrigin =
        `${x}% ${y}%`;

});


// STEP 4: MODEL PREVIEW

function showModel() {

    const product = products[selectedProduct];

    updateImage(
        product.model,
        `Full-length model preview of ${product.name}`
    );

}


// STEP 5: ADD TO BAG

function addToBag() {

    const product = products[selectedProduct];

    bag.push({
        id: selectedProduct,
        name: product.name,
        price: product.price
    });

    saveBag();

    renderBag();

    openBag();

}


// SAVE SHOPPING BAG

function saveBag() {

    localStorage.setItem(
        "royalDrapeBag",
        JSON.stringify(bag)
    );

}


// FORMAT PRICE

function formatPrice(price) {

    return "₹" + price.toLocaleString("en-IN");

}


// UPDATE BAG COUNT

function updateBagCount() {

    document.getElementById("bagCount").textContent =
        bag.length;

}


// DISPLAY SHOPPING BAG

function renderBag() {

    const container =
        document.getElementById("bagItems");

    container.innerHTML = "";

    let total = 0;

    if (bag.length === 0) {

        container.textContent =
            "Your shopping bag is empty.";

    }

    bag.forEach((item, index) => {

        total += item.price;

        const row = document.createElement("div");

        row.className = "bag-item";

        const details = document.createElement("span");

        details.textContent =
            `${item.name} — ${formatPrice(item.price)}`;

        const removeButton =
            document.createElement("button");

        removeButton.textContent = "Remove";

        removeButton.addEventListener("click", () => {

            removeFromBag(index);

        });

        row.append(details, removeButton);

        container.appendChild(row);

    });

    document.getElementById("bagTotal").textContent =
        "Total: " + formatPrice(total);

    updateBagCount();

}


// REMOVE PRODUCT

function removeFromBag(index) {

    bag.splice(index, 1);

    saveBag();

    renderBag();

}


// BAG MODAL

const bagOverlay =
    document.getElementById("bagOverlay");

function openBag() {

    bagOverlay.classList.add("open");

}

function closeBag() {

    bagOverlay.classList.remove("open");

}

document.getElementById("bagButton")
    .addEventListener("click", openBag);

document.getElementById("closeBag")
    .addEventListener("click", closeBag);

bagOverlay.addEventListener("click", event => {

    if (event.target === bagOverlay) {

        closeBag();

    }

});

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        closeBag();

    }

});


// WHATSAPP ENQUIRY

function whatsappEnquiry() {

    const product = products[selectedProduct];

    const message =

        `Hello The Royal Drape!\n\n` +

        `I am interested in this saree:\n\n` +

        `Product: ${product.name}\n` +

        `Colour: ${product.color}\n` +

        `Price: ${formatPrice(product.price)}\n\n` +

        `Please share availability and delivery details.`;

    openWhatsApp(message);

}


// SHOPPING BAG ENQUIRY

function checkoutWhatsApp() {

    if (bag.length === 0) {

        alert("Your shopping bag is empty.");

        return;

    }

    let message =
        "Hello! I would like to enquire about these sarees:\n\n";

    let total = 0;

    bag.forEach((item, index) => {

        message +=
            `${index + 1}. ${item.name} - ${formatPrice(item.price)}\n`;

        total += item.price;

    });

    message +=
        `\nTotal: ${formatPrice(total)}\n\n` +

        "Please confirm availability and ordering details.";

    openWhatsApp(message);

}


// OPEN WHATSAPP SAFELY

function openWhatsApp(message) {

    const url =
        `https://wa.me/${WHATSAPP_NUMBER}?text=` +
        encodeURIComponent(message);

    window.open(
        url,
        "_blank",
        "noopener,noreferrer"
    );

}


// INITIALIZE WEBSITE

updateProductDetails();

updateStep();

renderBag();