////////////////////////////////////////////////////////////////////////////////
//  CREATE ID CONSTRAINTS
////////////////////////////////////////////////////////////////////////////////

CREATE CONSTRAINT ON (node:Lemma) ASSERT node.id IS UNIQUE;
CREATE CONSTRAINT ON (node:Language) ASSERT node.id IS UNIQUE;
CREATE CONSTRAINT ON (node:Definition) ASSERT node.id IS UNIQUE;
CREATE CONSTRAINT ON (node:Sense) ASSERT node.id IS UNIQUE;
CREATE CONSTRAINT ON (node:Synset) ASSERT node.id IS UNIQUE;
CREATE CONSTRAINT ON (node:Example) ASSERT node.id IS UNIQUE;