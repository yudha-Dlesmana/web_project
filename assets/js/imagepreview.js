document.getElementById('formFile').addEventListener('change', function (event){
    const file = event.target.files[0];
    const previewContainer = document.getElementById('imagePreview');

    if(file){
        const reader = new FileReader();
        
        reader.onload = function (e) {
            previewContainer.innerHTML = `
            <img src="${e.target.result}" alt='Preview' class='img-fluid rounded d-block mx-auto' style="max-width: 60%; height: auto;"/>`;
        };
        reader.readAsDataURL(file);
    } else {
        previewContainer.innerHTML = "";
    }
});