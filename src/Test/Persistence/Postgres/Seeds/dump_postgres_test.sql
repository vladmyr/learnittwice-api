--
-- PostgreSQL test database dump
--

--------------------------
-- TABLE DATA INSERTION --
--------------------------

-- Data for Name: Lemma; Type: TABLE DATA; 
INSERT INTO "Lemma" (lemma) VALUES
    ('lemma001'),
    ('lemma002'),
    ('lemma003');

-- Synonyms of "car" lemma

INSERT INTO "Lemma" (id, lemma) VALUES
    (7187, 'apple'),
    (9939, 'auto'),
    (10216, 'automobile'),
    (18491, 'bulwark'),
    (19107, 'cable car'),
    (20742, 'car'),
    (30250, 'corner'),
    (41530, 'elevator car'),
    (47973, 'fence in'),
    (48000, 'fence'),
    (58986, 'gondola'),
    (80500, 'machine'),
    (81265, 'malus pumila'),
    (86764, 'motorcar'),
    (93782, 'orchard apple tree'),
    (96234, 'palisade'),
    (96845, 'paries'),
    (108030, 'rampart'),
    (108035, 'railcar'),
    (108037, 'railroad car'),
    (108038, 'railway car'),
    (119231, 'shoetree'),
    (120686, 'sir herbert beerbohm tree'),
    (128724, 'surround'),
    (135195, 'tree diagram'),
    (135245, 'tree'),
    (142998, 'wall'),
    (145232, 'windowpane'),
    (145249, 'window');

-- Synsets for synonyms of "car" lemma
INSERT INTO "Language" (id, iso) VALUES
    (1, 'en_UK'),
    (2, 'pl_PL'),
    (3, 'uk_UA');

-- Synsets for synonyms of "car" lemma
INSERT INTO "Synset" (id) VALUES
    (35251),
    (127547),
    (126000),
    (8610),
    (22632),
    (24532),
    (92241),
    (110413),
    (127420),
    (11384),
    (127527),
    (127550),
    (125995),
    (24584),
    (52459),
    (126004),
    (127433),
    (127545),
    (127541),
    (120891),
    (120892),
    (126002),
    (120945),
    (127552),
    (125955),
    (21545),
    (109389),
    (125980),
    (8138),
    (24599),
    (120942);

-- Definition for synonyms of "car" lemma
INSERT INTO "Definition" (id, "synsetId", "languageId", definition) VALUES
    (8136, 8138, 1, 'fruit with red or yellow or green skin and sweet to tart crisp whitish flesh'),
    (8608, 8610, 1, 'native Eurasian tree widely cultivated in many varieties for its firm rounded edible fruits'),
    (11382, 11384, 1, 'a motor vehicle with four wheels; usually propelled by an internal combustion engine'),
    (21543, 21545, 1, 'an embankment built around a space for defensive purposes'),
    (22630, 22632, 1, 'a conveyance for passengers or freight on a cable railway'),
    (24530, 24532, 1, 'a wheeled vehicle adapted to the rails of railroad'),
    (24582, 24584, 1, 'the compartment that is suspended from an airship and that carries personnel and the cargo and the power plant'),
    (24597, 24599, 1, 'where passengers ride up and down'),
    (35249, 35251, 1, 'force a person or an animal into a position from which he cannot escape'),
    (52457, 52459, 1, 'surround with a wall in order to fortify'),
    (92239, 92241, 1, '(anatomy) a layer (a lining or membrane) that encloses a structure'),
    (109387, 109389, 1, 'stretch (a shoe) on a shoetree'),
    (110411, 110413, 1, 'English actor and theatrical producer noted for his lavish productions of Shakespeare (1853-1917)'),
    (120889, 120891, 1, 'a tall perennial woody plant having a main trunk and branches forming a distinct elevated crown; includes both gymnosperms and angiosperms'),
    (120890, 120892, 1, 'a figure that branches from a single root'),
    (120940, 120942, 1, 'plant with trees'),
    (120943, 120945, 1, 'chase an animal up a tree'),
    (125953, 125955, 1, 'an architectural partition with a height and length greater than its thickness; used to divide or enclose an area or to support another structure'),
    (125978, 125980, 1, 'anything that suggests a wall in structure or function or effect'),
    (125993, 125995, 1, 'a difficult or awkward situation'),
    (125998, 126000, 1, 'a vertical (or almost vertical) smooth rock face (as of a cave or mountain)'),
    (126000, 126002, 1, 'a layer of material that encloses space'),
    (126002, 126004, 1, 'a masonry fence (as around an estate or garden)'),
    (127418, 127420, 1, 'a framework of wood or metal that contains a glass windowpane and is built into a wall or roof to admit light or air'),
    (127431, 127433, 1, 'a pane of glass in a window'),
    (127525, 127527, 1, 'a transparent opening in a vehicle that allow vision out of the sides or back; usually is capable of being opened'),
    (127539, 127541, 1, 'a transparent panel (as of an envelope) inserted in an otherwise opaque material'),
    (127543, 127545, 1, 'an opening that resembles a window in appearance or function'),
    (127545, 127547, 1, 'the time period that is considered best for starting or finishing something'),
    (127548, 127550, 1, 'an opening in a wall or screen that admits light and air and through which customers can be served'),
    (127550, 127552, 1, '(computer science) a rectangular part of a computer screen that contains a display different from the rest of the screen');

-- Sense for synonyms of "car" lemma
INSERT INTO "Sense" ("id", "lemmaId", "languageId", "synsetId", "tagCount") VALUES
    (16546, 7187, 1, 8138, 1),
    (17432, 7187, 1, 8610, 0),
    (17433, 81265, 1, 8610, 0),
    (17434, 93782, 1, 8610, 0),
    (23170, 9939, 1, 11384, 2),
    (23171, 10216, 1, 11384, 15),
    (23172, 20742, 1, 11384, 71),
    (23173, 80500, 1, 11384, 0),
    (23174, 86764, 1, 11384, 1),
    (43559, 18491, 1, 21545, 0),
    (43560, 108030, 1, 21545, 2),
    (43561, 142998, 1, 21545, 0),
    (45757, 19107, 1, 22632, 0),
    (45758, 20742, 1, 22632, 0),
    (49527, 20742, 1, 24532, 2),
    (49528, 108035, 1, 24532, 0),
    (49529, 108037, 1, 24532, 0),
    (49530, 108038, 1, 24532, 0),
    (49612, 20742, 1, 24584, 0),
    (49613, 58986, 1, 24584, 0),
    (49636, 20742, 1, 24599, 0),
    (49637, 41530, 1, 24599, 0),
    (69419, 30250, 1, 35251, 0),
    (69420, 135245, 1, 35251, 0),
    (101005, 47973, 1, 52459, 0),
    (101006, 48000, 1, 52459, 0),
    (101007, 96234, 1, 52459, 0),
    (101008, 128724, 1, 52459, 0),
    (101009, 142998, 1, 52459, 0),
    (162370, 96845, 1, 92241, 0),
    (162371, 142998, 1, 92241, 1),
    (184651, 119231, 1, 109389, 0),
    (184652, 135245, 1, 109389, 0),
    (185930, 120686, 1, 110413, 0),
    (185931, 135245, 1, 110413, 0),
    (198391, 135245, 1, 120891, 107),
    (198392, 135195, 1, 120892, 0),
    (198393, 135245, 1, 120892, 0),
    (198453, 135245, 1, 120942, 0),
    (198456, 135245, 1, 120945, 0),
    (204174, 142998, 1, 125955, 82),
    (204202, 142998, 1, 125980, 15),
    (204221, 142998, 1, 125995, 0),
    (204226, 142998, 1, 126000, 0),
    (204228, 142998, 1, 126002, 0),
    (204230, 142998, 1, 126004, 0),
    (205852, 145249, 1, 127420, 72),
    (205867, 145232, 1, 127433, 2),
    (205868, 145249, 1, 127433, 0),
    (205969, 145249, 1, 127527, 6),
    (205984, 145249, 1, 127541, 3),
    (205988, 145249, 1, 127545, 1),
    (205990, 145249, 1, 127547, 0),
    (205993, 145249, 1, 127550, 0),
    (205995, 145249, 1, 127552, 0);

--
-- PostgreSQL database dump complete
--