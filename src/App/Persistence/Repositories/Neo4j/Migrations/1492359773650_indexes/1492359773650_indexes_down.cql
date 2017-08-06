////////////////////////////////////////////////////////////////////////////////
//  DROP ID CONSTRAINTS
////////////////////////////////////////////////////////////////////////////////

DROP CONSTRAINT ON (node:Lemma) ASSERT node.id IS UNIQUE;
DROP CONSTRAINT ON (node:Language) ASSERT node.id IS UNIQUE;
DROP CONSTRAINT ON (node:Definition) ASSERT node.id IS UNIQUE;
DROP CONSTRAINT ON (node:Sense) ASSERT node.id IS UNIQUE;
DROP CONSTRAINT ON (node:Synset) ASSERT node.id IS UNIQUE;
DROP CONSTRAINT ON (node:Example) ASSERT node.id IS UNIQUE;