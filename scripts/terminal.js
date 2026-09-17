async function terminal() {
    // Configuration du header
    document.getElementById("user").textContent = `Bienvenue "${localStorage.getItem("nom")}" - IP connecté: ${localStorage.getItem("IP")}`

    // Configuration du footer
    document.getElementById("version").textContent = localStorage.getItem("version")
    function function_horloge() {
        document.getElementById("horloge").textContent = horloge()
    }

    setInterval(function_horloge, 1000)

    // Script
}