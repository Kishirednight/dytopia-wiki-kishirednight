async function ReturnInput() {
    await WriteTerminal("")
    ADDinput()
    const reponse = await ListenInput()

    return reponse
}

function returnobject(fichier, nom) {
    liste_fichier = localStorage.getItem("chemins")

    liste_fichier.forEach(elmt => {
        if (elmt === fichier) {
            return resul.nom
        }
    })

    return false
}

async function run(contenu) {
    // Ouvre un document et son contenu
    const fenetre = document.getElementById("fenetre")

    // === Gestion d'une vrai fenetre === \\\
    let deplacement = false
    let decalageX = 0
    let decalageY = 0

    fenetre.addEventListener("mousedown", (event) => {
        deplacement = true
        decalageX = event.clientX - fenetre.offsetLeft
        decalageY = event.clientY - fenetre.offsetTop
    })
    document.addEventListener("mousemove", (event) => {
        if (!deplacement) return

        fenetre.style.left = (event.clientX - decalageX) + "px"
        fenetre.style.top = (event.clientY - decalageY) + "px"
    })
    document.addEventListener("mouseup", () => {
        deplacement = false
    })

    // === Gestion du contenu === \\
    fenetre.style.display = "block"
    const block = document.createElement("div")
    block.textContent = contenu
}