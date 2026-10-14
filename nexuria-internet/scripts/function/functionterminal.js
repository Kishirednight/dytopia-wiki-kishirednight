async function ReturnInput() {
    await WriteTerminal("")
    ADDinput()
    const reponse = await ListenInput()

    return reponse
}

function ReturnObject(fichier, nom) {
    const liste_fichier = JSON.parse(localStorage.getItem("chemins"))

    for (const elmt of liste_fichier) {
        if (elmt.chemin === fichier) {
            return elmt[nom]
        }
    }

    return false;
}

async function HtmlContenu(contenu) {
    // Bloc YAML (Supprimer)
    texte = texte.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, "");

    // Titres (En <hX>)
    texte = texte.replace(
        /^###### (.+)$/gm, "<h6>$1</h6>"
    );
    texte = texte.replace(
        /^##### (.+)$/gm, "<h5>$1</h5>"
    );
    texte = texte.replace(
        /^#### (.+)$/gm, "<h4>$1</h4>"
    );
    texte = texte.replace(
        /^### (.+)$/gm, "<h3>$1</h3>"
    );
    texte = texte.replace(
        /^## (.+)$/gm, "<h2>$1</h2>"
    );
    texte = texte.replace(
        /^# (.+)$/gm, "<h1>$1</h1>"
    );

    // Gras (en <b>)
    texte = texte.replace(
        /\*\*(.+?)\*\*/g, "<b>$1</b>"
    );

    // Italique (en <i>)
    texte = texte.replace(
        /(?<!\*)\*([^*\n]+)\*(?!\*)/g, "<i>$1</i>"
    );

    // Listes (en <ul> et <li>)
    texte = texte.replace(
        /^(?:- .+(?:\r?\n|$))+/gm,
        bloc => {
            const elements = bloc.trim().split(/\r?\n/);

            return "<ul>" +
                elements.map(element =>
                    "<li>" + element.slice(2) + "</li>"
                ).join("") +
                "</ul>";
        }
    );

    // Saut de ligne (en <br>)
    texte = texte.replace(/\r?\n/g, "<br>");

    return texte;
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
    block.innerHTML = contenu

    fenetre.innerHTML = ""
    fenetre.appendChild(block)
}

async function list() {
    const liste_fichier = JSON.parse(localStorage.getItem("chemins"))
    let num = 1

    await WriteTerminal("Documents disponibles:")

    for (const fichier of liste_fichier) {
        await WriteTerminal(`${num} - ${fichier["chemin"]}`)
    }
}