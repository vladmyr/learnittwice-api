////////////////////////////////////////////////////////////////////////////////
//  NODES
////////////////////////////////////////////////////////////////////////////////

// Lemmas
CREATE (bee: Lemma { id: 1 })
CREATE (car: Lemma { id: 2 })
CREATE (tree: Lemma { id: 3 })
CREATE (vehicle: Lemma { id: 4 })

// Senses
CREATE (beeSense: Sense { id: 11 })
CREATE (carSense: Sense { id: 12 })
CREATE (treeSense: Sense { id: 13 })
CREATE (vehicleSense: Sense { id: 14 })

// Synsets
CREATE (beeSynset: Synset { id: 21 })
CREATE (carVehicleSynset: Synset { id: 22 })
CREATE (treeSynset: Synset { id: 23 })

// Languages
CREATE (enGBLng: Language { id: 101 })
CREATE (ukUALng: Language { id: 102 })

// Definitions
CREATE (beeDefinition: Definition { id: 61 })
CREATE (carDefinition: Definition { id: 62 })
CREATE (treeDefinition: Definition { id: 63 })
CREATE (vehicleDefinition01: Definition { id: 64 })
CREATE (vehicleDefinition02: Definition { id: 65 })

// EXAMPLES
CREATE (beeExample01: Example { id: 81 })
CREATE (beeExample02: Example { id: 82 })
CREATE (beeExample03: Example { id: 83 })

CREATE (carExample01: Example { id: 84 })
CREATE (carExample02: Example { id: 85 })

CREATE (treeExample01: Example { id: 86 })

CREATE (vehicleExample011: Example { id: 87 })
CREATE (vehicleExample012: Example { id: 88 })
CREATE (vehicleExample013: Example { id: 89 })
CREATE (vehicleExample021: Example { id: 90 })



////////////////////////////////////////////////////////////////////////////////
//  RELATIONS
////////////////////////////////////////////////////////////////////////////////

// Senses -> Lemma
CREATE 
  (beeSense)-[:Sense]->(bee),
  (carSense)-[:Sense]->(car),
  (treeSense)-[:Sense]->(tree),
  (vehicleSense)-[:Sense]->(vehicle)

// Sense -> Language
CREATE
  (beeSense)-[:Language]->(enGBLng),
  (carSense)-[:Language]->(enGBLng),
  (treeSense)-[:Language]->(enGBLng),
  (vehicleSense)-[:Language]->(enGBLng)

// Sense -> Synset
CREATE
  (beeSense)-[:Synset]->(beeSynset),
  (carSense)-[:Synset]->(carVehicleSynset),
  (treeSense)-[:Synset]->(treeSynset),
  (vehicleSense)-[:Synset]->(carVehicleSynset)

// Definition -> Language
CREATE
  (beeDefinition)-[:Language]->(enGBLng),
  (carDefinition)-[:Language]->(enGBLng),
  (treeDefinition)-[:Language]->(enGBLng),
  (vehicleDefinition01)-[:Language]->(enGBLng),
  (vehicleDefinition02)-[:Language]->(enGBLng)

// Example -> Definition
CREATE
  (beeExample01)-[:Example]->(beeDefinition),
  (beeExample02)-[:Example]->(beeDefinition),
  (beeExample03)-[:Example]->(beeDefinition),

  (carExample01)-[:Example]->(carDefinition),
  (carExample02)-[:Example]->(carDefinition),

  (treeExample01)-[:Example]->(treeDefinition),
  
  (vehicleExample011)-[:Example]->(vehicleDefinition01),
  (vehicleExample012)-[:Example]->(vehicleDefinition01),
  (vehicleExample013)-[:Example]->(vehicleDefinition01),
  (vehicleExample021)-[:Example]->(vehicleDefinition02)

// Definition -> Synset
CREATE
  (beeDefinition)-[:Definition]->(beeSynset),
  (carDefinition)-[:Definition]->(carVehicleSynset),
  (treeDefinition)-[:Definition]->(treeSynset),
  (vehicleDefinition01)-[:Definition]->(carVehicleSynset),
  (vehicleDefinition02)-[:Definition]->(carVehicleSynset)