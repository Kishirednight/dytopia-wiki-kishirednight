async function boucle() {
    ADDinput()
    const reponse = await ListenInput()

    if (reponse === "quitter") {
        return true
    } if (!reponse) {
        await WriteTerminal("Rentrer une commande valide.")
    } else {
        await WriteTerminal(`Commande écrite: ${reponse}`)
    }

    boucle()
}