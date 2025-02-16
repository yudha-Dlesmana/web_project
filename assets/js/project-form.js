
function projectForm(event){
    event.preventDefault();

    // get input
    let projectName = document.getElementById("projectName").value;
    let start = document.getElementById("start").value;
    let end = document.getElementById("end").value;
    let description = document.getElementById("description").value;

    // get input checkbox
    let checkboxes = document.querySelectorAll("input[name='technologies']:checked")
    let technologies = Array.from(checkboxes).map(cb => cb.value);

    // get input image
    let image = document.getElementById("image");
    let imageFileName = URL.createObjectURL(image.files[0])

    // store input as object
    let newProject = {
        projectName: projectName,   //
        start: start,
        end: end,
        description: description,   //
        technologies: technologies,
        image: imageFileName        //
    }

    // store object input to array
    projects.push(newProject)

    console.log(projects)
    
    renderProject()
}

function renderProject(){
    let projectElement = document.getElementById('projectsList');
    projectElement.innerHTML = '';

    for(let index = 0; index <projects.length; index++){
        project = projects[index];

        projectElement.innerHTML += `
        <article class="project-element">
            <img class="project-pic" src="${project.image}">
            <h1>${project.projectName}</h1>
            <p class="duration">durasi: ${durationDate(project.start, project.end)}<br>
            ${convertDate(project.start)} - ${convertDate(project.end)}
            </p

            <p>${project.description}</p>
            <div class="downloadOn">
                <img src="asset/img/icon/playstore.png">
                <img src="asset/img/icon/android.png">
                <img src="asset/img/icon/java.png">
            </div>
            <div class="project-item-buttons">
                <button class="edit-button">Edit</button>
                <button class="delete-button">Delete</button>
            </div>
        </article>
        `
    }
}

// function durationDate(start, end){
//     let dateStart = new Date(start);
//     let dateEnd = new Date(end);

//     //selisih hari
//     let diffTime = dateEnd - dateStart;
//     let diffDay = diffTime/(1000*60*60*24);

//     //jumlah selisih year, month, day
//     let years = 0
//     let months = 0;
//     let daysLeft = diffDay;
    
//     // bulan dan tahun mulai
//     let curMonth = start.getMonth();
//     let curYear = start.getFullYear();

//     // hitung jumlah hari perbulan
//     while(curYear < end.getFullYear()){
//         const daysInYear = getDayInYear(curYear);
//         if(daysLeft >= daysInYear){
//             daysLeft -= daysInYear;
//             years++;
//             curYear++;
//         } else{
//             break;
//         }
//     }
//     while(day)
    
// }
function getDayInYear(year){
    if ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)){
        return 366;
    } else{
        return 365
    }
}
function getDayInMonth(year, month){
    return new Date(year, month, 0).getDate;
}

function convertDate(inputDate){
    let dateObj = new Date(inputDate);
    
    const day   = String(dateObj.getDate()).padStart(2,'0');
    const month = dateObj.toLocaleDateString('default', {month: 'short'});
    const year  = String(dateObj.getFullYear()).slice(-2)
    return `${month}/${year}`;
}