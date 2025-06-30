package com.springboot.rekruteIT.enums;


public enum Experience {

    JEUNE_DIPLOME("jeune diplômé"),
    DEBUTANT_MOINS_2_ANS("Débutant < 2 ans"),
    ENTRE_2_ET_5_ANS("Expérience entre 2 ans et 5 ans"),
    ENTRE_5_ET_10_ANS("Expérience entre 5 ans et 10 ans"),
    PLUS_DE_10_ANS("Expérience > 10 ans");

    private final String displayName;
    Experience(String displayName) {
        this.displayName = displayName;
    }
    public String getDisplayName() {
        return displayName;
    }
    @Override
    public String toString() {
        return displayName;
    }
}