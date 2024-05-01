let meteo = {
    "cleAPI": "4e6560b46cd8eb49d5891d32e29d8fea",
    "villes": ["Ambarès-et-Lagrave", "Ambès", "Artigues-près-Bordeaux", "Bassens", "Bègles", "Blanquefort", "Bordeaux", "Bouliac", "Bruges", "Carbon-Blanc", "Cenon", "Eysines", "Floirac", "Gradignan", "Le Bouscat", "Le Haillan", "Le Taillan-Médoc", "Lormont", "Martignas-sur-Jalle", "Mérignac", "Parempuyre", "Pessac", "Saint-Aubin-de-Médoc", "Saint-Louis-de-Montferrand", "Saint-Médard-en-Jalles", "Saint-Vincent-de-Paul", "Talence", "Villenave-d'Ornon"],
    obtenirMeteo : function (ville) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q="
        + ville
        + "&units=metric&appid="
        + this.cleAPI)
        .then((reponse) => reponse.json())
        .then((donnees) => this.afficherMeteo(donnees));
        setTimeout(() => this.obtenirMeteo(ville), 3600000); // Rafraîchit les données toutes les heures
    },

    afficherMeteo: function(donnees) {
        const { name } = donnees;
        const { icon, description } = donnees.weather[0];
        const { temp, humidity } = donnees.main;
        const { speed } = donnees.wind;
        document.querySelector(".ville").innerText = "Météo à " + name;
        document.querySelector(".icone").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidite").innerText = "Humidité: " + humidity + "%";
        document.querySelector(".vent").innerText = "Vitesse du vent: " + speed + " km/h";
        document.querySelector(".meteo").classList.remove("chargement");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')"
    },

    rechercher : function() {
        let villeRecherchee = document.querySelector(".barreRecherche").value;
        if (this.villes.includes(villeRecherchee)) {
            this.obtenirMeteo(villeRecherchee);
        } else {
            alert("Ville non reconnue. Veuillez entrer une autre ville.");
        }
    }
};

document.querySelector(".recherche button").addEventListener("click", function() {
    meteo.rechercher();
});

document.querySelector(".barreRecherche").addEventListener("keyup", function(evenement){
    if(evenement.key == "Enter"){
        meteo.rechercher();
    }
});

meteo.obtenirMeteo("Bordeaux");
