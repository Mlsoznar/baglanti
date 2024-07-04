// Sayfa yüklendiğinde çalışacak fonksiyon
function domReady(fn) {
    if (document.readyState === "complete" || document.readyState === "interactive") {
        setTimeout(fn, 1000);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

domReady(function () {
    // QR Kod tarayıcıyı başlat
    let html5QrcodeScanner = new Html5QrcodeScanner(
        "my-qr-reader", 
        { fps: 10, qrbox: 250 }
    );

    // QR Kod başarılı şekilde tarandığında çağrılacak fonksiyon
    function onScanSuccess(decodedText, decodedResult) {
        // Konsola taranan kodu yazdır
        console.log(`Decoded Text: ${decodedText}`, decodedResult);

        // API'den ürün bilgilerini çek
        fetchProductInfo(decodedText);

        // Taramayı durdur
        html5QrcodeScanner.clear();
    }

    // Taranan kodla ürün bilgilerini çekmek için API'ye istek gönder
    async function fetchProductInfo(decodedText) {
        try {
            let response = await fetch(`http://localhost:5000/api/Products/${decodedText}`);
            if (response.ok) {
                let product = await response.json();
                // Ürün bilgilerini güncelle
                updateProductInfo(product);
            } else {
                alert("Ürün bulunamadı.");
                clearProductInfo();
            }
        } catch (error) {
            console.error("Ürün bilgilerini çekerken hata oluştu:", error);
            alert("Ürün bilgilerini çekerken hata oluştu.");
            clearProductInfo();
        }
    }

    // Ürün bilgilerini güncelle
    function updateProductInfo(product) {
        document.getElementById("productName").innerText = product.name;
        document.getElementById("productPrice").innerText = product.price;
        document.getElementById("productStock").innerText = product.stock;
    }

    // Ürün bilgilerini temizle
    function clearProductInfo() {
        document.getElementById("productName").innerText = "--";
        document.getElementById("productPrice").innerText = "--";
        document.getElementById("productStock").innerText = "--";
    }

    // QR Kod tarayıcıyı başlat ve tarama başarılı olduğunda onScanSuccess fonksiyonunu çalıştır
    html5QrcodeScanner.render(onScanSuccess);
});
