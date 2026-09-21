async function boucle() {
    await WriteTerminal("")
    ADDinput()
    const reponse = await ListenInput()

    if (reponse === "quitter") {
        return true
    } if (!reponse) {
        await WriteTerminal("Rentrer une commande valide.")
    } else {
        await distribuer(reponse)
    }

    boucle()
}

async function distribuer(reponse) {
    const commande = reponse.split(" ")[0].trim().toLowerCase()
    const parametre = reponse.split("").slice(1)

    if (commande === "run") {
        await run(parametre)
    }
}

async function run(fichier) {
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
}