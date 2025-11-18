document.getElementById('close-modal-add').addEventListener('click', (e) => {
    let elementClick = e.target

    elementClick.closest('div.position-absolute').classList.toggle('d-none')
    document.getElementById('model-add-staff').querySelector('form').reset();
    document.getElementById('experiences-container').innerHTML = ''

})

document.getElementById("input-photo-preview").addEventListener('keyup', function () {
    document.getElementById('photo-preview').src = document.getElementById("input-photo-preview").value
})

document.getElementById("add-exp").addEventListener('click', function () {
    let experienceform = document.createElement('div')
    experienceform.className = 'd-flex justify-content-between align-items-center  experience'
    experienceform.innerHTML = `
                            <button type="button" class=" bg-opacity-0 bg-light border-0 text-danger ">X</button>
                            <div class="p-1">
                                <input type="text" placeholder="Poste" class="border rounded p-1" name="postes" required>
                                <input type="text" placeholder="Entreprise" class="border rounded p-1" name="entreprises" required>
                                <input type="text" placeholder="Années (ex: 2019-2022)" class="border rounded p-1" name="annees" required>
                            </div> 
    `
    document.getElementById('experiences-container').appendChild(experienceform)
})

document.getElementById('experiences-container').addEventListener('click', (e) => {
    let elementClick = e.target
    if (elementClick.tagName === "BUTTON") {
        elementClick.closest('div').remove()
    }
})



function createExp(poste, entreprise, annee) {
    let Exp = {
        poste: poste,
        entreprise: entreprise,
        annee: annee
    }
    return Exp
}
function createStaff(name, role, phone, email, photourl, experiences) {
    let Exp = {
        fullname: name,
        role: role,
        phone: phone,
        email: email,
        photourl: photourl,
        experiences: experiences
    }
    return Exp
}

document.getElementById('btn').addEventListener('click', () => {

    const name_input = document.getElementById('model-add-staff').querySelector('input[name="name"]');
    const role_input = document.getElementById('model-add-staff').querySelector('select[name="role"]');
    const phone_input = document.getElementById('model-add-staff').querySelector('input[name="phone"]');
    const email_input = document.getElementById('model-add-staff').querySelector('input[name="email"]');
    const photo_input = document.getElementById('model-add-staff').querySelector('input[name="photo"]');
    const experiences = document.getElementById('experiences-container').querySelectorAll('div.experience');
    let experiencestable = []
    if (experiences) {
        experiences.forEach(element => {
            experiencestable.push(createExp(element.querySelector('input[name="postes"]').value, element.querySelector('input[name="entreprises"]').value, element.querySelector('input[name="annees"]').value))
        });
    }
    let newStaff = createStaff(name_input.value, role_input.value, phone_input.value, email_input.value, photo_input.value, experiencestable)
    let staff_table = JSON.parse(localStorage.getItem("staff_table")) || []
    staff_table.push(newStaff)
    localStorage.setItem("staff_table", JSON.stringify(staff_table))
    document.getElementById('model-add-staff').querySelector('form').reset();
    document.getElementById('experiences-container').innerHTML = ''
})

document.getElementById("btn-add-staff").addEventListener('click', () => {
    document.getElementById("model-add-staff").classList.toggle('d-none')
})

show_Unassigned_Staff_list()

function show_Unassigned_Staff_list() {
    let staff_table = JSON.parse(localStorage.getItem("staff_table")) || []
    let index = 0
    staff_table.forEach(staff => {
        let staff_card = document.createElement("div")
        staff_card.className = "card m-1 bg-light"
        staff_card.setAttribute('id', index++)
        staff_card.innerHTML = ` <div class="card-body d-flex  align-items-center" >
                                    <img src=" ${staff.photourl} " width="44" class="rounded-circle" alt="Photo">
                                    <div class="m-1 mt-0 mb-0">
                                        <h6 class="card-title mb-0"> ${staff.fullname}</h6>
                                        <p class="card-text text-muted small"> ${staff.role}</p>
                                    </div>
                                 </div> `
        document.getElementById("Unassigned-Staff-list").appendChild(staff_card)
    });

}


document.getElementById('Unassigned-Staff-list').addEventListener('click', (e) => {

    let elementClick = e.target
    let staff_table = JSON.parse(localStorage.getItem("staff_table")) || []
    let index = elementClick.closest('div.card').getAttribute('id')
    let div = document.createElement('div')
    div.className = " p-1  bg-opacity-75 bg-dark vw-100 vh-100 position-absolute top-0  d-flex flex-column justify-content-center align-items-center modelshowstaff"
    div.innerHTML = show_staff(staff_table[index])
    document.querySelector('body').appendChild(div)
    document.querySelector("div.modelshowstaff").addEventListener('click', (e) => {
        let buttuobclick = e.target
        if (buttuobclick.tagName === "BUTTON")
            document.querySelector("div.modelshowstaff").remove()
    })
})

function show_staff(staff) {
    return `   <div class="card  rounded-2 w-50 border-0">
            <div class="card-head d-flex justify-content-end">
                <button class="  bg-opacity-0 bg-white border-0 fs-5 p-2  rounded-5 text-danger">X</button>
            </div>
            <div class="card-body p-4">

                <div class="d-flex align-items-center mb-4 border-bottom pb-3">

                    <div class="m-1  ">
                        <img src="${staff.photourl}" width="120"
                            class="rounded-circle border border-danger border-4" alt="Photo staff">
                    </div>

                    <div class=" d-flex flex-column justify-content-center align-items-center">
                        <h4 class="card-title mb-0 text-primary">${staff.fullname}</h4>
                        <p class="text-muted lead">${staff.role}</p>
                    </div>
                </div>

                <h6 class=" text-secondary mb-2  text-uppercase">📞 Contact</h6>
                <div class="row mb-4">

                    <div class="col-md-6 mb-2">
                        <span class="d-block fw-bold small text-uppercase">Phone</span>
                        <span class="text-dark">${staff.phone}</span>
                    </div>

                    <div class="col-6 mb-2">
                        <span class="d-block fw-bold small text-uppercase">Email</span>
                        <span class="text-dark"> ${staff.email}</span>
                    </div>
                </div>

                <h6 class="text-uppercase text-secondary mb-3">💼 Experiences </h6>

                <div class="list-group list-group-flush  scroll-y ">
                    ${showExp(staff.experiences)}
                </div>

            </div>
        </div>`
}

function showExp(experiences) {
    return experiences.map((experience) => {
        return `<div class="list-group-item d-flex justify-content-between align-items-start px-0">
                        <div>
                            <span class="fw-bold d-block">${experience.poste}</span>
                            <small class="text-muted">${experience.entreprise}</small>
                        </div>
                        <span class="badge bg-secondary mt-1">${experience.annee}</span>
                    </div>`
    });
}