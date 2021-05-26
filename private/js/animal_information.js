var dbbref = db.collection('animals_info');

let animal_info = [

    {name: "Raccoon",
	family:"Procyonid", 
	population : "increased by 15-20 times", 
	habitat: "mountainous areas, coastal marshes, and urban areas", 
	endangered: "No",
	funfact: "Raccoons' hands have a bunch of nerves that are like taste buds sending information to the brain.",
	rarity:"common"},

    {name: "Black bear",
	family:"Ursus americanus", 
	population : "Steady numbers. There are more than 120,000 Black Bears in British Columbia.", 
	habitat: "forested areas", 
	endangered: "No",
	funfact: "Bear skulls have unique adaptations to help eat a wide range of food.",
	rarity:"rare"},

    {name: "Sockeye salmon",
	family:"Salmonidae", 
	population : "Declined by 50% over last 10 years", 
	habitat: "remain in freshwater until they are ready to migrate to the ocean", 
	endangered: "Yes",
	funfact: "Sockeye salmon change color as they grow older.",
	rarity:"epic"},

	{name: "Canada goose",
	family:"Ducks", 
	population : "over 7 miliion in NA.Rise in numbers due recent consrvation acts.", 
	habitat: "The Great Lakes region", 
	endangered: "No",
	funfact: "In the early 1900s, giant Canada geese nearly became extinct",
	rarity:"common"},

	
	{name: "Coyote",
	family:"Canidae", 
	population : "Increased by 40% since 1950's.", 
	habitat: "urban and suburban areas", 
	endangered: "No",
	funfact: "Coyote pups are born blind",
	rarity:"common"},
    
		
	{name: "Cougar",
	family:"Felidae", 
	population : "4000 cougars in B.C", 
	habitat: "all forest types,lowland and mountainous deserts", 
	endangered: "No",
	funfact: "A cougar can jump upward 18 feet from a sitting position",
	rarity:"rare"},

	{name: "Wolf",
	family:"Canidae", 
	population : "Canada is home to about 52,000–60,000 wolves", 
	habitat: "wilderness and remote areas", 
	endangered: "No",
	funfact: "Wolves can roam large and long distances, sometimes up to 12 miles (20 kilometers) in a single day",
	rarity:"rare"},

	{name: "Black Swift",
	family:"Swifts", 
	population : "Declined by 50% over last 40 years", 
	habitat: "high cliff faces, either above the ocean surf or behind or next to waterfalls.", 
	endangered: "Yes",
	funfact: "Young swifts can survive without food for up to 48 hours, lapsing into a semi-torpid state.",
	rarity:"epic"},
];

function loaddata() {
    animal_info.forEach(function(animal) {
        dbbref.add({
            name: animal.name,
            family: animal.family,
            population: animal.population,
            habitat: animal.habitat,
            endangered: animal.endangered,
			funfact:animal.funfact,
			rarity: animal.rarity
        });
    });
    console.log("added records to db");
}
